import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { UpdateService } from '../_services/update.service';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-the-duel',
  templateUrl: './the-duel.component.html',
  styleUrls: ['./the-duel.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TheDuelComponent implements OnInit {
  public user: User;
  public selectedUser: User;
  public challenge = false;
  public challengeAccept = false;

  constructor(
    private data: UpdateService,
    private userService: UserService,
    private authenticationService: AuthenticationService) {
  }

  users: User[];
  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.SortDescending(this.users = users));
  }

  ngOnInit() {
    this.getUsers();
    this.authenticationService.currentUser.subscribe(user => this.user = user);
    this.selectUser(this.user);
  }

  SortDescending(array) {
    return array.sort(function(a, b){ return b.score - a.score; });
  }

  selectUser(user) {
    this.selectedUser = user;
  }

  challengeOpponent() {
    alert('Challenging ' + this.selectedUser.username);
    this.challenge = true;
  }

  chickenOut() {
    alert('Scared of ' + this.selectedUser.username + '?');
    this.challenge = false;
  }
}
