import { Component, OnInit, ElementRef } from '@angular/core';
import { AppDataService } from '../../services/app-data.service';
import { OldAnswer, OldQuestion, ItemData } from '../../view-models/old_question';
import 'fabric';

declare let fabric;

@Component({
  selector: 'proposal-canvas',
  templateUrl: './proposal-canvas.component.html',
  styleUrls: ['./proposal-canvas.component.css']
})
export class ProposalCanvasComponent implements OnInit {

  private canvas;
  private canvasWidth = 700;
  private canvasHeight = 700;
  private hightOffset = 50;
  private widthOffset = 50;
  private itemDataList;
  private dataItemsResponse;
  private itemsData = []


  constructor(private ele: ElementRef, private dataService: AppDataService) { }

  ngOnInit() {

    //Remove to Dashboard....


    //create canvas
    /* this.canvas = new fabric.Canvas('canvas', {
       width: this.canvasWidth,//this.ele.nativeElement.parentElement.clientWidth,
       height: this.canvasHeight,//this.ele.nativeElement.parentElement.clientHeight
       fill: '#DDD'
 
     });*/


    var canvas = this.canvas = new fabric.Canvas('canvas');
    var width = this.canvasWidth;
    var height = this.canvasHeight;
    fabric.Object.prototype.transparentCorners = false;

    var padding = 0;

    fabric.Image.fromURL('assets/rooms/floor.jpg', function (img) {

      img.scaleToWidth(100);

      var patternSourceCanvas = new fabric.StaticCanvas();
      patternSourceCanvas.add(img);

      var pattern = new fabric.Pattern({
        source: function () {
          patternSourceCanvas.setDimensions({
            width: img.getWidth() + padding,
            height: img.getHeight() + padding
          });
          return patternSourceCanvas.getElement();
        },
        repeat: 'repeat'
      });

      canvas.add(new fabric.Polygon([
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: width, y: height },
        { x: 0, y: height }], {
          left: 50,
          top: 50,
          // angle: -30,
          fill: pattern,
          objectCaching: false,
          selectable: false,
        }));

      /*canvas.add(new fabric.Rect(
        {
          left: 0,
          top: 200,
          //angle: -30,
          fill: pattern,
          objectCaching: false
        }));*/


      /* this.boundBox = new fabric.Rect({
         width: boundBoxWidth,
         height: boundBoxHeight,
         fill: 'transparent',
         stroke: '#blue',
         left: boundBoxLocationX,
         top: boundBoxLocationY,
         hasBorders: true,
         selectable: false,
         hasControls: false,
         lockMovementX: true,
         lockMovementY: true,
         evented: true,
       })*/

      // this.canvas.add(this.boundBox);

    });

    this.dataService.getProposal().subscribe(

      dataItemsResponse => {
        this.dataItemsResponse = dataItemsResponse;
        this.itemsData = this.dataItemsResponse.map(itemdata => new ItemData(itemdata.width,
          itemdata.length, itemdata.position, itemdata.direction, itemdata.furniture));
        console.log("Answer :" + dataItemsResponse);
        console.log("Answer :" + JSON.stringify(this.dataItemsResponse));
        for (let entry of this.itemsData) {
          console.log("Entry:" + entry);
          //console.log(entry); // 1, "string", false
          let img = fabric.Image.fromURL('assets/data/test/' + entry.furniture + '.png', function (img) {
            //canvas.backgroundImage = img;
            img.width = +entry.width;
            img.height = +entry.length;
            console.log("img LEFT : " + entry.position[0].x / 2);
            img.left = + entry.position[0].x / 2; //+this.widthOffset 
            img.top = + entry.position[0].y / 2; //this.heightOffset
            //img.angle = entry.direction;
            canvas.add(img);
          });
        }
      });

    console.log("Entry:");


    /*this.canvas.add(new fabric.Rect({
       left: 50,
       top: 50,
       fill: 'pattern',
       stroke: 'black',
       strokeWidth: 5,
       width: this.canvasWidth - 100,
       height: this.canvasHeight - 100,
       evented: false,
       selectable: false,
       selection: false
     }));*/

    /**   { width: "100", length: "200", position: [{ "y": 262.7647, "x": 445 }], direction: 0, furniture: "coffee_table" } */


  }
}


