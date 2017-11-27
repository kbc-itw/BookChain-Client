import { TestBed, inject } from '@angular/core/testing';

import { TradingService } from './trading.service';

describe('TradingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TradingService]
    });
  });

  it('should be created', inject([TradingService], (service: TradingService) => {
    expect(service).toBeTruthy();
  }));
});
