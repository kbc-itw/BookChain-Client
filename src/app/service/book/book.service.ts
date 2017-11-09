import { Book } from '../../model/book/book';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as ISBN from 'isbn-utils';

/**
 * 書籍情報を供給するサービス。
 * Google Books APIsを叩き、キャッシュを行う。
 * @author kbc14a12
 */
@Injectable()
export class BookService {

  // キャッシュした書籍データ。isbn13から導出。
  private cachedBookData: Map<string, Book> = new Map<string, Book>();

  // ajaxを利用する都合DIする
  constructor(private http: HttpClient) { }

  /**
   * 渡されたisbnに基づき、キャッシュないしGoogle Books APIsからデータを取得する。
   * @param rowIsbn 取得したい書籍のISBNコード。ISBN10または13。
   * @returns 取得した書籍データ。Google Books APIsから取得失敗した場合reject。
   */
  public get(rawIsbn: string): Promise<Book> {
    return new Promise<Book>((resolve, reject) => {

      if (!ISBN.isValid(rawIsbn)) {
        reject(new Error('Invalid ISBN'));
      }

      const isbn: string = ISBN.asIsbn13(rawIsbn);

      const url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn + '&country=JP';

      // キャッシュにあればそのまま返す
      // なければGoogle Books APIを叩く
      const book = this.cachedBookData.get(url);
      if (book !== undefined) {
        resolve(book);
      } else {
        this.http.get<GoogleBooksAPIResultBookData>(url)
          .subscribe(
            data => {
              // 即時オブジェクトでBook型をでっち上げる
              resolve({
                id:            data.items[0].id,
                title:         data.items[0].volumeInfo.title,
                isbn10:        data.items[0].volumeInfo.industryIdentifiers[0].identifier,
                isbn13:        data.items[0].volumeInfo.industryIdentifiers[1].identifier,
                authors:       data.items[0].volumeInfo.authors,
                publishedDate: data.items[0].volumeInfo.publishedDate,
                thumbnailURL:  data.items[0].volumeInfo.imageLinks.smallThumbnail
              });
            },
            reject
        );
      }
    });
  }
}

/**
 * Google Books APIsから返ってきた書籍データ。
 * TypeScriptの型定義エラー回避のために利用する。
 */
interface GoogleBooksAPIResultBookData {
  items: {
    id:              string;
    volumeInfo: {
      title:         string,
      authors:       string,
      publishedDate: string,
      thumbnail:     string,
      industryIdentifiers: {
        identifier:  string
      }
    }
  };
}
