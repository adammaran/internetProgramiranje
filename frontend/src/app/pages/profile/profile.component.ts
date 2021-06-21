import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedUser = JSON.parse(localStorage.getItem('user'));

  constructor(private user: UserService,
              private router: Router) { }

  ngOnInit() {
  }

  updateUser() {
    this.user.updateUser(this.loggedUser)
      .subscribe(
        res => {
          localStorage.removeItem('user');
          localStorage.setItem('user', JSON.stringify(res));
          alert("Uspešno sačuvane izmene!");
        },
        err => {
          console.log(err);
        }
      );
  }

  deleteUser() {
    this.user.deleteUser(this.loggedUser)
      .subscribe(
        res => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          alert("Uspešno obrisan profil!");
          this.router.navigate(['/login']);
        },
        err => {
          console.log(err);
        }
      );
  }

}
