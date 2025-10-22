import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProjectsManagementComponent } from './pages/projects-management/projects-management.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

export const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'inicio', component: IndexComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'projects-management', component: ProjectsManagementComponent },
  { path: '**', redirectTo: '' }
];