import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { UpdateService } from '../_services/update.service';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './users.component.css',
    '../the-button/the-button.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
  public user: User;
  public selectedTab: number;
  public gambler = false;
  public maestro = false;
  public grinder = false;
  public mcFly = false;

  @Output() gamblerEvent = new EventEmitter<boolean>();
  @Output() maestroEvent = new EventEmitter<boolean>();
  @Output() grinderEvent = new EventEmitter<boolean>();
  @Output() mcFlyEvent = new EventEmitter<boolean>();

  displayFullName = false;
  duplicate = false;
  currentUsers: Array<User> = [];
  constructor(
    private data: UpdateService,
    private userService: UserService,
    private authenticationService: AuthenticationService) {
      this.selectedTab = 1;
      this.getUsers();
  }

  users: User[];
  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.SortDescending(this.users = users));
  }

  ngOnInit() {
    this.getUsers();
    this.authenticationService.currentUser.subscribe(user => this.user = user);
  }

  selectTab(tab) {
    this.selectedTab = tab;
    if (this.selectedTab === 3) {
      setTimeout (() => {
        this.toggle('gambler');
        this.toggle('maestro');
        this.toggle('grinder');
        this.toggle('mcFly');
      }, 1);
    }
  }

  toggle(type) {
    const element = document.getElementById(type + 'CheckBox');
    if (this[type] !== (element as any).checked) {
      this[type] = !this[type];
      element.click();
    }
  }

  setType(type) {
    this[type] = !this[type];
    this[type + 'Event'].emit(this[type]);
  }

  AddCurrentUser() {
    const committedUser = new User(
      this.user.firstname,
      this.user.lastname,
      this.user.email,
      this.user.username,
      this.user.password,
      this.user.score,
      this.user.playthroughs,
      this.user.level,
      this.user.admin
    );
    let userExists = false;
    for (let i = 0; i < this.currentUsers.length; i++) {
      if (this.users[i].username === committedUser.username) {
          userExists = true;
      }
    }
    if (!userExists) {
        this.users.push(committedUser);
        this.duplicate = true;
    } else {
        this.duplicate = true;
    }
    this.users = this.SortDescending(this.users);
  }
  ToggleFullName() {
    return this.displayFullName = !this.displayFullName;
  }

  SortDescending(array) {
    return array.sort(function(a, b){ return b.score - a.score; });
  }

  SortAscending(array) {
    return array.sort(function(a, b){ return a.score - b.score; });
  }

  SortAlphabetically(array) {
    return array.sort();
  }

  ReverseAlphabetically(array) {
    return array.sort();
  }
}

