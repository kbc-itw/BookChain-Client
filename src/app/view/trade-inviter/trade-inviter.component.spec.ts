import { TradeInviterComponent } from './../trade-inviter/trade-inviter.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('TradeInviterComponent', () => {
  let component: TradeInviterComponent;
  let fixture: ComponentFixture<TradeInviterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeInviterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeInviterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
