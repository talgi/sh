import { Component, OnInit, ElementRef } from '@angular/core';
import { Point } from '../../view-models/old_question'
import { AppDataService } from '../../services/app-data.service';
import 'fabric';

declare let fabric;

@Component({
  selector: 'room-canvas',
  templateUrl: './room-canvas.component.html',
  styleUrls: ['./room-canvas.component.css']
})

export class RoomCanvasComponent implements OnInit {
  private canvas;
  private shape;
  private boundBox;
  private context;
  private lines = [];
  //private linesY = [];
  private points = [];
  private normalizedPoints = [];
  private circles = [];
  private sizes = [];

  private isDrawingMode = true;

  //private circles = [];
  //private circleLines = [];
  private currLine;
  private currText;
  private currCircle;
  //private firstCircle;

  //booleans:
  private isCreateLine = false;



  private isNodeSelected = false;



  constructor(private ele: ElementRef, private dataService: AppDataService) { }

  ngOnInit() {

    this.setCanvas();
   
    /************************************************************/


    //mouse events:

    this.canvas.on({
      'mouse:up': (options) => {

      }
    });

    this.canvas.on({
      'mouse:move': (options) => {

        if (this.isCreateLine == true && this.isDrawingMode == true) {
          console.log("on mouse move");
          var pointer = this.canvas.getPointer(options.e);

          //this.currLine.set({ x2: pointer.x - 6, y2: pointer.y - 6 });
          this.currLine.setLine(this.currLine, pointer);
          this.currLine.setText(this.currText, this.currLine);
          //this.currText.set({ left: pointer.x - 6, top: pointer.y - 6 });
          this.canvas.renderAll(); //}
          //console.log(options.e);
        }
        // this.canvas.renderAll();
      }
    });

    this.canvas.on({
      'mouse:down': (options) => {
        if (options.target && options.target.type != 'circle' && this.isDrawingMode == true) {
          console.log("on mouse down");


          this.isCreateLine = true;
          let pointer = this.canvas.getPointer(options.e);
          let points = [pointer.x, pointer.y, pointer.x, pointer.y];

          if (this.circles.length == 0) {
            console.log('length = 0');

            this.currText = this.makeText();
            this.currLine = this.makeLine(points, this.currText);

            var line1 = null;
            var line2 = this.currLine;

            this.currCircle = this.makeCircle(
              this.currLine.get('x1') - 4,
              this.currLine.get('y1') - 4,
              line1, line2);
          }
          else {
            console.log('length%2 != 0');
            let pointer = this.canvas.getPointer(options.e);
            let points = [this.currLine.get('x2'), this.currLine.get('y2'), pointer.x, pointer.y];

            //this.currLine.set({ x2: pointer.x, y2: pointer.y });
            this.currLine.setLine(this.currLine, pointer);

            this.currText = this.makeText();
            line1 = this.currLine;
            line2 = this.makeLine(points, this.currText);


            this.currCircle = this.makeCircle(this.currLine.get('x2') - 4,
              this.currLine.get('y2') - 4,
              line1, line2);

            this.currLine = line2;

          }


          this.canvas.add(this.currText);
          this.canvas.add(this.currLine);
          this.lines.push(this.currLine);
          this.canvas.sendToBack(this.currLine);
          this.canvas.add(this.currCircle);
          this.canvas.bringForward(this.currCircle);
          //this.canvas.sendToBack(this.currLine);
          this.circles.push(this.currCircle);
          //console.log(this.circles[0].get('left'));
          //console.log(options.target.type);
          //console.log(options.e.clientX + ',' + options.e.clientY);
        }
        else {

          if (
            options.target
            && options.target.get('left') == this.circles[0].get('left')
            && options.target.get('top') == this.circles[0].get('top')
            && this.circles.length >= 3
            && this.isDrawingMode == true) {

            //let pointer = this.canvas.getPointer(options.e);
            //let points = [pointer.x, pointer.y, pointer.x, pointer.y];
            this.circles[0].line1 = this.currLine;
            let firstLine = this.circles[0].line2;
            if( firstLine.get('x2') !=  firstLine.get('x1'))
            {
              firstLine.set({x1:this.circles[0].line1.get('x2')}); 
              this.circles[0].left = firstLine.get('x1')-4;
            }
            //this.circles[0].line2.set({x1:this.currLine.get('x2')});
            //this.circles[0].line2.set({y1:this.currLine.get('y2')});
            this.isCreateLine = false;
            this.isDrawingMode = false;
            this.setCoordinants();

            //console.log("Circles length:" + this.circles.length);
            //console.log("Circles[0] left:" + this.circles[0].get('left'));
            //console.log("options.target left:" + options.target.get('left'));

            //this.isDrawingMode=true;

          }
        }
      }
    });

    this.canvas.on('mouse:over', function (e) {
      // e.target.setFill('red');
    });
  }



