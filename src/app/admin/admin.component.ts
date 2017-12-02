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
  public choice = false;
  public evil = false;
  public deleteButton = false;
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => this.user = user);
    this.loadAllUsers();
  }
  private loadAllUsers() {
    this.userService.getUsers().subscribe(users => { this.users = users; });
  }
  goStraightEvil(evil) {
    if (evil === undefined) {
      this.choice = false;
      this.evil = undefined;
    } else {
      this.deleteButton = false;
      this.choice = true;
      this.evil = evil;
    }
  }
  editScore(user, multiplier) {
    this.deleteButton = false;
    user.score *= multiplier;
    this.userService.updateUser(user);
  }
  promote(user) {
    this.deleteButton = false;
    user.admin = true;
    this.userService.updateUser(user);
  }
  demote(user) {
    this.deleteButton = false;
    user.admin = false;
    this.userService.updateUser(user);
  }
  loadUser(event: KeyboardEvent) {
    // const id = Number((<HTMLInputElement>event.target).value);
    const username = (<HTMLInputElement>event.target).value;
    this.userService.getUser(username).subscribe(user => { this.user = user; });
  }
  beforeDeleteUser() {
    if (confirm('Do you want to delete the user? This was probably just a missclick, just push no and be on your way!')) {
      this.deleteButton = true;
    } else {
      this.deleteButton = false;
    }
  }
  deleteUser(user: User) {
    if (confirm('Are you sure you want to delete user from database, this is permanent and will probably really piss them off!')) {
      this.userService.deleteUser(user).subscribe(() => { this.loadAllUsers(); });
    }
    this.deleteButton = false;
  }
  gofuckyourself(name) {
    this.deleteButton = false;
    if (confirm('Really ' + name + '? REALLY?!!')) {
      alert('You really thought you could delete the CREATOR, the OG, the destroyer of MEN? I will obliterate YOU!');
      alert('#"!"_>s?´´a23=)}8¤@5€@/+*^! Initiating hacking sequence...');
      alert('5€´´a23=)}@/+*^!#"!"_>s?8¤@ Hacking internet history of ' + name + '...');
      alert('¤?8@5€´s´a2^!#"!"_>3=)}@/+* Retreiving assets of ' + name + '...');
      alert('#"/+*¤>3=)}@^!?8@5€´s´a2!"_ Planting fake evidence in computer of ' + name + '...');
      alert('}@^!?a2!"_#"/+*¤>3=)8@5€´s´ Calling police to your location...');
      alert('Ok Im done, now fuck off ' + name + '!');
    }
  }
}
