import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { GoogleBooksApisGatewayService } from './google-books-apis-gateway.service';

// Google Books APIsから拾ってきた生データ
const rawData = require('./test.json');

describe('GoogleBooksApisGatewayService', () => {

  let service: GoogleBooksApisGatewayService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports  : [HttpClientTestingModule],
      providers: [GoogleBooksApisGatewayService]
    });

    service = TestBed.get(GoogleBooksApisGatewayService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('インスタンス生成', () => {
    expect(service).toBeTruthy();
  });

  // 一時的にpublicにしてテスト後、privateに戻した
  // it('クエリ生成', () => {
  //   expect(gateway.getRequestQuery({isbn: expectedResult.isbn10})).toEqual(expectedRequestByISBNQuery);
  // });

  // it('URL生成', () => {
  //   expect(gateway.getRequestUrl(expectedRequestByISBNQuery)).toEqual(expectedRequestURLByISBN);
  // });

  it('クエリ生成', () => {
    expect(service.getRequestQuery({isbn: '9784309024226'})).toEqual('isbn:9784309024226');
    expect(service.getRequestQuery({isbn: '9784309024226', inauthor: '亀山郁夫'})).toEqual('isbn:9784309024226+inauthor:亀山郁夫');
    expect(service.getRequestQuery({})).toEqual('');
  });

  it('URL生成', () => {
    expect(service.getRequestUrl('isbn:9784309024226+inauthor:亀山郁夫'))
      .toEqual('https://www.googleapis.com/books/v1/volumes?q=isbn:9784309024226+inauthor:亀山郁夫&country=JP');
    // エラーを投げてくることを検証する場合、当然その時点でエラーを吐いてテストに失敗する
    // なので匿名関数にラップして渡す
    expect(() => service.getRequestUrl('')).toThrowError('Query is empty');
  });

  it('GET通信（クエリ生成に成功）', () => {
    const querySpy = spyOn(service, 'getRequestQuery').and.callThrough();
    const urlSpy = spyOn(service, 'getRequestUrl').and.callThrough();

    service.get({intitle: '天空の蜂', inauthor: '東野圭吾'}).subscribe(book => expect(book.title).toEqual('天空の蜂'));

    expect(service.getRequestQuery).toHaveBeenCalledWith({intitle: '天空の蜂', inauthor: '東野圭吾'});
    expect(service.getRequestUrl).toHaveBeenCalledWith('intitle:天空の蜂+inauthor:東野圭吾');

    httpMock.expectOne('https://www.googleapis.com/books/v1/volumes?q=intitle:天空の蜂+inauthor:東野圭吾&country=JP')
      .flush(rawData.success);
    httpMock.verify();
  });

  it('GET通信（存在しない本へのクエリ）', (() => {
    const querySpy = spyOn(service, 'getRequestQuery').and.callThrough();
    const urlSpy = spyOn(service, 'getRequestUrl').and.callThrough();

    service.get({intitle: 'くぁｗせｄｒｆｔｇｙふじこ', inauthor: 'foobar'})
      .subscribe(book => fail(), err => expect(err).toEqual(new Error('No Result')));

    expect(service.getRequestQuery).toHaveBeenCalledWith({intitle: 'くぁｗせｄｒｆｔｇｙふじこ', inauthor: 'foobar'});
    expect(service.getRequestUrl).toHaveBeenCalledWith('intitle:くぁｗせｄｒｆｔｇｙふじこ+inauthor:foobar');

    httpMock.expectOne('https://www.googleapis.com/books/v1/volumes?q=intitle:くぁｗせｄｒｆｔｇｙふじこ+inauthor:foobar&country=JP')
      .flush(rawData.noResult);
    httpMock.verify();
  }));

  it('GET通信（正常でないクエリ）', (() => {
    const querySpy = spyOn(service, 'getRequestQuery').and.callThrough();
    const urlSpy = spyOn(service, 'getRequestUrl').and.returnValue('https://www.googleapis.com/books/v1/volumes?q=&country=JP');

    service.get({})
      .subscribe(book => fail(), err => expect(err).toEqual(new Error('Error Returned')));

    expect(service.getRequestQuery).toHaveBeenCalledWith({});
    expect(service.getRequestUrl).toHaveBeenCalledWith('');

    httpMock.expectOne('https://www.googleapis.com/books/v1/volumes?q=&country=JP')
      .flush(rawData.error);
    httpMock.verify();
  }));
});
