import { Component, OnInit } from '@angular/core';

import { Question } from '../../view-models/Question';
import { OldAnswer, OldQuestion } from '../../view-models/old_question';

@Component({
  selector: 'rooms-dashboard',
  templateUrl: './rooms-dashboard.component.html',
  styleUrls: ['./rooms-dashboard.component.css']
})
export class RoomsDashboardComponent implements OnInit {


 header1:string = "Room Selection";
 header2:string="Which room would you like to start with?";

  constructor() { }

  ngOnInit() {
  }


  itemClickedE(oldQuestion: OldQuestion) {
      this.header2 = oldQuestion.header;
      console.log("header="+  this.header2);
  }

}
