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
  constructor() { }

  ngOnInit() {
  }

}
