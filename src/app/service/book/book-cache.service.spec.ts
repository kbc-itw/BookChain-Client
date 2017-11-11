import { TestBed, inject } from '@angular/core/testing';

import { BookCacheService } from './book-cache.service';
import { IBook } from '../../model/book/ibook';

describe('BookCacheService', () => {

  let testData: IBook;
  let fakeStorage;

  let getItemSpy;
  let setItemSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookCacheService]
    });

    // ダミー本とダミーローカルストレージの用意
    testData =  {
      id:            'm2BpPQAACAAJ',
      isbn10:        '4062639149',
      isbn13:        '9784062639149',
      title:         '天空の蜂',
      authors:       ['東野圭吾'],
      publishedDate: '1998',
      thumbnailURL:  'http://books.google.com/books/content?id=m2BpPQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    };

    fakeStorage = {'bookchain-Angular-book': {} };

    // ローカルストレージの置き換え
    getItemSpy = spyOn(localStorage, 'getItem').and.callFake((key) =>  {
      return JSON.stringify(fakeStorage[key]);
    });
    setItemSpy = spyOn(localStorage, 'setItem').and.callFake((key, value) =>  {
      fakeStorage[key] = JSON.parse(value);
    });

  });

  it('インスタンス生成', inject([BookCacheService], (service: BookCacheService) => {
    expect(service).toBeTruthy();
  }));

  it('add 成功する場合', inject([BookCacheService], (service: BookCacheService) => {
    expect(service.add(testData)).toBeTruthy();
    expect(service.cachedBook['9784062639149']).toEqual(testData);
  }));

  it('remove 失敗する場合', inject([BookCacheService], (service: BookCacheService) => {
    expect(service.remove(testData)).toBeFalsy();
  }));

  it('get 見つからない場合', inject([BookCacheService], (service: BookCacheService) => {
    expect(service.get(testData.isbn13)).toBeNull();
  }));

  it('update 失敗する場合', inject([BookCacheService], (service: BookCacheService) => {
    expect(service.update(testData)).toBeFalsy();
  }));

  describe('ストレージあり', () => {
    beforeEach(() => {
      fakeStorage = {
        'bookchain-Angular-book': {
          '9784062639149': {
            id: 'm2BpPQAACAAJ',
            isbn10: '4062639149',
            isbn13: '9784062639149',
            title: '天空の蜂',
            authors: ['東野圭吾'],
            publishedDate: '1998',
            thumbnailURL: 'http://books.google.com/books/content?id=m2BpPQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
          }
        }
      };
    });

    it('add 失敗する場合', inject([BookCacheService], (service: BookCacheService) => {
      expect(service.add(testData)).toBeFalsy();
      expect(service.cachedBook['9784062639149']).toEqual(testData);
    }));

    it('remove 成功する場合', inject([BookCacheService], (service: BookCacheService) => {
      expect(service.remove(testData)).toBeTruthy(true);
      expect(service.cachedBook['9784062639149']).toBeUndefined();
    }));

    it('get 見つかる場合', inject([BookCacheService], (service: BookCacheService) => {
      expect(service.get(testData.isbn13)).toEqual(testData);
    }));

    it('update 成功する場合', inject([BookCacheService], (service: BookCacheService) => {
      expect(service.update(testData)).toBeTruthy();
    }));

  });

});