  setCoordinants() {
    for (let l of this.lines) {
      let point = new Point();
      point.x = l.get('x1') * 2;
      point.y = l.get('y1') * 2;
      this.points.push(point);
    }

    this.dataService.coordinates = this.points;
  }


  setLine(line, pointer) {
    console.log("on set line ");
    var tDeltaX = Math.abs(pointer.x - 4 - line.get('x1'));
    var tDeltaY = Math.abs(pointer.y - 4 - line.get('y1'));
    if (tDeltaX > tDeltaY) {
      line.set({ x2: pointer.x - 4, y2: line.get('y1') });
    }
    else {
      line.set({ y2: pointer.y - 4, x2: line.get('x1') });
    }
    let angle = tDeltaY / tDeltaX;

    console.log('tDeltaX:' + tDeltaX + ' tDeltaY:' + tDeltaY + ' angle:' + angle);
  }

  setText(text, line) {
    console.log('setText');
    let l1x1 = line.get('x1');
    let l1y1 = line.get('y1');
    let l1x2 = line.get('x2');
    let l1y2 = line.get('y2');

    let txpos = (l1x1 + l1x2) / 2;
    let typos = (l1y1 + l1y2) / 2;

    var tDeltaX = l1x2 - l1x1;
    var tDeltaY = l1y2 - l1y1;
    let length = Math.sqrt(tDeltaX * tDeltaX + tDeltaY * tDeltaY).toFixed(2).toString();

    text.set({ 'left': txpos + 20, 'top': typos + 20, 'text': length });
  }

  makeText() {
    return new fabric.Text('0m', {
      left: 0,
      top: 0,
      fontSize: 15,
      originX: 'center',
      originY: 'center',
      selectable: false,
      hasControls: false,
    });
  }

  makeLine(coords, text) {
    var l = new fabric.Line(coords, {
      fill: 'red',
      stroke: 'red',
      strokeWidth: 5,
      selectable: false,
      hasBorders: false,
      hasControls: false,
    });

    l.text = text;
    l.text.left = coords[0];
    l.text.top = coords[1];
    l.setLine = this.setLine;
    l.setText = this.setText;


    return l;
  }

