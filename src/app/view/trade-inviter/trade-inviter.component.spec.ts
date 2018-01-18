import { TradingService } from './../../service/trading/trading.service';
import { TradeInviterComponent } from './../trade-inviter/trade-inviter.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule, MatTabsModule, MatFormFieldModule } from '@angular/material';
import { ViewPartsModule } from '../view-parts/view-parts.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../service/user/user.service';
import { BookService } from '../../service/book/book.service';
import { GoogleBooksApisGatewayService } from '../../service/book/google-books-apis-gateway.service';
import { BookCacheService } from '../../service/book/book-cache.service';
import { ActivatedRoute } from '@angular/router/src/router_state';

describe('TradeInviterComponent', () => {
  let component: TradeInviterComponent;
  let fixture: ComponentFixture<TradeInviterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeInviterComponent ],
      imports: [ MatProgressSpinnerModule, MatTabsModule, ViewPartsModule, ReactiveFormsModule, MatFormFieldModule,
        HttpClientTestingModule],
      providers: [UserService, BookService, GoogleBooksApisGatewayService, BookCacheService, TradingService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeInviterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
