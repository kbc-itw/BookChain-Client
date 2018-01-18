import { BookCacheService } from './../../service/book/book-cache.service';
import { GoogleBooksApisGatewayService } from './../../service/book/google-books-apis-gateway.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from './../../service/user/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewPartsModule } from './../view-parts/view-parts.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeGuestComponent } from './trade-guest.component';
import { MatProgressSpinnerModule, MatTabsModule, MatFormField, MatFormFieldModule} from '@angular/material';
import { BookService } from '../../service/book/book.service';

describe('TradeGuestComponent', () => {
  let component: TradeGuestComponent;
  let fixture: ComponentFixture<TradeGuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeGuestComponent ],
      imports: [ MatProgressSpinnerModule, MatTabsModule, ViewPartsModule, ReactiveFormsModule, MatFormFieldModule,
        HttpClientTestingModule],
      providers: [UserService, BookService, GoogleBooksApisGatewayService, BookCacheService]
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
