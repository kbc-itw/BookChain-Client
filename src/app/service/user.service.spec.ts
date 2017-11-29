import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
  });

  it('ダミーを返す', inject([UserService], (service: UserService) => {
    expect(service.getLoginUser).toBeTruthy();
  }));
});
