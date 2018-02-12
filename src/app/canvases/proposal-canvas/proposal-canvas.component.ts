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


    let coords = [];
    let min = { x: 800, y: 800 };
    let max = { x: 0, y: 0};
    for (let coord of this.dataService.coordinates) {
      coords.push({ 'x': coord.x, 'y': coord.y });
      min = { x: Math.min(min.x, coord.x), y: Math.min(min.y, coord.y)};
      max = { x: Math.max(max.x, coord.x), y: Math.max(max.y, coord.y)};
    }
    coords = coords.map((c) => {return {x: c.x - min.x, y: c.y - min.y };});
    var width = max.x - min.x;
    var height = max.y - min.y;
    var scaleX = 450 / width;
    var scaleY = 600 /height
    var scale = Math.min(scaleX, scaleY);

    let roomWals = new fabric.Polygon(coords
      , {
        stroke: 'red',
        strokeWidth: 4,
        fill: 'rgba(30,0,30,0)',
        objectCaching: false,
        selectable: false,


      });

    var group = new fabric.Group();
    group.addWithUpdate(roomWals);

    this.dataService.getProposal().subscribe(
      dataItemsResponse => {
        this.dataItemsResponse = dataItemsResponse;
        var style = "country";//JSON.stringify(this.dataItemsResponse.style);

        this.itemsData = this.dataItemsResponse.furnitures.map(itemdata => new ItemData(itemdata.width,
          itemdata.length, itemdata.position, itemdata.direction, itemdata.furniture));

        let i = 0;
        const count = this.itemsData.length;
        this.itemsData.forEach((entry, idx) => {
          let num: Number;
          num = (entry.direction + 180) % 360;
          console.log(entry.position);
          fabric.Image.fromURL('assets/data2/cad/' + entry.furniture + '.jpg', img => {
            img.width = +entry.length;
            img.height = +entry.width;
            img.left = (+ entry.position[0]) - min.x;
            img.top = (+ entry.position[1]) - min.y;
            img.centeredRotation = true;
            img.originX = 'left'
            img.originY = 'top'

            img.setAngle((entry.direction + 180) % 360);
            group.addWithUpdate(img);
            if (idx === (count - 1)) {
              this.addAndScaleGroup(group, scale);
            }
          });
        });
      });

  }
  addAndScaleGroup(group, scale) {
    group.scale(scale);
    group.originX = 'left'
    group.originY = 'top'
    group.left = 0;
    group.top = 0;
    this.canvas.add(group);
    this.canvas.renderAll();
  }
}


