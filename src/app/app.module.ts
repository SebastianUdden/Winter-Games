import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TheButtonComponent } from './the-button/the-button.component';
import { DatabaseComponent } from './database/database.component';
import { LightSwitchComponent } from './light-switch/light-switch.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersComponent } from './users/users.component';

import { UpdateService } from './_services/update.service';
import { UserService } from './_services/user.service';
import { DiceComponent } from './dice/dice.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TheButtonComponent,
    DatabaseComponent,
    LightSwitchComponent,
    UserFormComponent,
    DatabaseComponent,
    UsersComponent,
    DiceComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    routing
  ],
  providers: [UpdateService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
