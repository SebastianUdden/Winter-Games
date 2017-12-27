import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
// import { setTimeout } from 'timers';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  user: User;
  public choice = false;
  public evil = false;
  public deleteButton = false;
  public wealth = 0;
  admins: User[] = [];
  blueTeam: User[] = [];
  redTeam: User[] = [];
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
    this.loadAllUsers();
  }
  private loadAllUsers() {
    this.userService.getUsers().subscribe(users => { this.users = this.sortDescendingDynamic(users); });
    // this.userService.getUsers().subscribe(users => { this.users = this.sortDescendingSet(users); });
  }
  changeWealth(user, create) {
    if (create) {
      user.wallet += this.wealth;
      this.userService.updateUser(user);
    } else {
      user.wallet -= this.wealth;
      this.userService.updateUser(user);
    }
  }
  sortDescendingDynamic(array) {
    array.sort(function(a, b){ return b.score - a.score; });
    for (let i = 0; i < array.length; i++) {
      if (array[i].admin) {
        this.admins.push(array[i]);
        array.splice(i, 1)
      }
    }
    for (let i = 0; i < array.length; i++) {
      switch(i) {
        case 0:
          this.blueTeam.push(array[i]);
          break;
        case 1:
          this.redTeam.push(array[i]);
          break;
        case 2:
          this.redTeam.push(array[i]);
          break;
        case 3:
          this.blueTeam.push(array[i]);
          break;
        case 4:
          this.redTeam.push(array[i]);
          break;
        case 5:
          this.blueTeam.push(array[i]);
          break;
        case 6:
          this.redTeam.push(array[i]);
          break;
        case 7:
          this.blueTeam.push(array[i]);
          break;
        case 8:
          this.redTeam.push(array[i]);
          break;
        case 9:
          this.blueTeam.push(array[i]);
          break;
        case 10:
          this.redTeam.push(array[i]);
          break;
        default:
          break;
      }
    }
    this.blueTeam.unshift(this.admins[0]);
    this.redTeam.unshift(this.admins[1]);
    return array;
  }

  sortDescendingSet(array) {
    let teamsArray = array.sort(function(a, b){ return b.score - a.score; });
    for (let i = 0; i < array.length; i++) {
      switch(array[i].username) {
        case 'Robban':
          this.blueTeam.push(array[i]);
          break;
        case 'Nemer':
          this.blueTeam.push(array[i]);
          break;
        case 'Virre':
          this.blueTeam.push(array[i]);
          break;
        case 'Amanda':
          this.blueTeam.push(array[i]);
          break;
        case 'Kling':
          this.blueTeam.push(array[i]);
          break;
        case 'Mattis':
          this.blueTeam.push(array[i]);
          break;
        case 'Fredde':
          this.redTeam.push(array[i]);
          break;
        case 'Robin':
          this.redTeam.push(array[i]);
          break;
        case 'Schaeran':
          this.redTeam.push(array[i]);
          break;
        case 'Ivar':
          this.redTeam.push(array[i]);
          break;
        case 'Dennan':
          this.redTeam.push(array[i]);
          break;
        case 'Sebbe':
          this.redTeam.push(array[i]);
          break;
        default:
          break;
      }
    }
    for (let i = 0; i < this.blueTeam.length; i++) {
      if (this.blueTeam[i]) {
        this.blueTeamScore += this.blueTeam[i].score;
      }
    }
    for (let i = 0; i < this.redTeam.length; i++) {
      if (this.redTeam[i]) {
        this.redTeamScore += this.redTeam[i].score;
      }
    }
    return array;
  }

  goStraightEvil(evil) {
    if (evil === undefined) {
      this.choice = false;
      this.evil = undefined;
    } else {
      this.deleteButton = false;
      this.choice = true;
      this.evil = evil;
    }
  }
  editScore(user, multiplier) {
    this.deleteButton = false;
    user.score *= multiplier;
    this.userService.updateUser(user);
  }
  promote(username, promotion) {
    this.deleteButton = false;
    for (let i = 0; i < this.allAttributes.length; i++) {
      if (this.allAttributes[i].name === promotion) {
        this.allAttributes[i].ownedBy = username;
      }
      this.userService.updateAttribute(this.allAttributes[i]);
    }
  }
  giveViking(user) {
    this.deleteButton = false;
    for (let i = 0; i < this.allAttributes.length; i++) {
      console.log(this.allAttributes[i].name);
      if (this.allAttributes[i].name === 'Viking') {
        console.log('pushing viking');
        user.attributes.push(this.allAttributes[i]);
      }
      this.userService.updateUser(user);
    }
  }
  demote(user) {
    this.deleteButton = false;
    user.admin = false;
    this.userService.updateUser(user);
  }
  loadUser(event: KeyboardEvent) {
    const username = (<HTMLInputElement>event.target).value;
    this.userService.getUser(username).subscribe(user => { this.user = user; });
  }
  beforeDeleteUser() {
    if (confirm('Do you want to delete the user? This was probably just a missclick, just push no and be on your way!')) {
      this.deleteButton = true;
    } else {
      this.deleteButton = false;
    }
  }
  deleteUser(user: User) {
    if (confirm('Are you sure you want to delete user from database, this is permanent and will probably really piss them off!')) {
      this.userService.deleteUser(user).subscribe(() => { this.loadAllUsers(); });
    }
    this.deleteButton = false;
  }
  gofuckyourself(name) {
    this.deleteButton = false;
    if (confirm('Really ' + name + '? REALLY?!!')) {
      alert('You really thought you could delete the CREATOR, the OG, the destroyer of MEN? I will obliterate YOU!');
      alert('#"!"_>s?´´a23=)}8¤@5€@/+*^! Initiating hacking sequence...');
      alert('5€´´a23=)}@/+*^!#"!"_>s?8¤@ Hacking internet history of ' + name + '...');
      alert('¤?8@5€´s´a2^!#"!"_>3=)}@/+* Retreiving assets of ' + name + '...');
      alert('#"/+*¤>3=)}@^!?8@5€´s´a2!"_ Planting fake evidence in computer of ' + name + '...');
      alert('}@^!?a2!"_#"/+*¤>3=)8@5€´s´ Calling police to your location...');
      alert('Ok Im done, now fuck off ' + name + '!');
    }
  }
}
