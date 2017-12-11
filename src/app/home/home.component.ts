import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  user: User;
  constructor(
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.authenticationService.currentUser.subscribe(user => this.user = user);
  }
}
