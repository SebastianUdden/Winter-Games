import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  model: any = {};
  public user: User;
  public loggedIn = false;
  public loginFailed = false;
  public noUser = false;
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.noUser = true;
    this.loading = true;
    this.userService.getUser(this.model.username)
      .subscribe(
        data => {
          if (data.password === this.model.password) {
            this.loggedIn = true;
            this.loginFailed = false;
            this.noUser = false;
            this.authenticationService.changeUser(data);
            this.router.navigate([this.returnUrl]);
          } else {
            this.loggedIn = false;
            this.loginFailed = true;
            this.noUser = false;
          }
          this.loading = false;
        },
        error => {
            this.alertService.error(error);
            this.loading = false;
            this.loggedIn = false;
            this.loginFailed = true;
            this.noUser = false;
        });
  }
  //   .subscribe(user => {
  //     if (user.password === password) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   });
  //   this.authenticationService.login(this.model.username, this.model.password)
  //       .subscribe(
  //           data => {
  //               this.router.navigate([this.returnUrl]);
  //           },
  //           error => {
  //               this.alertService.error(error);
  //               this.loading = false;
  //           });
  // }
}
