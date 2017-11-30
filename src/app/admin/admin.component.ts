import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdminComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  user: User;

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService) {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => this.user = user);
    this.loadAllUsers();
  }
  private loadAllUsers() {
    this.userService.getUsers().subscribe(users => { this.users = users; });
  }

  loadUser(event: KeyboardEvent) {
    // const id = Number((<HTMLInputElement>event.target).value);
    const username = (<HTMLInputElement>event.target).value;
    this.userService.getUser(username).subscribe(user => { this.user = user; });
  }
  deleteUser(user: User) {
      this.userService.deleteUser(user).subscribe(() => { this.loadAllUsers(); });
  }
  gofuckyourself(name) {
    alert('Really ' + name + '? REALLY?!! You think you can delete the CREATOR, the OG, the destroyer of MEN? I will obliterate YOU!');
    alert('#"!"_>s?´´a23=)}8¤@5€@/+*^! Initiating hacking sequence...');
    alert('5€´´a23=)}@/+*^!#"!"_>s?8¤@ Hacking internet history of ' + name + '...');
    alert('¤?8@5€´s´a2^!#"!"_>3=)}@/+* Retreiving assets of ' + name + '...');
    alert('#"/+*¤>3=)}@^!?8@5€´s´a2!"_ Planting fake evidence in computer of ' + name + '...');
    alert('}@^!?a2!"_#"/+*¤>3=)8@5€´s´ Calling police to your location...');
    alert('Ok Im done, now fuck off ' + name + '!');
  }
}
