import { TestBed, inject } from '@angular/core/testing';

import { BookCacheService } from './book-cache.service';

describe('BookCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookCacheService]
    });
  });

  it('should be created', inject([BookCacheService], (service: BookCacheService) => {
    expect(service).toBeTruthy();
  }));
});
