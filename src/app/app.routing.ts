import { Routes, RouterModule } from '@angular/router';

// Content
import { TheButtonComponent } from './the-button/the-button.component';
import { HomeComponent } from './home/home.component';
import { DiceComponent } from './dice/dice.component';
import { PowerBarComponent } from './power-bar/power-bar.component';

import { UserHomeComponent } from './authentication/home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';

// import { LoginComponent } from './login/index';
// import { RegisterComponent } from './register/index';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'the-button', component: TheButtonComponent },
    { path: 'home', component: UserHomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    // { path: '', redirectTo: '/messages', pathMatch: 'full' },
    // { path: 'messages', component: MessagesComponent },
    // { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
