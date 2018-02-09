import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IBook } from '../../model/book/ibook';
import { OwnershipService } from '../../service/ownership/ownership.service';
import { UserService } from '../../service/user/user.service';
import { BookService } from '../../service/book/book.service';

@Component({
  selector: 'bookchain-ownership-list',
  templateUrl: './ownership-list.component.html',
  styleUrls: ['./ownership-list.component.sass'],
  // encapsulation: ViewEncapsulation.None
})
export class OwnershipListComponent implements OnInit {

  books$: Observable<IBook>;

  constructor(
    private ownershipService: OwnershipService,
    private bookService: BookService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.books$ = this.userService
      .getLoginUser()
      .flatMap(user => this.ownershipService.get({owner: user.locator}))
      .flatMap(ownership => this.bookService.getByISBN(ownership.isbn));

  }

}
