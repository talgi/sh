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
  private canvasWidth = 800;
  private canvasHeight = 800;
  private hightOffset = 0;//50;
  private widthOffset = 0;//50;
  private itemDataList;
  private dataItemsResponse;
  private itemsData = []
  private angle = 0;


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
      let fbp = new fabric.Polygon([
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: width, y: height },
        { x: 0, y: height }], {
          left: 0,//50,
          top: 0,//50,
          // angle: -30,
          fill: pattern,
          objectCaching: false,
          selectable: false,
        });
      canvas.add(fbp);
      canvas.sendToBack(fbp);










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


    /*let coords = [];
    for (let coord of this.dataService.coordinates) {
      coords.push({ 'x': coord.x / 2, 'y': coord.y / 2 });
    }*/
    let coords = [];
    for (let coord of this.dataService.coordinates) {
      coords.push({ 'x': coord.x, 'y': coord.y });
    }

    let roomWals = new fabric.Polygon(coords
      , {
        // left: coords[2].x,//50,
        // top: coords[2].y,//50,
        // angle: -30,
        stroke: 'red',
        strokeWidth: 4,
        fill: 'rgba(30,0,30,0)',
        objectCaching: false,
        selectable: false,


      });
    //canvas.add(roomWals);
    //canvas.sendToBack(roomWals);

    var group = new fabric.Group();

    // canvas.add(roomWals);
    group.addWithUpdate(roomWals);
      // group.set('flipY', true);
    canvas.add(group);



    this.dataService.getProposal().subscribe(
      dataItemsResponse => {
        this.dataItemsResponse = dataItemsResponse;
        console.log("Answer :" + dataItemsResponse);
        console.log("Answer :" + JSON.stringify(this.dataItemsResponse.furnitures));
        var style = "country";//JSON.stringify(this.dataItemsResponse.style);

        this.itemsData = this.dataItemsResponse.furnitures.map(itemdata => new ItemData(itemdata.width,
          itemdata.length, itemdata.position, itemdata.direction, itemdata.furniture));

        let i = 0;
        for (let entry of this.itemsData) {

          console.log("Entry:" + entry);
          console.log(entry.position[0]); // 1, "string", false

          let num: Number;
          num = (entry.direction + 180) % 360;//entry.direction;

          fabric.Image.fromURL('assets/data2/cad/' + entry.furniture + '.png', function (img) {
            //canvas.backgroundImage = img;.
            //if (entry.furniture == "armchair") {
            console.log("Furniture : " + entry.furniture);
            console.log("img X : " + (+ entry.position[0]));
            console.log("img Y : " + (+ entry.position[1]));
            console.log("Direction : " + (entry.direction + 180) % 360);

            /*img.width = +entry.length / 2;
            img.height = +entry.width / 2;
            img.left = ((+ entry.position[0] / 2)); //+this.widthOffset 
            img.top = (+ entry.position[1] / 2); //this.heightOffset
            img.centeredRotation = true;
            img.originX = 'center'
            img.originY = 'center'*/

            img.width = +entry.length;
            img.height = +entry.width;
            img.left = (+ entry.position[0]); //+this.widthOffset 
            img.top = (+ entry.position[1]); //this.heightOffset
            img.centeredRotation = true;
            img.originX = 'center'
            img.originY = 'center'
  

            img.setAngle((entry.direction + 180) % 360);

            group.addWithUpdate(img);
            i++;

            if (i == 8) {

               // group.set('flipY', true);
               // group.set('flipY', false);

              //group.originX = 'center'
              //group.originY = 'center'
              //group.left = 400;
              //group.top = 350;


              group.set({ scaleX: 0.5, scaleY: 0.5 });
              group.originX = 'center'
              group.originY = 'center'
              group.left = 400;
              group.top = 350;
            }

            //canvas.add(img);
            /*let x = (+ entry.position[0] / 2) - 100;
            let y = (+ entry.position[1] / 2) - 100;
            let width = +entry.width / 2;
            let height = +entry.length / 2;*/

            //img.set({ left: x, top: y,originX:'center',originY:'center', width: height, length: width, centeredRotation: true });

            //entry.direction;
            /*
            var oImg =
            oImg.setAngle(num).setCoords();
            canvas.add(oImg);*/

            //canvas.add(img);
            canvas.renderAll();

            // }
          });
        }

        canvas.renderAll();
        //canvas.add(new fabric.Group(images));

      });




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


