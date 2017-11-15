import { TestBed, inject } from '@angular/core/testing';

import { BookCacheService } from './book-cache.service';
import { IBook } from '../../model/book/ibook';

describe('ストレージがそもそもない', () => {

  let fakeStorage;
  let getItemSpy;
  let setItemSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookCacheService]
    });
    fakeStorage = {};
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

});

describe('ストレージ内にデータがない', () => {

  let testData: IBook;
  let fakeStorage;

  let getItemSpy;
  let setItemSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookCacheService]
    });

    it('インスタンス生成', inject([BookCacheService], (service: BookCacheService) => {
      expect(service).toBeTruthy();
    }));

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

  it('add 成功する場合', inject([BookCacheService], (service: BookCacheService) => {
    expect(service.add(testData)).toBeTruthy();
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

  it('getAll', inject([BookCacheService], (service: BookCacheService) => {
    expect(service.getAll()).toEqual([]);
  }));
});



describe('ストレージあり', () => {

    let testData: IBook;
    let fakeStorage;

    let getItemSpy;
    let setItemSpy;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [BookCacheService]
      });

      it('インスタンス生成', inject([BookCacheService], (service: BookCacheService) => {
        expect(service).toBeTruthy();
      }));

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
          },
          '9784309024226': {
            id: 'GEX6jgEACAAJ',
            isbn10: '430902422X',
            isbn13: '9784309024226',
            title: 'カラマーゾフの兄弟',
            authors: ['亀山郁夫'],
            publishedDate: '2015-11-22',
            thumbnailURL: 'http://books.google.com/books/content?id=GEX6jgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
          }
        }
      };

      // ローカルストレージの置き換え
      getItemSpy = spyOn(localStorage, 'getItem').and.callFake((key) =>  {
        return JSON.stringify(fakeStorage[key]);
      });
      setItemSpy = spyOn(localStorage, 'setItem').and.callFake((key, value) =>  {
        fakeStorage[key] = JSON.parse(value);
      });

  });

  it('add 失敗する場合', inject([BookCacheService], (service: BookCacheService) => {
    expect(service.add(testData)).toBeFalsy();
  }));

  it('remove 成功する場合', inject([BookCacheService], (service: BookCacheService) => {
    expect(service.remove(testData)).toBeTruthy(true);
  }));

  it('get 見つかる場合', inject([BookCacheService], (service: BookCacheService) => {
    expect(service.get(testData.isbn13)).toEqual(testData);
  }));

  it('update 成功する場合', inject([BookCacheService], (service: BookCacheService) => {
    expect(service.update(testData)).toBeTruthy();
  }));

  it('clear', inject([BookCacheService], (service: BookCacheService) => {
    service.clear();
    expect(fakeStorage['bookchain-Angular-book']).toEqual({});
  }));

  it('getAll', inject([BookCacheService], (service: BookCacheService) => {
    const kameyama = {
      id: 'GEX6jgEACAAJ',
      isbn10: '430902422X',
      isbn13: '9784309024226',
      title: 'カラマーゾフの兄弟',
      authors: ['亀山郁夫'],
      publishedDate: '2015-11-22',
      thumbnailURL: 'http://books.google.com/books/content?id=GEX6jgEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    };
    const resultArray = service.getAll();
    expect(resultArray[0]).toEqual(testData);
    expect(resultArray[1]).toEqual(kameyama);
  }));
});
