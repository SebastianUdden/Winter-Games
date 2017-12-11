import { Routes, RouterModule } from '@angular/router';

// Content
import { TheButtonComponent } from './the-button/the-button.component';
import { HomeComponent } from './home/home.component';
import { PowerBarComponent } from './power-bar/power-bar.component';

import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { DatabaseComponent } from './database/database.component';

import { AuthGuard } from './authentication/_guards/auth.guard';

const APP_ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'the-button', component: TheButtonComponent  },
    { path: 'admin', component: AdminComponent  },
    { path: 'profile', component: ProfileComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'database', component: DatabaseComponent  },
    // otherwise redirect to home
    { path: '**', redirectTo: ''  }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
