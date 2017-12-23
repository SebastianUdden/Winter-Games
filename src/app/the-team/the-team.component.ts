import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DecimalPipe } from '@angular/common';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-the-team',
  templateUrl: './the-team.component.html',
  styleUrls: ['./the-team.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TheTeamComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  user: User;
  public blueLeader: User;
  public redLeader: User;
  public choice = false;
  public evil = false;
  public deleteButton = false;
  admins: User[] = [];
  public blueTeam: User[] = [];
  public redTeam: User[] = [];
  public marketAttributes = [];
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService) {
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
        }
      }
    }, 1000);
  }

  ngOnInit() {
    this.getAttributes();
    this.authenticationService.currentUser.subscribe(user => this.user = user);
    this.loadAllUsers();
  }
  private loadAllUsers() {
    this.userService.getUsers().subscribe(users => { this.users = this.sortDescending(users); });
  }
  SortDescending(array) {
    return array.sort(function(a, b){ return b.score - a.score; });
  }
  sortDescending(array) {
    let teamsArray = array.sort(function(a, b){ return b.score - a.score; });
    for (let i = 0; i < array.length; i++) {
      // if (array[i].admin) {
      //   this.admins.push(array[i]);
      //   teamsArray = array.splice(i, 1)
      // }
      for (let x = 0; x < this.marketAttributes.length; x++) {
        if (this.marketAttributes[x].name === 'Captains-Badge-Blue') {
          if (this.marketAttributes[x].ownedBy === array[i].username) {
            this.blueLeader = array[i];
            array.splice(i, 1)
          }
        }
        if (this.marketAttributes[x].name === 'Captains-Badge-Red') {
          if (this.marketAttributes[x].ownedBy === array[i].username) {
            this.redLeader = array[i];
            array.splice(i, 1)
          }
        }
      }
    }
    this.blueTeam.unshift(this.blueLeader);
    this.redTeam.unshift(this.redLeader);
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
          this.blueTeam.push(array[i]);
          break;
        case 5:
          this.redTeam.push(array[i]);
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
          if(this.blueTeam.length > this.redTeam.length) {
            this.redTeam.push(array[i]);
          } else {
            this.blueTeam.push(array[i]);
          }
          break;
        default:
          break;
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
  promote(user) {
    this.deleteButton = false;
    user.admin = true;
    this.userService.updateUser(user);
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
