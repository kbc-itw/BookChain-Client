import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Quagga from 'quagga';
import * as ISBN from 'isbn-utils';
import { IBook } from '../../../model/book/ibook';
import { BookService } from '../../../service/book/book.service';
import { OwnershipService } from '../../../service/ownership/ownership.service';
import { UserService } from '../../../service/user/user.service';

@Component({
  selector: 'bookchain-book-register-file-upload',
  templateUrl: './book-register-file-upload.component.html',
  styleUrls: ['./book-register-file-upload.component.sass'],
  // encapsulation: ViewEncapsulation.None
})
export class BookRegisterFileUploadComponent implements OnInit {

  private readonly fileReader = new FileReader();
  private showFailBarcodeReadDiv = false;
  private showFailInputDiv = false;
  private uploading = false;
  private book: IBook | null;
  private inputISBN: string;

  @ViewChild('inputForManualRegister') manualInputISBN: ElementRef;
  @ViewChild('chooseImage') chooseImage: ElementRef;

  constructor(private bookService: BookService, private ownershipService: OwnershipService, private userService: UserService) { }

  ngOnInit() {

    // createがオプション指定されているのでundefinedチェック
    // if (typeof Quagga.ResultCollector.create === 'undefined') {
    //  throw Error('ここには来ない');
    // }

    // 読み取り終了時の処理を設定
    this.fileReader.onload = (progressEvent) => {
      // 読み取れていたらsuccess
      Quagga.decodeSingle({
        src: this.fileReader.result,
        decoder: {
          readers: ['ean_reader'],
          multiple: true
        }
      }, (result) => {
        if (result instanceof Array) {
          if (result.length === 0 || typeof result[0] === 'undefined' ) {
            this.readFail();
          } else {
            const isbnArray = result.filter((resultObject) => ISBN.isValid(resultObject.codeResult.code));
            if (isbnArray.length === 0) {
              this.readFail();
            } else {
              this.readSuccess(isbnArray[0].codeResult.code);
            }
          }
        } else {
          if (typeof result === 'undefined') {
            this.readFail();
          } else {
            this.readSuccess(result.codeResult.code);
          }
        }
      });
    };
  }

  onUpload(uploadEvent: any): void {
    if (uploadEvent.target.files.length === 0) {
      this.readFail();
    }
    this.uploading = true;
    this.fileReader.readAsDataURL(uploadEvent.target.files[0]);
  }

  private manualRegister(event: any) {
    if (!ISBN.isValid(this.inputISBN)) {
      this.inputFail();
    } else {
      this.readSuccess(this.inputISBN);
    }
  }

  /**
   * ISBN読み取りに成功した場合
   * @param isbn ISBN
   */
  private readSuccess(isbn: string) {
    this.showFailBarcodeReadDiv = false;
    this.showFailInputDiv = false;
    // TODO エラーハンドリング
    this.bookService.getByISBN(isbn).subscribe(book => {
      this.uploading = false;
      this.book = book;
    }, err => {
      this.uploading = false;
    });
  }

  /**
   * ISBN読み取りに失敗した場合
   */
  private readFail() {
    this.uploading = false;
    this.showFailBarcodeReadDiv = true;
  }

  private inputFail() {
    this.showFailInputDiv = true;
  }

  /**
   * カメラを起動ボタンを押したときにinput type fileを発火する処理
   */
  private propagateToInput(event: any) {
    this.chooseImage.nativeElement.click();
  }

  /**
   * TODO 登録ボタンを押したときの処理
   */
  private confirmRegister(event: any): void {
    if (!this.book) {
      return;
    }
    this.userService.getLoginUser()
      .flatMap((user) => this.ownershipService.post({owner: user.locator, isbn: this.book.isbn13}))
      .subscribe(() => {
        window.alert('登録しました');
      });
  }

  /**
   * TODO 登録ボタンを押したときの処理
   */
  private cancelRegister(event: any): void {
    if (!this.book) {
      return;
    }
    this.uploading = false;
    this.book = null;
    this.showFailBarcodeReadDiv = false;
    this.showFailInputDiv = false;
    this.inputISBN = '';
  }

  private canSendInputISBN() {
    return !this.uploading && ISBN.isValid(this.inputISBN) && !this.uploading;
  }
}
