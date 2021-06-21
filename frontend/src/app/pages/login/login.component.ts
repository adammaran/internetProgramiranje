import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUserData = {
    email: '',
    password: ''
  };

  invalidCredentials = '';
  credentialsError = '';

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/matches']);
        },
        err => {
          this.validateUser(err);
        }
      );
  }

  validateUser(err) {
    this.invalidCredentials = '';
    this.credentialsError = '';

    if (err.error) {
      this.invalidCredentials = 'is-invalid';
      this.credentialsError = 'Invalid email or password.';
    }
  }

}
