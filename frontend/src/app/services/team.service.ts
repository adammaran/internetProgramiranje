import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamUrl = 'http://localhost:3000/teams';
  constructor(private http: HttpClient) { }

  addTeam(team) {
    return this.http.post<any>(`${this.teamUrl}/add`, team);
  }

  getTeams() {
    return this.http.get<any>(this.teamUrl);
  }

  editTeam(team) {
    return this.http.patch<any>(`${this.teamUrl}/edit`, team);
  }
  
  deleteTeam(team) {
    return this.http.delete<any>(`${this.teamUrl}/delete/${team._id}`);
  }
}