  makeCircle(left, top, line1, line2) {
    var c = new fabric.Circle({
      left: left,
      top: top,
      strokeWidth: 5,
      radius: 6,
      fill: '#fff',
      stroke: '#666',
      selectable: false
    });
    c.hasControls = c.hasBorders = false;

    c.line1 = line1;
    c.line2 = line2;
    //c.text1 = text1;
    //c.text2=c.text2;
    return c;
  }

setCanvas(){
   var width = 800;
   var height = 600;
   let color = '#969696';
    //create canvas
    this.canvas = new fabric.Canvas('canvas', {
      width: width,//this.ele.nativeElement.parentElement.clientWidth,
      height: height,//this.ele.nativeElement.parentElement.clientHeight
      fill: '#aaa',
  });


    var grid = 25;//size of snaps
    var measurementThickness = 60

    this.canvas.add(new fabric.Rect({
      left: 0,
      top: 0,
      fill: 'transparent',

      width: measurementThickness,
      height: 1000,
      evented: false,
      selectable: false,
      selection: false
    }));

    this.canvas.add(new fabric.Rect({
      left: 0,
      top: 0,
      fill: 'transparent',
      width: 4000,
      selectable: false,
      evented: false,
      selection: false,
      height: measurementThickness
    }));
    //upper 1's 
    var tickSize = 10;
    var tickSizeFoot = 40;
    var tickSizeHalf = 20;

    // Drag grid
    var count = 1;
    var footCount = 0;
    var halfCount = 0;

    var boundBoxLocationX = measurementThickness;
    var boundBoxLocationY = measurementThickness;
    var boundBoxWidth = width - measurementThickness;
    var boundBoxHeight = height - measurementThickness;

    //create canvas-bound-box
    this.boundBox = new fabric.Rect({
      width: boundBoxWidth,
      height: boundBoxHeight,
      fill: 'transparent',
      stroke: /*'#blue'*/color,
      left: boundBoxLocationX,
      top: boundBoxLocationY,
      hasBorders: true,
      selectable: false,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
      evented: true,
    })

    this.canvas.add(this.boundBox);



    for (var i = 0; i < (width / grid * 5); i++) {

      var offset = (i * (grid / 5)),
        location1 = offset + measurementThickness,
        //isFoot = ((i + 1) % 12) === 0 && i !== 0;
        isFoot = ((i) % 10) === 0 && i !== 0,
        isHalf = ((i) % 5) === 0 && i !== 0;


      // Grid ------------

      // vertical
      if (isHalf || i == 0) {
        this.canvas.add(new fabric.Line
        ([location1, measurementThickness, location1, width], { stroke: isFoot ? color/*'#888'*/ : color/*'#ccc'*/, selectable: false }));

        // horizontal
        this.canvas.add(new fabric.Line([measurementThickness, location1, width, location1], { stroke: isFoot ? color/*'#888'*/ : color/*'#ccc'*/, selectable: false }));
      }

      // Ruler ------------

      // left
      this.canvas.add(new fabric.Line([measurementThickness - tickSize, location1, measurementThickness, location1],
        { stroke: /*'#888'*/color, selectable: false, evented: false }));
      /*this.canvas.add(new fabric.Text(count + 'm'/*"\"", {
        left: measurementThickness - (tickSize * 2) - 7,
        top: location1,
        fontSize: 12,
        fontFamily: 'san-serif'
      }));*/

      if (isFoot || i == 0) {
        //console.log("Dot Cordinants:x:" + measurementThickness + " y: "+ location1)
        this.canvas.add(new fabric.Line([measurementThickness - tickSizeFoot, location1, measurementThickness, location1],
          { stroke: /*'#222'*/color, selectable: false, evented: false }));

        this.canvas.add(new fabric.Text(footCount + "m", {
          left: measurementThickness - (tickSizeFoot) - 7,
          top: location1 + 4,
          fontSize: 14,
          fontFamily: 'san-serif',
          selectable: false,
          evented: false,
          color:'#b9acac'
        }));
        footCount++;
      }

      if (isHalf) {
        halfCount++;

        this.canvas.add(new fabric.Line([measurementThickness - tickSizeHalf, location1, measurementThickness, location1],
          { stroke: /*'#222'*/color, selectable: false, evented: false }));
        console.log("measurementThickness - tickSizeHalf:" + (measurementThickness - tickSizeHalf) + ' location1: ' + location1 + ' measurementThickness: ' + measurementThickness + '  location1: ' + location1);
      }



      // top
      this.canvas.add(new fabric.Line([location1, measurementThickness - tickSize, location1,
        measurementThickness], { stroke: /*'#888'*/color, selectable: false, evented: false }));
      /*this.canvas.add(new fabric.Text(count + "\"", {
        left: location1,
        top: measurementThickness - (tickSize * 2) - 4,
        fontSize: 12,
        fontFamily: 'san-serif'
      }));*/

      if (isFoot || i == 0) {
        this.canvas.add(new fabric.Line([location1, measurementThickness - tickSizeFoot, location1, measurementThickness], { stroke: /*'#222'*/color, selectable: false, evented: false }));
        this.canvas.add(new fabric.Text(footCount - 1 + "m", {
          left: location1 + 4,
          top: measurementThickness - (tickSizeFoot) - 7,
          fontSize: 14,
          fontFamily: 'san-serif',
          selectable: false,
          evented: false,
          color:'#b9acac'
        }));
      }

      if (isHalf) {

        this.canvas.add(new fabric.Line([location1, measurementThickness - tickSizeHalf, location1, measurementThickness],
          { stroke: /*'#222'*/color, selectable: false, evented: false }));

      }

      count++;
    }

    // snap to grid

    this.canvas.on('object:moving', function (options) {

      console.log('on object:moving');
      options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid
      });


      var p = options.target;
      p.line1 && p.line1.set({ 'x2': p.left + 1, 'y2': p.top + 1 });
      p.line2 && p.line2.set({ 'x1': p.left + 1, 'y1': p.top + 1 });

      if (p.line1 != null && p.line1.text) {
        p.line1.setText(p.line1.text, p.line1);

      }
      if (p.line2 != null) {
        p.line2.setText(p.line2.text, p.line2);

      }

    });

}

}












