import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AppDataService } from '../../services/app-data.service';
import { trigger, state, style, transition, animate, keyframes, Input } from '@angular/core';

@Component({
  selector: 'room-canvas-dashboard',
  templateUrl: './room-canvas-dashboard.component.html',
  styleUrls: ['./room-canvas-dashboard.component.css'],
  animations: [
    trigger(/*'focusButton'*/'focusPanel', [
      state('inactive-start', style({
        background: '#3fb5b7',
        border: '1px solid #ffffff',
        color:'#ffffff'
        //transform: 'scale(1)'
      })),
      state('active-start', style({
        
        //transform: 'scale(1.12)',
        //opacity: 0.7,
       background: '#ffffff',
       border: '1px solid #3fb5b7',
       color:'#3fb5b7'
       
         
      })),
      transition('inactive-start => active-start', animate('400ms ease-in')),
      transition('active-start => inactive-start', animate('400ms ease-out'))
    ])
  ]
})
export class RoomCanvasDashboardComponent implements OnInit {

   state: string = 'inactive-start';
  constructor(private router: Router,private dataService: AppDataService) { }


  ngOnInit() {
  }

  toggleFocus() {
    this.state = (this.state === 'inactive-start' ? 'active-start' : 'inactive-start');
  }

  toggle() {
    this.state = (this.state === 'inactive-start' ? 'active-start' : 'inactive-start');
  }

  onClick() {   
    this.router.navigate(['/authenticated/proposal']);

    /*console.log("itemID:" + room.id);
    console.log("isFirst:" + this.isFirst);
    var roomId = room.id;
    if (this.isFirst == true) {
     roomId = 0;
    }

     console.log("RoomId:" +  roomId);
    this.dataService.getOldQuestion(roomId).subscribe(

      oldQuestion => {
        this.oldQuestion = oldQuestion;
       
        //else{
        this.itemClickedE.emit(this.oldQuestion);
        this.rooms = this.oldQuestion.choices.map(c => new MyRoom(c.num, c.ans.pic));
        this.isFirst = false;
        console.log("Answer :" + oldQuestion);
        console.log("Answer :" + JSON.stringify(this.oldQuestion));
        console.log("Answer Done?:" + JSON.stringify(this.oldQuestion.done));

        if (JSON.stringify(this.oldQuestion.done) === "true") {
          console.log("Answer inside if :" + oldQuestion);
          this.router.navigate(['/authenticated/canvas']);
        }
      });

    //let rooms : Array<Room> = [];

  }
    //send request*/


  }


}
