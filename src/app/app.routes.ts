import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {RegisterComponent} from './pages/register/register.component';
import {LoginComponent} from './pages/login/login.component';
import {ProfilComponent} from './pages/profil/profil.component';
import {authGuard} from './guards/auth.guard';
import {VideoComponent} from './pages/video/video.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'videos/:id', component: VideoComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfilComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];
