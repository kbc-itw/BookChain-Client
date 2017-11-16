import { IBook } from './../../../../model/book/ibook';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bookchain-book-about',
  templateUrl: './book-about.component.html',
  styleUrls: ['./book-about.component.sass'],
  // encapsulation: ViewEncapsulation.None
})
export class BookAboutComponent implements OnInit {

  @Input() book: IBook;
  private authors: String;
  constructor() { }

  ngOnInit() {
    this.authors = this.book.authors[0] + (this.book.authors.length > 1 ? 'など' : '');
  }

}
