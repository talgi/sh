import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, Renderer2, Output, EventEmitter, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Observer } from "rxjs";
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { AppDataService } from '../../services/app-data.service';
import { Item, ProposalItem } from '../../view-models/Item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit, AfterViewInit {

  //@ViewChild('circle') input: ElementRef;

  //@ViewChildren('circle') circle: ElementRef;
  //allRooms: Array<Room>;
  @Output() itemToggled: EventEmitter<Item> =
  new EventEmitter<Item>();

  private dataItemsResponse;



  count = 0;
  items: Array<ProposalItem>;
  //circle: HTMLElement;


  /*numbers = [1, 5, 10];
  source = Observable.from(this.numbers);
  sourceMouseMove :any;*/

  constructor(private dataService: AppDataService, private rd: Renderer2, private http: Http) {

  }


  ngOnInit() {
    console.log("on item List onInit");

    this.dataService.getProposal().subscribe(
      dataItemsResponse => {
        this.dataItemsResponse = dataItemsResponse;
        console.log("Answer :" + dataItemsResponse);
        console.log("Answer :" + JSON.stringify(this.dataItemsResponse.furnitures));
        var style = "country";//JSON.stringify(this.dataItemsResponse.style);

        this.items = this.dataItemsResponse.furnitures.map(itemdata => 
          new ProposalItem(1, itemdata.furniture, itemdata.furniture, '')
          //asynchronous method converting the returned Observable
          //(http.get returns Observable) and setting it to the message property.
        );


        let i = 0;
        for (let entry of this.items) {

          console.log("Entry:" + entry);

        }

      });




    //this.items = this.dataService.getItems();

    /*this.sourceMouseMove = 
    Observable.fromEvent(document, "mousemove")
     .map((e: MouseEvent) => {
        return {
          x: e.clientX,
          y: e.clientY,
        }
      });*/
    //this.circle = <HTMLElement>document.getElementById("circle");


    /*this.source.subscribe(new MyObserver());
    this.source
      .map(n => n * 2)
      .filter(n => n > 4)
      .subscribe(new MyObserver());*/

    /*  */

  }

  ngAfterViewInit(): void {


    /*this._elRef = this.elRef.nativeElement.querySelector('#circle');
    console.log(this._elRef); */

    /*  this.sourceMouseMove     
       .subscribe(this.onNext,
       e => console.log(`err: ${e}`),
       () => console.log("complete"));*/
    // console.log(this.rd); 
    // console.log(this.circle.nativeElement.style);
    //console.log(this.circle.nativeElement.textContent);
    //console.log(this.circle.nativeElement.);   


  }

  //passing mouse move on picture event
  photoToggled(item) {
    console.log(`The item ${item.id} was passed to item list!`);
    this.itemToggled.emit(item);
  }

  onNext(value) {

    // console.log(this.circle);

    //if (typeof this.div != 'undefined') {
    // console.log(this.circle.nativeElement.style);  
    //this.circle.nativeElement.style.left = value.x;
    //this.circle.nativeElement.style.top = value.y;
    //}
    //console.log(`val: ${value.x},${value.y}`);
  }



}

/*export class MyObserver implements Observer<number>{

  next(value) {
    console.log(`val: ${value}`);
  }

  error(e) {
    console.log(`err: ${e}`);
  }
  complete() {
    console.log("complete");
  }

}*/
