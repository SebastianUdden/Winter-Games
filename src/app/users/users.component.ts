import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { UpdateService } from '../_services/update.service';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';
import { Attribute } from '../attribute/attribute';
import { Leecher } from '../_models/leecher';

import { AttributeComponent } from '../attribute/attribute.component';

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
  public selectedUser: User;
  public selectedTab: number;
  public showHighscore = true;
  public leecher = false;
  public leecherUser: Leecher = new Leecher('', new Date(), 0);
  public dateTime = new Date();
  public gambler = false;
  public maestro = false;
  public grinder = false;
  public mcFly = true;
  public marketAttributes = [
    // new Attribute('Leech', 'Steal 1% of an opponents wealth per hour during a total of 3 hours.', 'Every three hours.', 50, '#cc33cc', 'url("assets/images/attributes/box.png");', false),
    // new Attribute('Dual-Wield', 'Get X2, permanently, like a BOSS.', 'Always active.', 100, '#cc33cc', 'url("assets/images/attributes/box.png");', false),
    // new Attribute('Minigun', 'Get X40 for a 10 second period.', 'Once per day.', 200, '#cc33cc', 'url("assets/images/attributes/box.png");', false),
    // new Attribute('Time-Lord', 'Get an extra 30 seconds for each round.', 'Always active.', 300, '#cc33cc', 'url("assets/images/attributes/box.png");', false),
    // new Attribute('Captains Badge', 'You will be a team captain on the DAY.', '28th December.', 99999, '#cc33cc', 'url("assets/images/attributes/box.png");', false)
  ];
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
  getAttributes(): void {
    this.userService.getAttributes()
      .subscribe(attributes => this.SortDescending(this.marketAttributes = attributes));

    setTimeout(() => {
      for (let i = 0; i < this.marketAttributes.length; i++) {
        this.marketAttributes[i].owned = false;
        for (let x = 0; x < this.user.attributes.length; x++) {
          if (this.marketAttributes[i].name === this.user.attributes[x].name) {
            this.marketAttributes[i].owned = true;
          }
          if (this.user.attributes[x].name === 'Leech') {
            this.leecher = true;
            this.dateTime = new Date();
          }
        }
      }
    }, 1000);
  }

  ngOnInit() {
    this.getAttributes();
    this.getUsers();
    this.authenticationService.currentUser.subscribe(user => this.user = user);
    this.selectUser(this.user);
  }

  selectTab(tab) {
    this.selectedTab = tab;
    if (this.selectedTab === 3) {
      setTimeout (() => {
        this.toggle('maestro');
        // this.toggle('gambler');
        // this.toggle('grinder');
        // this.toggle('mcFly');
      }, 1);
    }
  }

  toggle(type) {
    const element = document.getElementById(type + 'CheckBox');
    if (element) {
      if (this[type] !== (element as any).checked) {
        this[type] = !this[type];
        element.click();
      }
    }
  }

  setType(type) {
    this[type] = !this[type];
    this[type + 'Event'].emit(this[type]);
  }

  leech(user) {
    let latestLeech = new Date();
    this.dateTime = new Date();

    let leechUser = false;
    if (!this.user.nextLeech || this.user.nextLeech === 0) { leechUser = true; }
    else if (this.user.nextLeech < latestLeech.getTime()) { leechUser = true; }
    else {
      alert('An hour must pass before you can leech again!');
    }

    if (leechUser) {
      let leechAmount = Math.floor(user.wallet * 0.01)
      latestLeech.setTime(latestLeech.getTime() + (1*60*60*1000));
      this.user.nextLeech = latestLeech.getTime();

      this.selectedUser.wallet -= leechAmount;
      this.user.wallet += leechAmount;
      this.selectedUser.leechLoss += leechAmount;
      this.user.leechGain += leechAmount;
      this.leecherUser.username = this.user.username;
      this.leecherUser.leechedAt = this.dateTime;
      this.leecherUser.amount = leechAmount;
      this.selectedUser.leechers.unshift(this.leecherUser);
      this.userService.updateUser(this.user);
      this.authenticationService.changeUser(this.user);

      this.userService.updateUser(this.selectedUser);
      sessionStorage.removeItem('currentUser');
      sessionStorage.setItem('currentUser', JSON.stringify(this.user));
    }
  }

  AddCurrentUser() {
    const committedUser = new User(
      this.user.firstname,
      this.user.lastname,
      this.user.email,
      this.user.username,
      this.user.password,
      this.user.score,
      this.user.wallet,
      this.user.playthroughs,
      this.user.attributes,
      this.user.level,
      this.user.admin,
      this.user.nextLeech,
      this.user.leechGain,
      this.user.leechLoss,
      this.user.leechers
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

  toggleHighscore() {
    return this.showHighscore = !this.showHighscore;
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

  selectUser(user) {
    this.selectedUser = user;
    this.selectTab(2);
  }
}

