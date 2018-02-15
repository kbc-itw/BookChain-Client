import { BookService } from './../../service/book/book.service';
import { UserService } from './../../service/user/user.service';
import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../model/user/iuser';
import Quagga from 'quagga';
import { IBook } from '../../model/book/ibook';
import { Observable } from 'rxjs/Observable';
import { WEBSOCKET_BASE_URL } from '../../../environments/environment';
const QRCode = require('qrcode-reader').default;

@Component({
  selector: 'bookchain-trade-guest',
  templateUrl: './trade-guest.component.html',
  styleUrls: ['./trade-guest.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class TradeGuestComponent implements OnInit {
  @ViewChild('qrcodeInput') qrcodeInput: ElementRef;
  private readonly qrcodeRawImageReader = new FileReader();

  @ViewChild('barcodeInput') barcodeInput: ElementRef;
  private readonly barcodeRawImageReader = new FileReader();

  private webSocket: WebSocket;
  private state: 'ReadQRcode' | 'ReadBarcode' | 'WaitingProposal' | 'ShowProposal' |
  'WaitingPartnerConfirmTransaction' | 'TransactionCommitted';
  private loginUser: IUser;
  private partner: IUser;
  private purpose: string;
  private book: IBook;

  constructor(private userService: UserService, private bookService: BookService) { }

  ngOnInit() {

    this.userService.getLoginUser().subscribe((loginUser) => {
      this.loginUser = loginUser;
      this.state = 'ReadQRcode';
    });

    this.qrcodeRawImageReader.onload = (progressEvent) => {
      const qrcodeReader = new QRCode();
      qrcodeReader.callback = (err: any, result: any) => {
        if (err) {
          console.log(err);
          window.alert('エラー！　もういっぺんやれカス！');
          return;
          }

        const roomInfo = JSON.parse(result.result);
        this.webSocket = new WebSocket(WEBSOCKET_BASE_URL + 'rooms/connect?id='
        + roomInfo.id
        + '&role=guest'
        + '&locator=' + encodeURIComponent(this.loginUser.locator)
        + '&inviteToken=' + roomInfo.inviteToken);
        this.webSocket.onmessage = (event) => {
          const wsEvent = event as WebSocketEvent;
          const data = JSON.parse(wsEvent.data);
          switch (data.action) {
            case 'ENTRY_PERMITTED':
              this.entryPermitted(data);
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
      };
      qrcodeReader.decode(this.qrcodeRawImageReader.result);
    };

    this.barcodeRawImageReader.onload = (progressEvent) => {
      // 読み取れていたらsuccess
      Quagga.decodeSingle({
        src: this.barcodeRawImageReader.result,
        decoder: {
          readers: ['ean_reader'],
          multiple: false
        }
      }, (result) => {
        if (result instanceof Array) {
          // 死に分岐だがresultの型の都合記述
        } else {
          if (typeof result === 'undefined') {
            window.alert('バーコード読み取りをしくりました');
          } else {
            this.webSocket.send(JSON.stringify({
              action: 'REQUEST_PROPOSAL',
              data: result.codeResult.code
            }));
          }
        }
      });
    };
  }

  private entryPermitted(data: any) {
    this.purpose = data.purpose;
    this.state = 'ReadBarcode';
  }

  private showProposal(data: any) {
    const id = data.data.owner.split('@')[0];
    const host = data.data.owner.split('@')[1];
    Observable.zip(
      this.userService.getUser(host, id),
      this.bookService.getByISBN(data.data.isbn)
    ).subscribe((result: [IUser, IBook]) => {
      this.partner = result[0];
      this.book = result[1];
      this.state = 'ShowProposal';
    });
  }

  private transactionComitted(data: any) {
    this.state = 'TransactionCommitted';
  }

  private receiveCancel(data: any): void {
    window.alert(data);
  }

  private onChangeQrcodeInput(uploadEvent: any) {
    this.qrcodeRawImageReader.readAsDataURL(uploadEvent.target.files[0]);
  }

  private propagateToQrcodeInput(event: any) {
    this.qrcodeInput.nativeElement.click();
  }

  private onChangeBarcodeInput(uploadEvent: any) {
    this.barcodeRawImageReader.readAsDataURL(uploadEvent.target.files[0]);
  }

  private propagateToBarcodeInput(event: any) {
    this.barcodeInput.nativeElement.click();
  }

  private confirmProposal(event: any) {
    const data = JSON.stringify({
      action: 'APPROVE_PROPOSAL',
    });
    this.webSocket.send(data);
    this.state = 'WaitingPartnerConfirmTransaction';
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
