import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:3000/users/current';

  constructor(private http: HttpClient) { }

  updateUser(updates) {
    return this.http.patch<any>(this.userUrl, updates);
  }

  deleteUser(user) {
    return this.http.delete<any>(this.userUrl, user);
  }
}
