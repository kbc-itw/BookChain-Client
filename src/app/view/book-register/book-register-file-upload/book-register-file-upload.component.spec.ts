import { BookCacheService } from './../../../service/book/book-cache.service';
import { GoogleBooksApisGatewayService } from './../../../service/book/google-books-apis-gateway.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRegisterFileUploadComponent } from './book-register-file-upload.component';
import { MatProgressSpinnerModule, MatTabsModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { ViewPartsModule } from '../../view-parts/view-parts.module';
import { BookService } from '../../../service/book/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('BookRegisterFileUploadComponent', () => {
  let component: BookRegisterFileUploadComponent;
  let fixture: ComponentFixture<BookRegisterFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookRegisterFileUploadComponent ],
      imports: [ BrowserAnimationsModule, MatProgressSpinnerModule, MatTabsModule, ViewPartsModule, MatInputModule,
         ReactiveFormsModule, FormsModule, MatFormFieldModule, HttpClientTestingModule ],
      providers: [ BookService, GoogleBooksApisGatewayService, BookCacheService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookRegisterFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
