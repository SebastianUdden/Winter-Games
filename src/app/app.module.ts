import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './app.routing';

import { AppComponent } from './app.component';
import { DatabaseComponent } from './database/database.component';
import { HomeComponent } from './home/home.component';
import { LightSwitchComponent } from './light-switch/light-switch.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TheButtonComponent } from './the-button/the-button.component';
import { UsersComponent } from './users/users.component';

import { AdminComponent } from './admin/admin.component';
import { AlertService } from './_services/alert.service';
import { AlertComponent } from './authentication/alert/alert.component';
import { AuthenticationService } from './_services/authentication.service';
import { LoginComponent } from './authentication/login/login.component';
import { PowerBarComponent } from './power-bar/power-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { UpdateService } from './_services/update.service';
import { UserService } from './_services/user.service';

// Guards
import { AuthGuard } from './authentication/_guards/auth.guard';

// Pipes
import { EscapeHtmlPipe } from './_pipes/keep-html.pipe';
import { TheDuelComponent } from './the-duel/the-duel.component';
import { AttributeComponent } from './attribute/attribute.component';

@NgModule({
  declarations: [
    AdminComponent,
    AlertComponent,
    AppComponent,
    DatabaseComponent,
    HomeComponent,
    LightSwitchComponent,
    LoginComponent,
    NavbarComponent,
    PowerBarComponent,
    ProfileComponent,
    SignupComponent,
    TheButtonComponent,
    UsersComponent,

    // Pipes
    EscapeHtmlPipe,

    TheDuelComponent,

    AttributeComponent,
  ],
  imports: [
    HttpModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    routing
  ],
  providers: [
    AlertService,
    AuthenticationService,
    UpdateService,
    UserService,
    AuthGuard
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
