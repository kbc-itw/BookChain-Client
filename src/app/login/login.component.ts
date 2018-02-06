import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { API_BASE_URL } from '../../environments/environment';

@Component({
  selector: 'bookchain-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  readonly FACEBOOK_LOGIN_URL = API_BASE_URL + 'auth/facebook/';

  constructor() { }

  ngOnInit() {
  }

}
