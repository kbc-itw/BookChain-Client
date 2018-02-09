import { TestBed, inject } from '@angular/core/testing';

import { OwnershipService } from './ownership.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OwnershipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnershipService],
      imports  : [HttpClientTestingModule],
    });
  });

  it('should be created', inject([OwnershipService], (service: OwnershipService) => {
    expect(service).toBeTruthy();
  }));
});
