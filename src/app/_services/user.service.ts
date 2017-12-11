import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/timeout';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../_models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserService {
  // private usersUrl = 'http://localhost:3000/api';
  private usersUrl = 'https://radiant-coast-25310.herokuapp.com/api';

  constructor(
    private http: HttpClient
  ) { }

  create(model) {}

  /** GET users from the server */
  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl + '/users')
      .pipe(
        tap(users => this.log(`fetched users`)),
        catchError(this.handleError('getUsers', []))
      );
  }

  /** GET user by id. Return `undefined` when id not found */
  getUserNo404<Data>(username: string): Observable<User> {
    const url = `${this.usersUrl}/?${username}`;
    return this.http.get<User[]>(url)
      .pipe(
        map(users => users[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} user ${username}`);
        }),
        catchError(this.handleError<User>(`getUser ${username}`))
      );
  }

  /** GET user by id. Will 404 if id not found */
  getUser(username: string): Observable<User> {
    const url = `${this.usersUrl}/users/${username}`;
    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user ${username}`)),
      catchError(this.handleError<User>(`getUser ${username}`))
    ).timeout(2000);
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
  addUser (model: any): Observable<User> {
    const user = new User(model.firstname, model.lastname, model.email, model.username, model.password, 0, 0, 0, '', false);
    return this.http.post<User>(this.usersUrl + '/users', user, httpOptions).pipe(
      tap((urer: User) => this.log(`added user :${user.username}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /** DELETE: delete the user from the server */
  deleteUser (user: User): Observable<User> {
    const url = `${this.usersUrl}/users/${user.username}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user ${user.username}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /** PUT: update the user on the server */
  updateUser (user: User) {
    const url = `${this.usersUrl}/users/${user.username}`;
    return this.http
      .put(url, JSON.stringify(user), httpOptions)
      .toPromise()
      .then(() => user)
      .catch(this.handleError);
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
  }
}
