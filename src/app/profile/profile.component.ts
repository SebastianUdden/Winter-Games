import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
  public user: User;
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => this.user = user);
  }

  update() {
    this.userService.updateUser(this.user);
  }
}
