import { TestBed, inject } from '@angular/core/testing';
import { IBook } from '../../model/book/ibook';
import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { asIsbn10 } from 'isbn-utils';

const expectedResult: IBook =  {
  id:            'm2BpPQAACAAJ',
  isbn10:        '4062639149',
  isbn13:        '9784062639149',
  title:         '天空の蜂',
  authors:       ['東野圭吾'],
  publishedDate: '1998',
  thumbnailURL:  'http://books.google.com/books/content?id=m2BpPQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
};

describe('BookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [BookService, HttpClient, HttpTestingController]
    });
  });

  it('インスタンス生成', inject([BookService], (service: BookService) => {
    expect(service).toBeTruthy();
  }));

  it('ISBNインバリッド（そもそも数字でない）', inject([BookService], (service: BookService) => {
    service.get('hogehogehoge')
      .then()
      .catch(err => expect(err).toThrowError('Invalid ISBN'));
  }));

  it('ISBNインバリッド（数字だが桁が違う）', inject([BookService], (service: BookService) => {
    service.get('123')
      .then()
      .catch(err => expect(err).toThrowError('Invalid ISBN'));
  }));

  it('ISBN10桁(天空の蜂)', inject([BookService], (service: BookService) => {
    service.get(expectedResult.isbn10)
      .then( (book: IBook) => expect(book).toEqual(expectedResult));
  }));


  it('ISBN13桁(天空の蜂）', inject([BookService], (service: BookService) => {
    service.get(expectedResult.isbn13)
      .then( (book: IBook) => expect(book).toEqual(expectedResult));
  }));

  it('キャッシュから取得(天空の蜂)', inject([BookService], (service: BookService) => {
    service.get(expectedResult.isbn13)
      .then( (book: IBook) => service.get(expectedResult.isbn13))
      .then( (book: IBook) => service.get('4043636032'))
      .then( (cached: IBook) => expect(cached).toEqual(expectedResult));
  }));
});
