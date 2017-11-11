import { IBookGateway } from './ibook-gateway';
import { HttpClient } from '@angular/common/http';
import { IBook } from '../../model/book/ibook';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';


/**
 * GoogleBooksAPIsを叩くためのゲートウェイサービス
 * @author kbc14a12
 */
@Injectable()
export class GoogleBooksApisGatewayService {

  /**
  * @param http AngularにDIされるHttpClient
  */
  constructor(private http: HttpClient) { }

  /**
   * Google Books APIsにgetメソッドで通信する。
   * {isbn:'0123456789'}のようなオブジェクトを渡して利用する。
   * @param params Google Books APIsに渡すパラメタ群 https://developers.google.com/books/docs/v1/using#PerformingSearch を参考のこと
   */
  get(params: {[key: string]: string}): Observable<IBook> {
    const url: string = this.getRequestUrl(this.getRequestQuery(params));
    // APIぶったたいて戻ってきた生データを書籍データに変換する
    return this.http.get<RawItems>(url)
      // Observable<RawItems>->IBook[]、その後margeMapによりObservable<IBook>に変換
      .mergeMap(rawItems => {
        if (rawItems.error !== undefined) {
          throw new Error('Error Returned');
        }
        if (rawItems.totalItems === 0) {
          throw new Error('No Result');
        }
        return this.convertRawItemsToBooks(rawItems);
      });
  }

  /**
   * クエリ生成用メソッド
   * クエリ文字列は'search+terms'の形式で行われる
   * 例えば亀山郁夫訳のカラマーゾフの兄弟なら「inauthor:亀山郁夫+intitle:カラマーゾフの兄弟」で取得可
   * https://developers.google.com/books/docs/v1/using#PerformingSearch を参考のこと
   * @param params Google Books APIsに渡すパラメタ群
   * @returns クエリ文字列
   */
  public getRequestQuery(params: {[key: string]: string}): string {
    return Object.keys(params)
      .map((key) => key + ':' + params[key])
     .join('+');
  }

  /**
   * 通信先URL生成用メソッド
   * @param query クエリ文字列
   * @throws queryが空の場合
   * @returns クエリを含む、通信先URL
   */
  public getRequestUrl(query) {
    if (query === '') {
      throw new Error('Query is empty');
    }
    return 'https://www.googleapis.com/books/v1/volumes?q=' + query + '&country=JP';
  }

  /**
   * Google Books APIsから取得してきた生データを書籍データに加工する
   * @param rawItems 生データ
   * @returns 書籍データ
   */
  public convertRawItemsToBooks(rawItems: RawItems): IBook[] {
    const items = rawItems.items;
    return Object.values(items)
      .map((item) => {
        return {
          id: item.id,
          title: item.volumeInfo.title,
          isbn10: item.volumeInfo.industryIdentifiers[0].identifier,
          isbn13: item.volumeInfo.industryIdentifiers[1].identifier,
          authors: item.volumeInfo.authors,
          publishedDate: item.volumeInfo.publishedDate,
          thumbnailURL: item.volumeInfo.imageLinks.thumbnail,
        };
      });
  }
}

/**
 * Google Books APIsから返ってきた生データ
 * TypeScriptの型定義エラー回避のために利用する
 */
interface RawItems {
  totalItems: number;
  error?: {};
  items: RawItem[];
}

interface RawItem {
  id: string;
  volumeInfo: {
    title: string,
    authors: string[],
    publishedDate: string,
    imageLinks: {
      thumbnail: string;
    },
    industryIdentifiers: {
      identifier: string
    }
  };
}
