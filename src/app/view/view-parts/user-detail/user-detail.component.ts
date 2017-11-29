import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../model/i-user';
import { Input } from '@angular/core/src/metadata/directives';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'bookchain-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass'],
  // encapsulation: ViewEncapsulation.None
})
export class UserDetailComponent implements OnInit {
  @Input()
  private user: IUser;
  private userservise: UserService;


  constructor() {
    this.userservise = new UserService();
  }

  ngOnInit() {
    this.user = this.userservise.getLoginUser();
  }

}
