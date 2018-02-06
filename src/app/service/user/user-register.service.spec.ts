import { TestBed, inject } from '@angular/core/testing';

import { UserRegisterService } from './user-register.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserRegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserRegisterService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([UserRegisterService], (service: UserRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
