import { TestBed, inject } from '@angular/core/testing';

import { BookService } from './book.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

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


});
