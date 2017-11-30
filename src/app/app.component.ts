import { Component } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertComponent } from './authentication/alert/alert.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private _http: Http) {
  }
}
