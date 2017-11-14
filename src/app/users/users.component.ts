import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UpdateService } from '../_services/update.service';
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
  public selectedTab: number;


  displayFullName = false;
  message: string;
  user: User;
  userScore: number;
  userLevel: string;
  duplicate = false;
  currentUsers: Array<User> = [];
  users: Array<User> = [
      new User(1, 'Ivar', 'pokepro1337', 'Alexander', 'Ivarsson', 'alexander.ivarsson@gmail.com', 523, 'Oh, fuck off... BOSS', false),
      new User(2, 'Hammertime', 'gamm***', 'Fredrik', 'Hammargården', 'fredrik.hammargarden@gmail.com', 224, 'Maniac Special Ops', false),
      new User(3, 'Nemer', 'pappaNemer', 'Nemer', 'Achour', 'nemer.achour@gmail.com', 488, 'GODLIKE 1337', false),
      new User(4, 'Dennan', 'bigD', 'Dennis', 'Nilsson', 'dennis.nilsson@gmail.com', 131, 'Casual Grunt', false),
      new User(5, 'Mattis', 'labraatus', 'Mattias', 'Labraaten', 'mattias.labraaten@gmail.com', 23354, 'EPIC PUNISHER', false),
      new User(6, 'Bobby', 'hufflepuffster', 'Robin', 'Johansson', 'robin.johansson@gmail.com', 432, 'NO LIFE JUGGERNAUGHT', false),
      new User(7, 'Ante-HYPE', 'franstakidz', 'Andreas', 'Viklund', 'andreas.wiklund@gmail.com', 252, 'Long-lived BEAST', false),
      new User(8, 'Virre', 'baandyBoy', 'Victor', 'Molén', 'victor.molen@gmail.com', 521, 'CHEATING SUPERMAN', false),
      new User(9, 'Sebbe', 'sebsoundzzz', 'Sebastian', 'Uddén', 'sebastian.udden@gmail.com', 31256, 'Hard-boiled PUNISHER', false),
      new User(10, 'Kling', 'klingKlong', 'Alexander', 'Kling', 'alexander.kling@gmail.com', 194, 'Maniac Corporal', false),
      new User(11, 'Palmöga', 'globalFuuzbal', 'Marcus', 'Palm', 'marcus.palm@gmail.com', 174, 'Ambitious Grunt', false),
      new User(12, 'Amanda', 'awppl', 'Amanda', 'Hagberg', 'amanda-hagberg@gmail.com', 328, 'Casual N00B', false)
  ];

  constructor(private data: UpdateService) {
      this.selectedTab = 1;
      this.users = this.SortDescending(this.users);
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.data.currentUser.subscribe(user => this.user = user);
    this.data.currentUserScore.subscribe(userScore => this.userScore = userScore);
    this.data.currentUserLevel.subscribe(userLevel => this.userLevel = userLevel);
  }

  seletctTab(tab) {
    this.selectedTab = tab;
  }

  AddCurrentUser() {
      const committedUser = new User(
          this.user.id,
          this.user.username,
          this.user.password,
          this.user.firstName,
          this.user.lastName,
          this.user.email,
          this.user.score,
          this.user.level,
          this.user.current
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

