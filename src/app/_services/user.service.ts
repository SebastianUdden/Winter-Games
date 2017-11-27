// import { Injectable } from '@angular/core';
// import { Http, Headers, RequestOptions, Response } from '@angular/http';
// import 'rxjs/add/operator/map';



// @Injectable()
// export class UserService {
//   data: any = null;
//   public url = 'https://radiant-coast-25310.herokuapp.com';

//   constructor(private _http: Http) {
//     this.getUsers();
//   }

//   private getUsers() {
//       return this._http.get(this.url + '/users')
//         .map((res: Response) => res.json())
//         .subscribe(data => {
//           this.data = data;
//           console.log(this.data);
//         });
//   }

//     // getById(id: number) {
//     //     return this.http.get('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
//     // }

//     // create(user: User) {
//     //     return this.http.post('/api/users', user, this.jwt()).map((response: Response) => response.json());
//     // }

//     // update(user: User) {
//     //     return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
//     // }

//     // delete(id: number) {
//     //     return this.http.delete('/api/users/' + id, this.jwt()).map((response: Response) => response.json());
//     // }

//     // private helper methods
//     private jwt() {
//         // create authorization header with jwt token
//         const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//         if (currentUser && currentUser.token) {
//             const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
//             return new RequestOptions({ headers: headers });
//         }
//     }
// }



//////////////////////////////////////////////////////////////////////////////

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../_models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  private usersUrl = 'https://radiant-coast-25310.herokuapp.com';

  constructor(
    private http: HttpClient
  ) { }

  /** GET users from the server */
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        tap(users => this.log(`fetched users`)),
        catchError(this.handleError('getUsers', []))
      );
  }

  /** GET user by id. Return `undefined` when id not found */
  getUserNo404<Data>(id: number): Observable<User> {
    const url = `${this.usersUrl}/?id=${id}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(users => users[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} user id=${id}`);
        }),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  /** GET user by id. Will 404 if id not found */
  getUser(id: number): Observable<User> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /* GET users whose name contains search term */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty user array.
      return of([]);
    }
    const url = `${this.usersUrl}/users/?name=${term}`;
    return this.http.get<User[]>(url).pipe(
      tap(_ => this.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new user to the server */
  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions).pipe(
      tap((urer: User) => this.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** DELETE: delete the user from the server */
  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /** PUT: update the user on the server */
  updateUser (user: User): Observable<any> {
    return this.http.put(this.usersUrl, user, httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a UserService message with the MessageService */
  private log(message: string) {
    console.log(message);
    // this.messageService.add('UserService: ' + message);
  }
}
