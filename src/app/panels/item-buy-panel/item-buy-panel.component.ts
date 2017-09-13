import { Component, Input, OnInit, OnChanges, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable, Observer } from "rxjs";
import { Item } from '../../view-models/Item';

@Component({
  selector: 'app-item-panel',
  templateUrl: './item-buy-panel.component.html',
  styleUrls: ['./item-buy-panel.component.css']
})
export class ItemBuyPanelComponent implements OnInit {

  @Input() item: Item;
  @Input() index = 1;
  @Output() photoToggled: EventEmitter<Item> =
  new EventEmitter<Item>();


  constructor(private elRef: ElementRef) { }

  move(ref: ElementRef) {
    console.log(this.elRef.nativeElement.offsetLeft);
    console.log(this.elRef.nativeElement.offsetTop);
    //var popup = document.getElementById("myPopup");
    //popup.classList.toggle("show");
    //popup.style.top=this.elRef.nativeElement.offsetTop+'px';
    //popup.style.left=this.elRef.nativeElement.offsetLeft+'px';

    console.log('item buy panel - Passing hover item')
    this.photoToggled.emit(this.item);
  }

  ngOnInit() {
  }

  showInfo() {
    console.log("toggle");
    console.log(this);
    console.log(this.index);

  }
}

