import { Component } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
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
}
