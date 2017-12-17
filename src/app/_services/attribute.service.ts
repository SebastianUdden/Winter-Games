import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/timeout';
import { catchError, map, tap } from 'rxjs/operators';
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
    const attribute = new Attribute(model.name, model.description, model.usage, model.price, model.color, model.img, false);
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
