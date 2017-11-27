import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { User } from '../_models/user';

@Injectable()
export class UserService {
  data: any = null;
  public url = 'https://radiant-coast-25310.herokuapp.com';

  constructor(private _http: Http) {
    this.getAllUsers();
  }

  private getAllUsers() {
      return this._http.get(this.url + '/users')
        .map((res: Response) => res.json())
        .subscribe(data => {
          this.data = data;
          console.log(this.data);
        });
  }

    // getById(id: number) {
    //     return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    // }

    // create(user: User) {
    //     return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
    // }

    // update(user: User) {
    //     return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
    // }

    // delete(id: number) {
    //     return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
    // }

    // private helper methods
    private jwt() {
        // create authorization header with jwt token
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}
