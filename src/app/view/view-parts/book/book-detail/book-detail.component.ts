import { Component, OnInit, Input } from '@angular/core';
import { IBook } from '../../../../model/book/ibook';

@Component({
  selector: 'bookchain-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.sass'],
  // encapsulation: ViewEncapsulation.None
})
export class BookDetailComponent implements OnInit {

  @Input() book: IBook;
  private authors: String;

  constructor() { }

  ngOnInit() {
    this.authors = this.book.authors.join(', ');
  }

}
