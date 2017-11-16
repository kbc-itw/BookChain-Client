import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAboutComponent } from './book-about.component';
import { IBook } from '../../../../model/book/ibook';

describe('BookAboutComponent', () => {
  let component: BookAboutComponent;
  let fixture: ComponentFixture<BookAboutComponent>;


  const testData: IBook =  {
    id:            'm2BpPQAACAAJ',
    isbn10:        '4062639149',
    isbn13:        '9784062639149',
    title:         '天空の蜂',
    authors:       ['東野圭吾', 'テスト太郎'],
    publishedDate: '1998',
    thumbnailURL:  'http://books.google.com/books/content?id=m2BpPQAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAboutComponent);
    component = fixture.componentInstance;
    component.book = testData;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('インスタンス生成', () => {
    expect(component).toBeTruthy();
  });

  it('書籍データ表示', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('td')[1].textContent).toContain('天空の蜂');
    expect(compiled.querySelectorAll('td')[5].textContent).toContain('東野圭吾など');
  });
});
