import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MatchListComponent } from './pages/matches/match-list/match-list.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './auth.guard';
import { TeamListComponent } from './pages/teams/team-list/team-list.component';


const routes: Routes = [
  { path: '', redirectTo: '/matches', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'matches', component: MatchListComponent },
  { path: 'teams', component: TeamListComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: ErrorPageComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
