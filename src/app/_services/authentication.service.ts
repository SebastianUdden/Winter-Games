import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UserService } from './user.service';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

// @Injectable()
// export class AuthenticationService {
//   user: User;
//   private userSource = new BehaviorSubject<User>(this.user);
//   public currentUser = this.userSource.asObservable();

//   constructor(private userService: UserService) { }

//   changeUser(user: User) {
//     this.userSource.next(user);
//   }
//   logout() {
//     this.userSource.next(new User());
//   }
// }

@Injectable()
export class AuthenticationService {
  user: User;
  public token: string;

  private userSource = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  public currentUser = this.userSource.asObservable();

  constructor(private userService: UserService, private http: Http) {
    // const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // this.token = currentUser && currentUser.token;
    // alert(this.token);
  }

  changeUser(user: User) {
    this.userSource.next(user);
    // localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    // localStorage.removeItem('currentUser');
    // const jd = localStorage.getItem('currentUser');
    // alert(jd);
    // user = JSON.parse(localStorage.getItem('currentUser'));
    // alert(user);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    // localStorage.setItem('currentUser', JSON.stringify(user));
  }
  logout() {
    // const loggedInUser = localStorage.getItem('currentUser');
    this.userSource.next(new User());
    localStorage.removeItem('currentUser');
  }
}

    // private http: Http,
    // login(username: string, password: string) {

    // }
    // private url = 'https://radiant-coast-25310.herokuapp.com';
    // private usersUrl = 'http://localhost:3000/api';
    // login(username: string, password: string) {
    //   const user = this.userService.getUser(username);
    //   user.subscribe()
    //   if (user.password === password) {
    //   }
    // }

    // login(username: string, password: string) {
    //     return this.http.post(this.url + '/authenticate', JSON.stringify({ username: username, password: password }))
    //         .map((response: Response) => {
    //             // login successful if there's a jwt token in the response
    //             const user = response.json();
    //             if (user && user.token) {
    //                 // store user details and jwt token in local storage to keep user logged in between page refreshes
    //                 localStorage.setItem('currentUser', JSON.stringify(user));
    //             }

    //             return user;
    //         });
    // }
      // remove user from local storage to log user out
