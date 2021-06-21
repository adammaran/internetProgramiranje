import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  teams = [];

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.getTeams();
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

  editTeam(team) {
    this.teamService.editTeam(team)
      .subscribe(
        res => {
          this.getTeams();
          alert('Uspesno izmenjeni podaci');
        },
        err => {
          console.log(err);
          alert(err.error);
        }
      );
  }

  deleteTeam(team) {
    this.teamService.deleteTeam(team)
      .subscribe(
        res => {
          this.getTeams();
          alert('Uspesno obrisan tim');
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
