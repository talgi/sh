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

  private currLine;
  private currText;
  private currCircle;

  //booleans:
  private isCreateLine = false;

  private circleRadius = 10;

  constructor(private ele: ElementRef, private dataService: AppDataService) { }

  ngOnInit() {
    this.dataService.resetLayoutObservable.subscribe(() => {
      for (let l of this.lines) {
        l.text && l.text.remove();
        l.remove();
      }
      for (let c of this.circles) {
        c.remove();
      }
      this.lines = [];
      this.circles = [];
      this.currLine = null;
      this.currText = null;
      this.currCircle = null;
      this.isDrawingMode = true;
      this.isCreateLine = false;
    });
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
          var pointer = this.getPointer(options.e);

          this.currLine.setLine(pointer);
          this.canvas.renderAll(); //}
          if (this.doesIntersect(this.currLine)) {
            this.currLine.setStroke('orange');
          } else {
            this.currLine.setStroke('red');
          }
        }
      }
    });

    this.canvas.on({
      'mouse:down': (options) => {
        let pointer = this.getPointer(options.e);
        if (this.currLine && this.currLine.stroke === 'orange') {
            return;
        } else if (options.target && options.target.type != 'circle' && this.isDrawingMode == true) {
          this.isCreateLine = true;
          let points = [pointer.x, pointer.y, pointer.x, pointer.y];

          if (this.circles.length == 0) {
            this.currText = this.makeText();
            this.currLine = this.makeLine(points, this.currText);

            var line1 = null;
            var line2 = this.currLine;

            this.currCircle = this.makeCircle(
              pointer.x,
              pointer.y,
              line1, line2);
          } else {
            // If line is on same plane, move circle
            if (this.currCircle.line1 && (this.currCircle.line1.isHorizontal() === this.currLine.isHorizontal())) {
              this.currCircle.line1.setLine(pointer);
              this.currCircle.set('left', this.currCircle.line1.get('x2'));
              this.currCircle.set('top', this.currCircle.line1.get('y2'));
              this.currLine.set('x1', this.currCircle.line1.get('x2'));
              this.currLine.set('y1', this.currCircle.line1.get('y2'));
              this.currLine.setLine(pointer);
              return;
            } else {
              let points = [this.currLine.get('x2'), this.currLine.get('y2'), pointer.x, pointer.y];
              this.currLine.setLine(pointer);
              this.currText = this.makeText();
              line1 = this.currLine;
              line2 = this.makeLine(points, this.currText);

              this.currCircle = this.makeCircle(this.currLine.get('x2'),
                this.currLine.get('y2'),
                line1, line2);

              this.currLine = line2;
            }
          }


          this.canvas.add(this.currText);
          this.canvas.add(this.currLine);
          this.canvas.add(this.currCircle);
          this.canvas.sendToBack(this.currLine);
          this.canvas.bringForward(this.currCircle);
          this.canvas.bringForward(this.currText);
          this.lines.push(this.currLine);
          this.circles.push(this.currCircle);
        }
        else {
          console.log(options.target === this.circles[0])
          if (
            this.circles.length >= 3 &&
            options.target === this.circles[0] &&
            this.isDrawingMode == true &&
            this.currLine.isHorizontal() !== this.circles[0].line2.isHorizontal()
           ) {

            //let pointer = this.getPointer(options.e);
            //let points = [pointer.x, pointer.y, pointer.x, pointer.y];
            this.circles[0].line1 = this.currLine;
            let firstLine = this.circles[0].line2;
            if (firstLine.get('x2') != firstLine.get('x1')) {
              firstLine.set({ x1: this.circles[0].line1.get('x2') });
              this.circles[0].left = firstLine.get('x1');
            }
            //this.circles[0].line2.set({x1:this.currLine.get('x2')});
            //this.circles[0].line2.set({y1:this.currLine.get('y2')});
            this.isCreateLine = false;
            this.isDrawingMode = false;
            this.setCoordinants();
          }
        }
      }
    });
  }

  lineIntersect(p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) {
    var s02_x, s02_y, s10_x, s10_y, s32_x, s32_y, s_numer, t_numer, denom;
    s10_x = p1_x - p0_x;
    s10_y = p1_y - p0_y;
    s32_x = p3_x - p2_x;
    s32_y = p3_y - p2_y;

    denom = s10_x * s32_y - s32_x * s10_y;
    if (denom === 0)
        return 0; // Collinear
    let denomPositive = denom > 0;

    s02_x = p0_x - p2_x;
    s02_y = p0_y - p2_y;
    s_numer = s10_x * s02_y - s10_y * s02_x;
    if ((s_numer <= 0) == denomPositive)
        return 0; // No collision
    if (s_numer === 0)
      return 0;

    t_numer = s32_x * s02_y - s32_y * s02_x;
    if ((t_numer <= 0) == denomPositive)
        return 0; // No collision

    if (((s_numer >= denom) == denomPositive) || ((t_numer >= denom) == denomPositive))
        return 0; // No collision
    return 1;
  }

  doesIntersect(line) {
    for (let l of this.lines) {
      if (l!==line && this.lineIntersect(l.x1, l.y1, l.x2, l.y2, line.x1, line.y1, line.x2, line.y2)) {
        return true;
      }
    }
    return false;
  }

  getPointer(event) {
    let pointer = this.canvas.getPointer(event);
    return {
      x: pointer.x + 2,
      y: pointer.y + 2,
    }
  }

  setCoordinants() {
    for (let l of this.lines) {
      let point = new Point();
      point.x = Math.floor(l.get('x1') * 2);
      point.y = Math.floor(l.get('y1') * 2);
      this.points.push(point);
    }

    this.dataService.coordinates = this.points;
  }


  setLine(line, pointer) {
    console.log("on set line ");
    var tDeltaX = Math.abs(pointer.x - line.get('x1'));
    var tDeltaY = Math.abs(pointer.y - line.get('y1'));
    if (tDeltaX > tDeltaY) {
      line.set({ x2: pointer.x, y2: line.get('y1') });
    }
    else {
      line.set({ y2: pointer.y, x2: line.get('x1') });
    }
    line.setText();
  }

  setText(line) {
    let l1x1 = line.get('x1');
    let l1y1 = line.get('y1');
    let l1x2 = line.get('x2');
    let l1y2 = line.get('y2');

    let txpos = (l1x1 + l1x2) / 2;
    let typos = (l1y1 + l1y2) / 2;

    var tDeltaX = l1x2 - l1x1;
    var tDeltaY = l1y2 - l1y1;
    let length = (2*(tDeltaX + tDeltaY)).toFixed(2).toString();

    line.text.set({ 'left': txpos + 20, 'top': typos + 20, 'text': length });
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
      originX: 'center',
      originY: 'center',
    });

    l.text = text;
    l.text.left = coords[0];
    l.text.top = coords[1];
    l.setLine = this.setLine.bind(this, l);
    l.setText = this.setText.bind(this, l);
    l.isHorizontal = () => { return l.get('y1') === l.get('y2'); };

    return l;
  }

  makeCircle(left, top, line1, line2) {
    var c = new fabric.Circle({
      left: left,
      top: top,
      strokeWidth: 5,
      radius: this.circleRadius,
      fill: '#fff',
      stroke: '#666',
      selectable: false,
      originX: 'center',
      originY: 'center',
    });
    c.hasControls = c.hasBorders = false;

    c.line1 = line1;
    c.line2 = line2;
    //c.text1 = text1;
    //c.text2=c.text2;
    return c;
  }

  setCanvas() {
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
          color: '#b9acac'
        }));
        footCount++;
      }

      if (isHalf) {
        halfCount++;

        this.canvas.add(new fabric.Line([measurementThickness - tickSizeHalf, location1, measurementThickness, location1],
          { stroke: /*'#222'*/color, selectable: false, evented: false }));
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
          color: '#b9acac'
        }));
      }

      if (isHalf) {

        this.canvas.add(new fabric.Line([location1, measurementThickness - tickSizeHalf, location1, measurementThickness],
          { stroke: /*'#222'*/color, selectable: false, evented: false }));

      }

      count++;
    }
  }
}