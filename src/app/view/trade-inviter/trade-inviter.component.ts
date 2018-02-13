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

          // TODO コネクション先
          this.webSocket = new WebSocket('ws:hoge/rooms/connect?id='
            + roomInfo.room.id
            + '&locator=' + this.user.locator
            + '&role=inviter');
          this.webSocket.onmessage = (event) => {
            const wsEvent = event as WebSocketEvent;
            switch (wsEvent.data.action) {
              case 'USER_JOINED':
                this.userJoined(wsEvent);
                break;
              case 'PROPOSAL':
                this.showProposal(wsEvent);
                break;
              case 'COMMITED':
                this.transactionComitted(wsEvent);
                break;
              case 'ROOM_CLOSED':
                this.cancel(wsEvent);
                break;
              case 'TRANSACTION_CANCELED':
                this.receiveCancel(wsEvent);
                break;
              case 'INVALID_ACTION':
                this.cancel(wsEvent);
                break;
            }
          };
        });
      });
  }

  private userJoined(wsEvent: WebSocketEvent): void {
    this.userService.get({'locator': wsEvent.data})
      .subscribe(partner => {
        this.state = 'DisplayReadBarcodeNotification';
        this.partner = partner;
      });
  }

  private showProposal(wsEvent: WebSocketEvent): void {
    const payload = JSON.parse(wsEvent.data.data);
    this.bookService.getByISBN(payload.isbn)
      .subscribe(book => {
        this.book = book;
        this.state = 'ShowProposal';
      });
  }

  private transactionComitted(wsEvent: WebSocketEvent): void {
    this.state = 'TransactionCommitted';
  }

  private receiveCancel(wsEvent: WebSocketEvent): void {
    const payload = wsEvent.data;
    window.alert(payload);
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
