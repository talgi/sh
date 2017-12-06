import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, ElementRef, Renderer2 } from '@angular/core';
import { AppDataService } from '../../services/app-data.service';
import { OldAnswer, OldQuestion, ItemData } from '../../view-models/old_question';

import { Item } from '../../view-models/Item';
@Component({
  selector: 'proposal-dashboard',
  templateUrl: './proposal-dashboard.component.html',
  styleUrls: ['./proposal-dashboard.component.css']
})
export class ProposalDashboardComponent implements OnInit {

  @ViewChild('circle') circle;
  @ViewChild('popup') popup;

  private event: MouseEvent;
  clientX = '50px';
  clientY = '100px';
  _elRef: ElementRef;
  targetClass: string;
  targetProp: string;
  item: Item;

  constructor(private dataService: AppDataService, private elRef: ElementRef) { }

  ngOnInit() {
    this.targetClass = 'next';
    this.targetProp = 'yellow';
    this.item = {'id':1,'name':'name','catalogName':'catalogName','description':'description'}

    let itemDataList = this.dataService.getItemsData();
    console.log("First Item" + itemDataList[0].width);
    for (let entry of itemDataList) {
      

      console.log(entry.furniture); // 1, "string", false
    }
  }

  ngAfterViewInit(): void {
    // this._elRef = this.elRef.nativeElement.querySelector('#circle');
    this._elRef = this.elRef.nativeElement.querySelector('#popup');
    this.targetClass = 'popup';
  }

  private onEvent(event: MouseEvent): void {
    this.event = event;

  }

  //Set pop up cordinats!
  private coordinates(event: MouseEvent): void {
    this.clientX = event.clientX  + 'px';
    this.clientY = event.clientY + 300 + 'px';
    //console.log( this.clientX);
    //console.log( this.clientY);

    //this._elRef.nativeElement.style.left = this.clientX;
    // this._elRef.nativeElement.style.top =  this.clientY ;

  }

  /*toggleProp() {
    //console.log(this.targetProp);
    if (this.targetProp == 'yellow') {
      return 'red';
    }
    else {
      return 'yellow';
    }
  }
  toggleClass() {
    //console.log(this.targetClass);
    if (this.targetClass == 'next') {
      return 'current';
    }
    else {
      return 'next';
    }
  }*/

  //Get Data Item Data From Child
  itemToggled(item) {

    console.log("proposal dashboard got toggled item " + item.id);
    this.item = item;

    var popup = document.getElementById("myPopup");

    popup.classList.toggle("show");

  }

  hideInfo() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");

  }


}
