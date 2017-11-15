import { BookCacheService } from './book-cache.service';
import { GoogleBooksApisGatewayService } from './google-books-apis-gateway.service';
import { Injectable } from '@angular/core';
import { IBook } from '../../model/book/ibook';
import * as ISBN from 'isbn-utils';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

@Injectable()
export class BookService {

  constructor(private api: GoogleBooksApisGatewayService, private cache: BookCacheService) { }

  public getByISBN(isbn: string): Observable<IBook> {

    if (!ISBN.isValid(isbn)) {
      return Observable.throw(new Error('Invalid ISBN'));
    }
    const isbn13: string = ISBN.asIsbn13(isbn);

    const cachedBook = this.cache.get(isbn13);
    if (cachedBook) {
      Observable.of(cachedBook);
    }
    return this.api.get({isbn: isbn13}).first();
  }

}