/*     for (let l of this.lines) {
              var point = new Point();
              point.x = l.get('x1');
              point.y = l.get('y1');
              console.log("line X:" + point.x + "line Y:" + point.y);
         

              if (i > 0) {
                point = new Point();
                point.x = l.get('x1');
                point.y = l.get('y1');
                let prvPoint = this.points[i - 1];
                  console.log("PrvPointX:" + prvPoint.x + "PrvPointY:" + prvPoint.y);
                if (prvPoint.x != l.get('x1')) {
                  point.x = prvPoint.x + (Math.abs(prvPoint.x - l.get('x1')) * 2);
                }
                if (prvPoint.y != l.get('y1')) {
                  point.y = prvPoint.y + (Math.abs(prvPoint.y - l.get('y1')) * 2);
                }
              }

              this.points.push(point);
              console.log("X:" + point.x + " Y:" + point.y);
              i++;

            } */
























    /*this.canvas.onmousedown = function (e) {
      // React to the mouse down event
      console.log(e);
    };

    this.canvas.onmousemove = function (e) {
      console.log(e);
      var loc = this.windowToCanvas(this.canvas, e.clientX, e.clientY);

      //this.drawBackground();
      //this.drawSpritesheet();
      this.drawGuidelines(loc.x, loc.y);
      //this.updateReadout(loc.x, loc.y);
    };

  }

  drawGuidelines(x, y) {
    this.context.strokeStyle = 'rgba(0,0,230,0.8)';
    this.context.lineWidth = 0.5;
    this.drawVerticalLine(x);
    this.drawHorizontalLine(y);
  }

  drawHorizontalLine(y) {
    console.log(y);
    this.context.beginPath();
    this.context.moveTo(0, y + 0.5);
    this.context.lineTo(this.context.canvas.width, y + 0.5);
    this.context.stroke();
  }

  drawVerticalLine(x) {
    console.log(x);
    this.context.beginPath();
    this.context.moveTo(x + 0.5, 0);
    this.context.lineTo(x + 0.5, this.context.canvas.height);
    this.context.stroke();
  }

  windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();

    return {
      x: x - bbox.left * (canvas.width / bbox.width),
      y: y - bbox.top * (canvas.height / bbox.height)
    };
  }
  /*  drawBackground() {
        var VERTICAL_LINE_SPACING = 12;
        let i = this.contextcontext.canvas.height;
  
        this.context.clearRect(0, 0, canvas.width, canvas.height);
        this.context.strokeStyle = 'lightgray';
        this.context.lineWidth = 0.5;
  
        while (i > VERTICAL_LINE_SPACING * 4) {
          this.context.beginPath();
          this.context.moveTo(0, i);
          this.context.lineTo(this.context.canvas.width, i);
          this.context.stroke();
          i -= VERTICAL_LINE_SPACING;
        }
      }
  
      drawSpritesheet() {
        this.context.drawImage(spritesheet, 0, 0);
      }
  
 
  
      updateReadout(x, y) {
        readout.innerText = '(' + x.toFixed(0) + ', ' + y.toFixed(0) + ')';
      }
  
 
}   */
