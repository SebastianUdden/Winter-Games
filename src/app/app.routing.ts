import { Routes, RouterModule } from '@angular/router';

// Content
import { TheButtonComponent } from './the-button/the-button.component';
import { HomeComponent } from './home/home.component';
import { DiceComponent } from './dice/dice.component';

// import { LoginComponent } from './login/index';
// import { RegisterComponent } from './register/index';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'the-button', component: TheButtonComponent },
    { path: 'dice', component: DiceComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
    // { path: 'login', component: LoginComponent },
    // { path: 'register', component: RegisterComponent },
    // { path: '', redirectTo: '/messages', pathMatch: 'full' },
    // { path: 'messages', component: MessagesComponent },
    // { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
