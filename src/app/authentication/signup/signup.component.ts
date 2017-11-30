import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { AlertService } from '../../_services/alert.service';
import { User } from '../../_models/user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  model: any = {};
  user: User;
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  register() {
    this.loading = true;
    this.userService.addUser(this.model)
      .subscribe(
        data => {
          // set success message and pass true paramater to persist the message after redirecting to the login page
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
  ngOnInit() {
  }
}
