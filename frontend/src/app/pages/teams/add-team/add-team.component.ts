import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  team = {
    name: ''
  };

  @Output() newTeam = new EventEmitter<void>();

  callParent() {
    this.newTeam.next();
  }
  
  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
  }

  addTeam(team) {
    this.teamService.addTeam(team)
      .subscribe(
        res => {
          this.callParent();
          this.team.name = '';
        },
        err => {
          console.log(err);
          alert(err.error);
          this.team.name = '';
        }
      );
  }

}
