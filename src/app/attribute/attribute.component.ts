import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Attribute } from './attribute';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AttributeComponent implements OnInit {
  public user: User;
  public toggled = false;
  public attributeExists = false;
  @Input() attribute: Attribute;
  @Input() owned: Boolean;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService) {
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => this.user = user);
    for (let i = 0; i < this.user.attributes.length; i++) {
      if (this.user.attributes[i].name === this.attribute.name) {
        this.attributeExists = true;
      }
    }
  }

  buyAttribute() {
    for (let i = 0; i < this.user.attributes.length; i++) {
      if (this.user.attributes[i].name === this.attribute.name) {
        this.attributeExists = true;
      }
    }
    if (!this.attributeExists) {
      this.user.attributes.push(this.attribute);
      this.user.wallet -= this.attribute.price;
      this.userService.updateUser(this.user);
      this.authenticationService.changeUser(this.user);
      sessionStorage.removeItem('currentUser');
      sessionStorage.setItem('currentUser', JSON.stringify(this.user));
    } else {
      alert('You already own this attribute!');
    }
  }
}
