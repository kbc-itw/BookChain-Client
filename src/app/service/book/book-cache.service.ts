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
    this.cachedBook = JSON.parse(localStorage.getItem(this.BOOK_TABLE)) || {};
  }

  add(value: IBook): boolean {
    throw new Error("Method not implemented.");
  }
  remove(value: IBook): boolean {
    throw new Error("Method not implemented.");
  }
  get(query: string): IBook[] {
    throw new Error("Method not implemented.");
  }
  update(query: string, value: IBook): boolean {
    throw new Error("Method not implemented.");
  }
  clear(): void {
    throw new Error("Method not implemented.");
  }
  getAll(): IBook[] {
    throw new Error("Method not implemented.");
  }


}
