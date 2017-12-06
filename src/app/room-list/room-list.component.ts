import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AppDataService } from '../services/app-data.service';

import { Room } from '../view-models/Room';
import { MyRoom } from '../view-models/my-room';
import { Question } from '../view-models/Question';
import { OldAnswer, OldQuestion } from '../view-models/old_question';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  allRooms: Array<Room>;
  allAnswers: Array<Question>;
  count = 0;
  rooms: Array<Room>;
  question: Question;
  oldQuestion: OldQuestion;
  isFirst = true;
  isDone = false;

  @Output() itemClickedE: EventEmitter<OldQuestion> =
  new EventEmitter<OldQuestion>();

  constructor(private dataService: AppDataService,
    private arouter: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    console.log("on room List")


    this.rooms = this.dataService.getRooms();
    //.Net Server
    /* this.dataService.getQuestion(1).subscribe(
       question => {
         this.question = question;
         console.log("Answer :" + JSON.stringify(question));
         // this.count = this.route.snapshot.params['count'];
       }
     );*/





    /*console.log(answer);*/

    /*    console.log( this.rooms[0]);*/

    /* this.dataService.getCountries().subscribe(
       countries => {
         this.allCountries = countries;

         this.count = this.route.snapshot.params['count'];
         this.updateList();
       }
     );

     this.route.params.subscribe(params => {
       this.count = params['count'];
       this.updateList();
      });*/
  }
  onClick() {
    console.log("onClick()");

    //Python Server
    /*this.dataService.getOldQuestion(1).subscribe(
      oldQuestion => {
        this.oldQuestion = oldQuestion;
        console.log("Answer :" + oldQuestion);
        console.log("Answer :" + JSON.stringify(this.oldQuestion));
        console.log("Answer Done?:" + this.oldQuestion.done);

        // this.count = this.route.snapshot.params['count'];
      }
    );

    this.rooms.pop();

    //    this.router.navigate(['/authenticated/rooms']);*/
  }
  updateList() {
    /*   this.rooms = this.count > 0 ? this.allRooms.slice(0, this.count) : this.allRooms;*/
  }

  itemClicked(room) {
    console.log("itemID:" + room.id);
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
        this.rooms = this.oldQuestion.choices.map(c => new MyRoom(c.num, 'assets/data2/'+c.ans.pic));
        this.isFirst = false;
        console.log("Answer :" + oldQuestion);
        console.log("Answer :" + JSON.stringify(this.oldQuestion));
        console.log("Answer Done?:" + JSON.stringify(this.oldQuestion.done));

        if (JSON.stringify(this.oldQuestion.done) === "\"true\"") {
          console.log("Answer inside if :" + oldQuestion);
          this.router.navigate(['/authenticated/canvas']);
        }
      });

    //let rooms : Array<Room> = [];

  }
}

