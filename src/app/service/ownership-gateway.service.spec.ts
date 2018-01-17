import { TestBed, inject } from '@angular/core/testing';

import { OwnershipGatewayService } from './ownership-gateway.service';

describe('OwnershipGatewayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OwnershipGatewayService]
    });
  });

  it('should be created', inject([OwnershipGatewayService], (service: OwnershipGatewayService) => {
    expect(service).toBeTruthy();
  }));
});
