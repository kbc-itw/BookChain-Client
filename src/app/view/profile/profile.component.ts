import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { IUser } from '../../model/i-user';
import { UserDetailComponent } from '../view-parts/user-detail/user-detail.component';

@Component({
  selector: 'bookchain-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  // encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  private loginUser: IUser;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getLoginUser()
      .subscribe(user => this.loginUser = user);
  }
}
