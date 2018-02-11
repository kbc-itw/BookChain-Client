import { UserRegisterService } from './../../service/user/user-register.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'bookchain-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class UserRegisterComponent implements OnInit {

  constructor(private router: Router, private userRegisterService: UserRegisterService, private userService: UserService) { }

  public localId: string;
  public displayName: string;
  public input_prohibit = false;

  ngOnInit() {
    this.userService.getLoginUser()
      .subscribe((user) => {
        this.router.navigate(['/']);
      });
  }

  register() {
    this.input_prohibit = true;
    this.userRegisterService.register(this.localId, this.displayName)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, (err) => {
        this.input_prohibit = false;
      });
  }

  onClick() {
    this.register();
  }
}
