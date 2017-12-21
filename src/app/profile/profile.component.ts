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
  public allAttributes = [];
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService) {

    }

  getAttributes(): void {
    this.userService.getAttributes()
      .subscribe(attributes => this.SortDescending(this.allAttributes = attributes));

    setTimeout(() => {
      for (let i = 0; i < this.allAttributes.length; i++) {
        this.allAttributes[i].owned = false;
        for (let x = 0; x < this.user.attributes.length; x++) {
          if (this.allAttributes[i].name === this.user.attributes[x].name) {
            this.allAttributes[i].owned = true;
          }
        }
      }
    }, 1000);
  }
  SortDescending(array) {
    return array.sort(function(a, b){ return b.score - a.score; });
  }
  ngOnInit() {
    this.getAttributes();
    this.authenticationService.currentUser.subscribe(user => this.user = user);
  }

  update() {
    this.userService.updateUser(this.user);
  }
}
