import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { IUser } from '../../model/i-user';

@Component({
  selector: 'bookchain-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  // encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  private loginUser: IUser;

  constructor(private userservice: UserService) { }

  ngOnInit() {
    this.loginUser = this.userservice.getLoginUser();
  }

  // テスト用メソッド
  public getUser(): IUser {
    return this.loginUser;
  }

}
