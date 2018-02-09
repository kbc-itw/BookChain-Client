import { TestBed, inject } from '@angular/core/testing';

import { RoomService } from './room.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RoomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoomService],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([RoomService], (service: RoomService) => {
    expect(service).toBeTruthy();
  }));
});
