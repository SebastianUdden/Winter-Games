import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserHomeComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  user: User;

  constructor(private userService: UserService) {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.loadAllUsers();
  }
  private loadAllUsers() {
    this.userService.getUsers().subscribe(users => { this.users = users; });
  }

  loadUser(event: KeyboardEvent) {
    // const id = Number((<HTMLInputElement>event.target).value);
    const username = (<HTMLInputElement>event.target).value;
    this.userService.getUser(username).subscribe(user => { this.user = user; });
  }
  deleteUser(user: User) {
      this.userService.deleteUser(user).subscribe(() => { this.loadAllUsers(); });
  }
}
