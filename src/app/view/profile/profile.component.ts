import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'bookchain-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
  // encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

  constructor(private userservice: UserService) { }

  ngOnInit() {
  }

}
