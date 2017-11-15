import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookCacheService } from './book-cache.service';
import { GoogleBooksApisGatewayService } from './google-books-apis-gateway.service';
import { TestBed, inject } from '@angular/core/testing';
import { BookService } from './book.service';
import { IBook } from '../../model/book/ibook';
import { ServiceModule } from '../service.module';
import { Observable } from 'rxjs/Observable';



describe('BookService', () => {
  let service;
  let api;
  let cache;

  const testData =  {
    id:            'm2BpPQAACAAJ',
    isbn10:        '4062639149',
    isbn13:        '9784062639149',
    title:         '天空の蜂',
    authors:       ['東野圭吾'],
    publishedDate: '1998',
    thumbnailURL:  'http://books.google.com/books/content?id=m2BpPQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        BookService,
        GoogleBooksApisGatewayService,
        BookCacheService
      ]});
      service = TestBed.get(BookService);
      api = TestBed.get(GoogleBooksApisGatewayService);
      cache = TestBed.get(BookCacheService);

  });

  it('インスタンス生成', () => {
    expect(service).toBeTruthy();
  });

  it('キャッシュにない本の取得(成功)', () => {
    const cacheGetSpy = spyOn(cache, 'get').and.callFake(isbn => null);
    const cacheAddSpy = spyOn(cache, 'add').and.callFake(book => true);
    const apiSpy = spyOn(api, 'get').and.callFake(isbn => Observable.of(testData));
    service.getByISBN(testData.isbn13).subscribe(book => expect(book).toEqual(testData));
    expect(cacheGetSpy).toHaveBeenCalledWith(testData.isbn13);
    expect(apiSpy).toHaveBeenCalledWith({isbn: testData.isbn13});
  });

  it('キャッシュにない本の取得(失敗)', () => {
    const cacheGetSpy = spyOn(cache, 'get').and.callFake(isbn => null);
    const cacheAddSpy = spyOn(cache, 'add').and.callFake(book => true);
    const apiSpy = spyOn(api, 'get').and.callFake(isbn => Observable.of(testData));
    service.getByISBN('123').subscribe(book => fail(), err => expect(err).toEqual(new Error('Invalid ISBN')));
  });

  it('キャッシュ済みの本の取得(成功)', () => {
    const cacheGetSpy = spyOn(cache, 'get').and.callFake(isbn => testData);
    const cacheAddSpy = spyOn(cache, 'add').and.callFake(book => true);
    const apiSpy = spyOn(api, 'get').and.callFake(isbn => Observable.of(testData));
    service.getByISBN(testData.isbn13).subscribe(book => expect(book).toEqual(testData));
    expect(cacheGetSpy).toHaveBeenCalledWith(testData.isbn13);
    expect(apiSpy).toHaveBeenCalledWith({isbn: testData.isbn13});
  });

  it('キャッシュ済みの本の取得(失敗)', () => {
    const cacheGetSpy = spyOn(cache, 'get').and.callFake(isbn => testData);
    const cacheAddSpy = spyOn(cache, 'add').and.callFake(book => true);
    const apiSpy = spyOn(api, 'get').and.callFake(isbn => Observable.of(testData));
    service.getByISBN('123').subscribe(book => fail(), err => expect(err).toEqual(new Error('Invalid ISBN')));
  });
});
