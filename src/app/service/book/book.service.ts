import { BookCacheService } from './book-cache.service';
import { GoogleBooksApisGatewayService } from './google-books-apis-gateway.service';
import { Injectable } from '@angular/core';
import { IBook } from '../../model/book/ibook';
import * as ISBN from 'isbn-utils';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

/**
 * 書籍情報を取得するためのサービス。
 * @author kbc14a12
 */
@Injectable()
export class BookService {

  constructor(private api: GoogleBooksApisGatewayService, private cache: BookCacheService) { }

  /**
   * ISBNコードによって書籍情報を取得する
   * @param isbn ISBNコード
   * @returns 取得した書籍データを流すObservable。取得失敗時にエラーが流れる。
   */
  public getByISBN(isbn: string): Observable<IBook> {

    if (!ISBN.isValid(isbn)) {
      return Observable.throw(new Error('Invalid ISBN'));
    }

    const isbn13: string = ISBN.asIsbn13(isbn);

    // キャッシュにあればキャッシュを利用する。なければapiを叩く。
    const cachedBook = this.cache.get(isbn13);
    if (cachedBook) {
      Observable.of(cachedBook);
    }

    this.api.get({isbn: isbn13})
      .first()
      // mapをこのように利用するべきではないと思う
      .map(book => {this.cache.add(book); return book; });
  }

}
