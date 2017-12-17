import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/timeout';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../_models/user';
import { Attribute } from '../attribute/attribute';

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

  /** GET attributes from the server */
  getAttributes (): Observable<Attribute[]> {
    return this.http.get<Attribute[]>(this.usersUrl + '/attributes')
      .pipe(
        tap(users => this.log(`fetched attributes`)),
        catchError(this.handleError('getAttributes', []))
      );
  }
  /** GET attribute by name. Will 404 if id not found */
  getAttribute(name: string): Observable<Attribute> {
    const url = `${this.usersUrl}/attributes/${name}`;
    return this.http.get<Attribute>(url).pipe(
      tap(_ => this.log(`fetched attribute ${name}`)),
      catchError(this.handleError<Attribute>(`getAttribute ${name}`))
    ).timeout(2000);
  }
  /** POST: add a new attribute to the server */
  addAttribute (model: any): Observable<Attribute> {
    const attribute = new Attribute(model.name, model.description, model.usage, model.price, model.color, model.img, false, model.string);
    return this.http.post<Attribute>(this.usersUrl + '/attributes', attribute, httpOptions).pipe(
      tap((attribute: Attribute) => this.log(`added attribute :${attribute.name}`)),
      catchError(this.handleError<Attribute>('addAttribute'))
    );
  }
  /** DELETE: delete the attribute from the server */
  deleteAttribute (attribute: Attribute): Observable<Attribute> {
    const url = `${this.usersUrl}/attributes/${attribute.name}`;

    return this.http.delete<Attribute>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted attribute ${attribute.name}`)),
      catchError(this.handleError<Attribute>('deleteAttribute'))
    );
  }
  /** PUT: update the attribute on the server */
  updateAttribute (attribute: Attribute) {
    const url = `${this.usersUrl}/attributes/${attribute.name}`;
    return this.http
      .put(url, JSON.stringify(attribute), httpOptions)
      .toPromise()
      .then(() => attribute)
      .catch(this.handleError);
  }

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
    const user = new User(model.firstname, model.lastname, model.email, model.username, model.password, 0, 0, 0, [], '', false, 0);
    return this.http.post<User>(this.usersUrl + '/users', user, httpOptions).pipe(
      tap((user: User) => this.log(`added user :${user.username}`)),
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
