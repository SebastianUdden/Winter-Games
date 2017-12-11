import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DatabaseComponent implements OnInit {
  public user: User;
  public JSON: any;
  public showUsers = false;
  public indexArray = [];
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService) {
      this.JSON = JSON;
  }

  users: User[];
  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.SortDescending(this.users = users));
    this.createIndexArray();
  }

  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.authenticationService.currentUser.subscribe(user => this.user = user);
    this.getUsers();
  }

  toggleShowJSON(index) {
    this.indexArray[index] = !this.indexArray[index];
  }
  showAllJSON() {
    this.showUsers = true;
    for (let i = 0; i < this.users.length; i++) {
      this.indexArray[i] = true;
    }
  }
  hideAllJSON() {
    this.showUsers = false;
    for (let i = 0; i < this.users.length; i++) {
      this.indexArray[i] = false;
    }
  }
  createIndexArray() {
    if (this.users) {
      for (let i = 0; i < this.users.length; i++) {
        this.indexArray.push(false);
      }
    }
  }
  SortDescending(array) {
    return array.sort(function(a, b){ return b.score - a.score; });
  }
}
