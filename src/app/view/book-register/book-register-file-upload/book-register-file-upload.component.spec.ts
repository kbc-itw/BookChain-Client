import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRegisterFileUploadComponent } from './book-register-file-upload.component';

describe('BookRegisterFileUploadComponent', () => {
  let component: BookRegisterFileUploadComponent;
  let fixture: ComponentFixture<BookRegisterFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookRegisterFileUploadComponent ]
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
