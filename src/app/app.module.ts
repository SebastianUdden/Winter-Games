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
import { UsersComponent } from './users/users.component';

import { UpdateService } from './_services/update.service';
import { UserService } from './_services/user.service';
import { AlertService } from './_services/alert.service';
import { AuthenticationService } from './_services/authentication.service';
import { DiceComponent } from './dice/dice.component';
import { PowerBarComponent } from './power-bar/power-bar.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AlertComponent } from './authentication/alert/alert.component';
import { ProfileComponent } from './profile/profile.component';
import { TheMazeComponent } from './the-maze/the-maze.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TheButtonComponent,
    DatabaseComponent,
    LightSwitchComponent,
    DatabaseComponent,
    UsersComponent,
    DiceComponent,
    PowerBarComponent,
    SignupComponent,
    LoginComponent,
    AdminComponent,
    AlertComponent,
    ProfileComponent,
    TheMazeComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    routing
  ],
  providers: [UpdateService, UserService, AlertService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
