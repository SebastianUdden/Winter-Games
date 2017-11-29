import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarComponent implements OnInit {
  public user: User;
  constructor(private authenticationService: AuthenticationService) { }
  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => this.user = user);
  }
}
