import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { User } from '../_models/user';
import { UpdateService } from '../_services/update.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserFormComponent implements OnInit {
  user: User;
  message: string;
  submitted = false;
  model = new User(0, '', '', '', '', '', 0, '', false);

  userForm = new FormGroup ({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
  });

  constructor(private data: UpdateService) { }
  ngOnInit() {
      this.data.currentMessage.subscribe(message => this.message = message)
      this.data.currentUser.subscribe(user => this.user = user);
  }
  newMessage() {
      this.data.changeMessage('Hello from Sibling');
  }
  newUser() {
      this.data.changeUser(this.model);
  }

  get diagnostic() { return JSON.stringify(this.model); }

  onSubmit() {
      this.submitted = true;
      this.newUser();
      this.userForm.reset();
  }
  RegisterUser() {
      this.model = new User(0, '', '', '', '', '', 0, '', false);
      this.submitted = false;
  }
}
