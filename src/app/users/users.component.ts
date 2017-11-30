import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
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
  // message: string;
  // userScore: number;
  // userLevel: string;
  duplicate = false;
  currentUsers: Array<User> = [];
  // users: Array<User> = [
  //   new User(1, 'Ivar', 'pokepro1337', 'Alexander', 'Ivarsson', 'alexander.ivarsson@gmail.com', 523, 'Oh, fuck off... BOSS', false),
  //   new User(2, 'Hammertime', 'gamm***', 'Fredrik', 'Hammargården', 'fredrik.hammargarden@gmail.com', 224, 'Maniac Special Ops', false),
  //   new User(3, 'Nemer', 'pappaNemer', 'Nemer', 'Achour', 'nemer.achour@gmail.com', 488, 'GODLIKE 1337', false),
  //   new User(4, 'Dennan', 'bigD', 'Dennis', 'Nilsson', 'dennis.nilsson@gmail.com', 131, 'Casual Grunt', false),
  //   new User(5, 'Mattis', 'labraatus', 'Mattias', 'Labraaten', 'mattias.labraaten@gmail.com', 23354, 'EPIC PUNISHER', false),
  //   new User(6, 'Bobby', 'hufflepuffster', 'Robin', 'Johansson', 'robin.johansson@gmail.com', 432, 'NO LIFE JUGGERNAUGHT', false),
  //   new User(7, 'Ante-HYPE', 'franstakidz', 'Andreas', 'Viklund', 'andreas.wiklund@gmail.com', 252, 'Long-lived BEAST', false),
  //   new User(8, 'Virre', 'baandyBoy', 'Victor', 'Molén', 'victor.molen@gmail.com', 521, 'CHEATING SUPERMAN', false),
  //   new User(9, 'Sebbe', 'sebsoundzzz', 'Sebastian', 'Uddén', 'sebastian.udden@gmail.com', 31256, 'Hard-boiled PUNISHER', false),
  //   new User(10, 'Kling', 'klingKlong', 'Alexander', 'Kling', 'alexander.kling@gmail.com', 194, 'Maniac Corporal', false),
  //   new User(11, 'Palmöga', 'globalFuuzbal', 'Marcus', 'Palm', 'marcus.palm@gmail.com', 174, 'Ambitious Grunt', false),
  //   new User(12, 'Amanda', 'awppl', 'Amanda', 'Hagberg', 'amanda-hagberg@gmail.com', 328, 'Casual N00B', false)
  // ];
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
    // this.users = this.SortDescending(this.users);
  }

  ngOnInit() {
    this.getUsers();
    this.authenticationService.currentUser.subscribe(user => this.user = user);
    // this.data.currentMessage.subscribe(message => this.message = message);
    // this.data.currentUser.subscribe(user => this.user = user);
    // this.data.currentUserScore.subscribe(userScore => this.userScore = userScore);
    // this.data.currentUserLevel.subscribe(userLevel => this.userLevel = userLevel);
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
      this.user.current,
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

