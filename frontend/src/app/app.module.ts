import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FormsModule } from '@angular/forms';
import { MatchListComponent } from './pages/matches/match-list/match-list.component';
import { AddMatchComponent } from './pages/matches/add-match/add-match.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './auth.guard';
import { MatchService } from './services/match.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AddTeamComponent } from './pages/teams/add-team/add-team.component';
import { TeamListComponent } from './pages/teams/team-list/team-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    ErrorPageComponent,
    MatchListComponent,
    AddMatchComponent,
    AddTeamComponent,
    TeamListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ AuthService, AuthGuard, MatchService, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
