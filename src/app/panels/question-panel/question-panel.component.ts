
import { Component, Input,Output, OnInit,EventEmitter } from '@angular/core';

import { Room } from '../../view-models/room';

@Component({
  selector: 'question-panel',
  templateUrl: './question-panel.component.html',
  styleUrls: ['./question-panel.component.css']
})
export class QuestionPanelComponent implements OnInit {

  @Input() room: Room;
  @Input() index = 1;

  @Output() itemClicked: EventEmitter<Room> =
  new EventEmitter<Room>();
 
  isFirst=true;


  constructor() { }

  ngOnInit() {
  }

  onClick() {
    console.log("onClick()");
  
    this.itemClicked.emit(this.room);
    this.isFirst=false;

  }
}
