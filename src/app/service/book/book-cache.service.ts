import { ICache } from './../i-cache';
import { Injectable } from '@angular/core';
import { IBook } from '../../model/book/ibook';

/**
 * 書籍情報のキャッシュ層
 * ISBN13を利用してデータを識別する
 * localStorageを使用する
 * @author kbc14a12
 */
@Injectable()
export class BookCacheService implements ICache<IBook> {

  private readonly BOOK_TABLE = 'bookchain-Angular-book';
  private readonly cachedBook: { [isbn13: string]: IBook; };

  constructor() {
    // localStorageに格納していた書籍データ群をメモリ上に読み込み
    if (!localStorage.getItem(this.BOOK_TABLE)) {
      // ないなら作っておく
      localStorage.setItem(this.BOOK_TABLE, '{}' );
    }
    this.cachedBook = JSON.parse(localStorage.getItem(this.BOOK_TABLE));
  }

 /**
   * キャッシュに書籍データを格納する
   * @param book 格納したい書籍データ
   * @returns 新規格納できたらtrue、既に格納済みのオブジェクトならfalse
   */
  add(book: IBook): boolean {
    if (typeof this.cachedBook[book.isbn13] === 'undefined') {
      this.cachedBook[book.isbn13] = book;
      localStorage.setItem(this.BOOK_TABLE, JSON.stringify(this.cachedBook));
      return true;
    }
    return false;
  }

  /**
   * キャッシュの書籍データを削除する
   * @param book 削除したい書籍データ
   * @returns 削除できたらtrue、該当データが存在しないならfalse
   */
  remove(book: IBook): boolean {
    if (typeof this.cachedBook[book.isbn13] === 'undefined') {
      return false;
    }
    delete this.cachedBook[book.isbn13];
    localStorage.setItem(this.BOOK_TABLE, JSON.stringify(this.cachedBook));
    return true;
}

  /**
   * キャッシュから書籍データを取得する
   * @param isbn13 取得したい書籍データのisbn13コード
   * @returns isbn13コードに対応する書籍データ。なければnull
   */
  get(isbn13: string): IBook {
    return this.cachedBook[isbn13] || null;
  }
  /**
   * キャッシュの書籍データを更新する
   * @param book 更新したい削除データ isbn13で識別する
   * @return 更新できたらtrue、 該当データが存在しないならfalse
   */
  update(book: IBook): boolean {
    if (typeof this.cachedBook[book.isbn13] === 'undefined') {
      return false;
    }
    this.cachedBook[book.isbn13] = book;
    localStorage.setItem(this.BOOK_TABLE, JSON.stringify(this.cachedBook));
    return true;
  }

  /**
   * キャッシュをクリアする
   */
  clear(): void {
    for (const key in this.cachedBook) {
      if (this.cachedBook.hasOwnProperty(key)) {
        delete this.cachedBook[key];
      }
    }
    localStorage.setItem(this.BOOK_TABLE, JSON.stringify(this.cachedBook));
  }
  /**
   * キャッシュ内の全データを取得する
   * @returns キャッシュ内の全データ
   */
  getAll(): IBook[] {
    return Object.values(this.cachedBook).map(book => book);
  }


}
