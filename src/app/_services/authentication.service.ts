import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UserService } from './user.service';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthenticationService {
  user: User;
  public token: string;

  private userSource = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
  public currentUser = this.userSource.asObservable();

  constructor(private userService: UserService, private http: Http) {
  }

  changeUser(user: User) {
    this.userSource.next(user);
  }
  logout() {
    this.userSource.next(new User('', '', '', '', '', 0, 0, 0, [], '', false, 0));
    sessionStorage.removeItem('currentUser');
  }
}
