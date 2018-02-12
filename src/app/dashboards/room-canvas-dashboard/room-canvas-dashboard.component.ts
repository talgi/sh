import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AppDataService } from '../../services/app-data.service';
import { trigger, state, style, transition, animate, keyframes, Input } from '@angular/core';

@Component({
  selector: 'room-canvas-dashboard',
  templateUrl: './room-canvas-dashboard.component.html',
  styleUrls: ['./room-canvas-dashboard.component.css'],
})
export class RoomCanvasDashboardComponent implements OnInit {

   state: string = 'inactive-start';
  constructor(private router: Router,private dataService: AppDataService) { }


  ngOnInit() {
  }

  canSubmit() {
    return this.dataService.getCoordinates().length > 0;
  }

  clearBoard() {
    this.dataService.resetLayout();
  }
  submitLayout() {
    if (this.canSubmit()) {
      this.dataService.getProposal().subscribe(() => {this.router.navigate(['/proposal']);});
    }
  }
}
