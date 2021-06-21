import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private matchUrl = 'http://localhost:3000/match';

  constructor(private http: HttpClient) { }

  addMatch(match) {
    return this.http.post<any>(`${this.matchUrl}/add`, match);
  }

  getMatches() {
    return this.http.get<any>(this.matchUrl);
  }

  editMatch(match) {
    return this.http.patch<any>(`${this.matchUrl}/edit`, match);
  }
  
  deleteMatch(match) {
    return this.http.delete<any>(`${this.matchUrl}/delete/${match._id}`);
  }
}
