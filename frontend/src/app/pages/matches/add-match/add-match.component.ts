import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatchService } from 'src/app/services/match.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-match',
  templateUrl: './add-match.component.html',
  styleUrls: ['./add-match.component.css']
})
export class AddMatchComponent implements OnInit {
  teams = [];
  hostTeam = '';
  guestTeam = '';
  hostPoints = 0;
  guestPoints = 0;
  time = '';


  @Output() newMatch = new EventEmitter<void>();

  callParent() {
    this.newMatch.next();
  }

  constructor(private teamService: TeamService, private matchService: MatchService) { }

  ngOnInit(): void {
    this.getTeams();
  }

  selectHome(team) {
    this.hostTeam = team;
  }

  selectGuest(team) {
    this.guestTeam = team;
  }

  clearForm() {
    this.hostTeam = '';
    this.guestTeam = '';
    this.hostPoints = 0;
    this.guestPoints = 0;
    this.time = '';
  }

  addMatch() {
    if (this.hostTeam.toLowerCase() === this.guestTeam.toLowerCase())
      return alert('Tim ne moze igrati protiv sebe');
      
    const match = {
      host: this.hostTeam,
      guest: this.guestTeam,
      hostPoints: this.hostPoints,
      guestPoints: this.guestPoints,
      time: this.time
    }

    this.matchService.addMatch(match)
      .subscribe(
        res => {
          this.callParent();
          this.clearForm();
        },
        err => {
          console.log(err);
        }
    );
  }

  getTeams() {
    this.teamService.getTeams()
      .subscribe(
        res => {
          this.teams = res;
        },
        err => {
          console.log(err);
        }
    );
  }

}
