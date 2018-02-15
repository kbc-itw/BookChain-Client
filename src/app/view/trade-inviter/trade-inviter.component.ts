import { BookService } from './../../service/book/book.service';
import { TradingService } from './../../service/trading/trading.service';
import { UserService } from './../../service/user/user.service';
import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { IUser } from '../../model/user/iuser';
import { IBook } from '../../model/book/ibook';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/zip';
import { RoomService } from '../../service/room/room.service';
import { WEBSOCKET_BASE_URL } from '../../../environments/environment';

@Component({
  selector: 'bookchain-trade-inviter',
  templateUrl: './trade-inviter.component.html',
  styleUrls: ['./trade-inviter.component.sass'],
  // encapsulation: ViewEncapsulation.None
})
/**
 * @author kbc14a12
 */
export class TradeInviterComponent implements OnInit {

  private qrCodeDataUri: string;
  private webSocket: WebSocket;
  private state: 'DisplayQRCode' | 'DisplayReadBarcodeNotification' | 'ShowProposal' |
                 'WaitingPartnerConfirmTransaction' | 'TransactionCommitted';
  private user: IUser;
  private partner: IUser;
  private book: IBook;
  private purpose: string;

  constructor(
    private userService: UserService, private tradingService: TradingService, private bookService: BookService,
    private roomService: RoomService, private route: ActivatedRoute
  ) { }

  // TODO パスでpurposeフィールド切り分け
  // TODO サーバ名
  ngOnInit() {
    Observable
      .zip(
        this.userService.getLoginUser(),
        this.route.queryParams
      )
      .flatMap(userRoute => {
        this.user = userRoute[0];
        this.purpose = userRoute[1].purpose;
        return this.roomService.post(this.purpose, this.user.locator);
      })
      .subscribe(roomInfo => {
        const qrCodeJsonString = JSON.stringify({
          id: roomInfo.room.id,
          inviteToken: roomInfo.inviteToken
        });
        QRCode.toDataURL(qrCodeJsonString, {type: 'image/png'}, (err: Error, url: string) => {
          // TODO
          if (err) {
            return;
          }
          this.state = 'DisplayQRCode';
          this.qrCodeDataUri = url;
          const encodedLocator = encodeURIComponent(this.user.locator);
          // TODO コネクション先
          this.webSocket = new WebSocket(WEBSOCKET_BASE_URL + 'rooms/connect?id='
            + roomInfo.room.id
            + '&locator=' + encodedLocator
            + '&role=inviter');
          this.webSocket.onmessage = (event) => {
            const wsEvent = event as WebSocketEvent;
            const data = JSON.parse(wsEvent.data);
            switch (data.action) {
              case 'USER_JOINED':
                this.userJoined(data);
                break;
              case 'PROPOSAL':
                this.showProposal(data);
                break;
              case 'COMMITED':
                this.transactionComitted(data);
                break;
              case 'ROOM_CLOSED':
                this.cancel(data);
                break;
              case 'TRANSACTION_CANCELED':
                this.receiveCancel(data);
                break;
              case 'INVALID_ACTION':
                this.cancel(data);
                break;
            }
          };
        });
      });
  }

  private userJoined(data: any): void {
    const id = data.data.split('@')[0];
    const host = data.data.split('@')[1];

    this.userService.getUser(host, id)
      .subscribe(partner => {
        this.state = 'DisplayReadBarcodeNotification';
        this.partner = partner;
      });
  }

  private showProposal(data: any): void {
    this.bookService.getByISBN(data.data.isbn)
      .subscribe(book => {
        this.book = book;
        this.state = 'ShowProposal';
      });
  }

  private transactionComitted(data: any): void {
    this.state = 'TransactionCommitted';
  }

  private receiveCancel(data: any): void {
    window.alert(data);
  }

  private confirmProposal(event: any): void {
    const data = JSON.stringify({
      action: 'APPROVE_PROPOSAL',
    });
    this.webSocket.send(data);
  }

  private cancel(event: any): void {
    const data = JSON.stringify({
      action: 'CANCEL_REQUEST'
    });
    this.webSocket.send(data);
    this.webSocket.close();
  }
}

interface WebSocketEvent extends Event {
  readonly data: any;
}
