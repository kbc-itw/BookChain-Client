import { ICache } from './../i-cache';
import { Injectable } from '@angular/core';
import { IBook } from '../../model/book/ibook';

/**
 * 書籍情報のキャッシュ層
 * localStorageを内部で使用する
 * @author kbc14a12
 */
@Injectable()
export class BookCacheService implements ICache<IBook> {

  private readonly BOOK_TABLE = 'bookchain-Angular-book';
  readonly cachedBook: { [isbn13: string]: IBook; };

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
    if (this.cachedBook[book.isbn13] === undefined) {
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
    if (this.cachedBook[book.isbn13] !== undefined) {
      delete this.cachedBook[book.isbn13];
      localStorage.setItem(this.BOOK_TABLE, JSON.stringify(this.cachedBook));
      return true;
    }
    return false;
  }

  get(isbn13: string): IBook[] {
    throw new Error("Method not implemented.");
  }
  update(isbn13: string, book: IBook): boolean {
    throw new Error("Method not implemented.");
  }
  clear(): void {
    throw new Error("Method not implemented.");
  }
  getAll(): IBook[] {
    throw new Error("Method not implemented.");
  }


}
