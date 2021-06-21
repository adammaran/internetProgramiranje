import { Component, OnInit } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import * as moment from 'moment';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css']
})
export class MatchListComponent implements OnInit {
  matches = [];
  public moment;
  constructor(private matchService: MatchService) {
    this.moment = moment;
   }

  ngOnInit(): void {
    this.getMatches();
  }
  
  getMatches() {
    this.matchService.getMatches()
      .subscribe(
        res => {
          this.matches = res;
          console.log(this.matches);
        },
        err => {
          console.log(err);
        }
      );
  }

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
}
