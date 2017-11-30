import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../../../model/i-user';

@Component({
  selector: 'bookchain-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass'],
  // encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit {
  @Input() user: IUser;


  constructor() {
  }

  ngOnInit() {
  }

}
