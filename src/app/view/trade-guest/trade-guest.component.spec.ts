import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeGuestComponent } from './trade-guest.component';

describe('TradeGuestComponent', () => {
  let component: TradeGuestComponent;
  let fixture: ComponentFixture<TradeGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeGuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeGuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
