import { TestBed, inject } from '@angular/core/testing';

import { TradingService } from './trading.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TradingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradingService],
      imports  : [HttpClientTestingModule]
    });
  });

  it('should be created', inject([TradingService], (service: TradingService) => {
    expect(service).toBeTruthy();
  }));
});
