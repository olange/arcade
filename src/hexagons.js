/*
TODO
- modify hexagon and onDragSnap to use sx, sy snap displacements stored in the hexagon
- use the same data/functions in placing hexagons onto the grid
- make onDragSnap work correctly for both orientations of hexagons
+ reactivate dragging of hexagons
- can we put the drag functions into a mixin?
- makeHexaGrid: convert to a class
- DraggableHexagon2: also handle vertical
- add keyboard interactions for hexagons
*/

// -------
// circles
// -------

export class Circle2 extends PIXI.Graphics {
  constructor(x, y, radius, fillcolor, strokecolor) {
    super();
    this.lineStyle(1, strokecolor);
    this.beginFill(fillcolor, 0.3);
    this.drawCircle(x, y, radius);
    this.endFill();
  }
}

// -------
// squares
// -------

export class Square extends PIXI.Graphics {
  constructor(x, y, side, fillcolor, strokecolor) {
    super();
    this.lineStyle(1, strokecolor);
    this.beginFill(fillcolor, 0.3);
    this.drawPolygon([0, 0, side, 0, side, side, 0, side]);
    this.endFill();
    this.x = x;
    this.y = y;

    this.alpha = 0.8; // affects both stroke and fill

    // enable interactive (mouse and touch events) and cursor on hover
    this.interactive = true;
    this.buttonMode = true;

    // setup events for mouse + touch using the pointer events
    this.on("pointerdown", onDragStart)
      .on("pointerup", onDragEnd)
      .on("pointerupoutside", onDragEnd)
      .on("pointermove", onDragSnap);
  }
}

// --------
// hexagons
// --------

export class Hexagon0 extends PIXI.Graphics {
  constructor(x, y, side, vertical, fillcolor, strokecolor) {
    super();

    let height = side * Math.sqrt(3);
    let rInner = (side * Math.sqrt(3)) / 2;
    // hexagonRadius = side;
    // hexagonHeight = height;

    if (strokecolor == null) {
      strokecolor = 0x999999;
    }
    this.lineStyle(1, strokecolor);

    //fillcolor = 0xff00ff;
    if (fillcolor) {
      this.beginFill(fillcolor);
    }

    let coordinates = [
      -side,
      0,
      -side / 2,
      rInner,
      side / 2,
      rInner,
      side,
      0,
      side / 2,
      -rInner,
      -side / 2,
      -rInner,
    ];
    if (vertical) {
      coordinates = coordinates.reverse();
    }
    this.drawPolygon(coordinates);

    if (fillcolor) {
      this.endFill();
    }
    this.x = x;
    this.y = y;
  }
}

// ---------
// hexagrids
// ---------
export function makeHexaGrid(
  nx,
  ny,
  x,
  y,
  r,
  vertical,
  fillcolor,
  strokecolor
) {
  console.log(
    "makeHexaGrid",
    nx,
    ny,
    x,
    y,
    r,
    vertical,
    fillcolor,
    strokecolor
  );
  const c30 = Math.sqrt(3) / 2;
  if (vertical) {
    var dx = r * 2 * c30;
    var dy = r * 1.5;
  } else {
    var dx = r * 1.5;
    var dy = r * 2 * c30;
  }

  let hexagons = [];
  for (let i = 0; i < nx; i++) {
    for (let j = 0; j < ny; j++) {
      if (vertical) {
        var sx = r * c30 * (j % 2);
        var sy = 0;
      } else {
        var sx = 0;
        var sy = r * c30 * (i % 2);
      }

      let hexagon = new Hexagon0(
        //let hexagon = makeHexagon(
        x + sx + i * dx,
        y + sy + j * dy,
        r,
        vertical,
        fillcolor,
        strokecolor
      );
      //console.log("makeHexaGrid:", hexagon);
      hexagons.push(hexagon);
    }
  }
  return hexagons;
}

// let hexagon999 = makeHexagon(0, 0, 40);

// ----------------------------------------
// DRAGGABLE HEXAGONS
// from https://codepen.io/zeakd/pen/NdMBgB
// ----------------------------------------

export class DragHexagons extends PIXI.Container {
  constructor() {
    super();
    let hexagonSide = 40;
    this.app_stage_width = 500;

    for (var i = 0; i < 10; i++) {
      var hexaP = toHexagonPosition({
        x: Math.floor(Math.random() * this.app_stage_width),
        y: Math.floor(Math.random() * this.app_stage_width),
      });
      let hexagon = new DraggableHexagon2(hexaP.x, hexaP.y, hexagonSide);
      this.addChild(hexagon);
    }

    // for (var i = 0; i < 10; i++) {
    //   var hexaP = toHexagonPosition({
    //     x: Math.floor(Math.random() * this.app_stage_width),
    //     y: Math.floor(Math.random() * this.app_stage_width),
    //   });
    //   let hexagon = new Hexagon1(hexaP.x, hexaP.y);
    //   this.addChild(hexagon);
    // }
  }
}

// drag functions used by Square
// TODO CAN WE PUT THESE FUNCTIONS INTO A MIXIN?

function onDragStart(event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}

function onDragEnd() {
  this.alpha = 1;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
}

function onDragMove() {
  if (this.dragging) {
    var newPosition = this.data.getLocalPosition(this.parent);
    var hexaP = toHexagonPosition(newPosition);
    this.x = hexaP.x;
    this.y = hexaP.y;
  }
}

function onDragSnap() {
  if (this.dragging) {
    var newPosition = this.data.getLocalPosition(this.parent);
    var hexaP = toHexagonPosition(newPosition);
    this.x = hexaP.x;
    this.y = hexaP.y;
  }
}

function onTouchDown(e) {
  console.log("onTouchDown", e);
}

// var hexagonRadius = 0;
// var hexagonHeight = 0;
let side = 40;

let height = side * Math.sqrt(3);
let rInner = (side * Math.sqrt(3)) / 2;
var hexagonRadius = side;
var hexagonHeight = height;

function toHexagonPosition(p) {
  var newP = {};
  var xIdx = Math.round(p.x / (hexagonRadius * (3 / 2)));
  newP.x = xIdx * (hexagonRadius * (3 / 2));
  if (xIdx % 2) {
    newP.y =
      Math.floor(p.y / hexagonHeight) * hexagonHeight + hexagonHeight / 2;
  } else {
    newP.y = Math.round(p.y / hexagonHeight) * hexagonHeight;
  }
  //console.log('toHexagonPosition', p, newP);
  return newP;
}

// ----------------------------------------------------

export class DraggableHexagon2 extends PIXI.Graphics {
  constructor(x, y, side) {
    super();
    //console.log("DraggableHexagon", x, y, side);

    this.hexagonHeight2 = side * Math.sqrt(3);
    this.side = side;
    let rInner = (side * Math.sqrt(3)) / 2;

    //this.beginFill(0xff0000);
    this.beginFill(0xff99aa);

    this.drawPolygon([
      -side,
      0,
      -side / 2,
      rInner,
      side / 2,
      rInner,
      side,
      0,
      side / 2,
      -rInner,
      -side / 2,
      -rInner,
    ]);

    this.endFill();
    this.x = x;
    this.y = y;

    // enable interactive and hand cursor on hover
    this.interactive = true;
    this.buttonMode = true;

    // setup events for mouse + touch using the pointer events
    this.on("pointerdown", this.onDragStart2)
      .on("pointerup", this.onDragEnd2)
      .on("pointerupoutside", this.onDragEnd2)
      .on("pointermove", this.onDragMove2);

    // this.addChild(hexagon);
  }
  onDragStart2(event) {
    // store a reference to the data
    // the reason for this is because of multitouch
    // we want to track the movement of this particular touch
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  onDragEnd2() {
    this.alpha = 1;
    this.dragging = false;
    // set the interaction data to null
    this.data = null;
  }

  onDragMove2() {
    if (this.dragging) {
      var newPosition = this.data.getLocalPosition(this.parent);
      var hexaP = this.toHexagonPosition2(newPosition);
      this.x = hexaP.x;
      this.y = hexaP.y;
    }
  }

  onDragSnap2() {
    // same as onDragMove2
    if (this.dragging) {
      var newPosition = this.data.getLocalPosition(this.parent);
      var hexaP = this.toHexagonPosition2(newPosition);
      this.x = hexaP.x;
      this.y = hexaP.y;
    }
  }

  toHexagonPosition2(p) {
    var newP = {};
    var xIdx = Math.round(p.x / (this.side * (3 / 2)));
    newP.x = xIdx * (this.side * (3 / 2));
    if (xIdx % 2) {
      newP.y =
        Math.floor(p.y / this.hexagonHeight2) * this.hexagonHeight2 +
        this.hexagonHeight2 / 2;
    } else {
      newP.y = Math.round(p.y / this.hexagonHeight2) * this.hexagonHeight2;
    }
    //console.log('toHexagonPosition', p, newP);
    return newP;
  }
}

// drag functions

// function onDragStart2(event) {
//   // store a reference to the data
//   // the reason for this is because of multitouch
//   // we want to track the movement of this particular touch
//   this.data = event.data;
//   this.alpha = 0.5;
//   this.dragging = true;
// }

// function onDragEnd2() {
//   this.alpha = 1;
//   this.dragging = false;
//   // set the interaction data to null
//   this.data = null;
// }

// function onDragMove2() {
//   if (this.dragging) {
//     var newPosition = this.data.getLocalPosition(this.parent);
//     var hexaP = toHexagonPosition2(newPosition);
//     this.x = hexaP.x;
//     this.y = hexaP.y;
//   }
// }

// function onDragSnap2() {
//   if (this.dragging) {
//     var newPosition = this.data.getLocalPosition(this.parent);
//     var hexaP = toHexagonPosition2(newPosition);
//     this.x = hexaP.x;
//     this.y = hexaP.y;
//   }
// }

function onTouchDown2(e) {
  console.log("onTouchDown", e);
}

// function toHexagonPosition2(p) {
//   let side2 = 40;

//   let height2 = side * Math.sqrt(3);
//   let rInner2 = (side * Math.sqrt(3)) / 2;
//   var hexagonRadius2 = side2;
//   var hexagonHeight2 = height2;
//   var newP = {};
//   var xIdx = Math.round(p.x / (hexagonRadius2 * (3 / 2)));
//   newP.x = xIdx * (hexagonRadius2 * (3 / 2));
//   if (xIdx % 2) {
//     newP.y =
//       Math.floor(p.y / hexagonHeight2) * hexagonHeight2 + hexagonHeight2 / 2;
//   } else {
//     newP.y = Math.round(p.y / hexagonHeight2) * hexagonHeight2;
//   }
//   //console.log('toHexagonPosition', p, newP);
//   return newP;
// }

/*

// FOR REFERENCE from https://codepen.io/zeakd/pen/NdMBgB

// var canv = document.getElementById('canvas');
// canv.width = 500;
// canv.height = 500;

// var ctx = canv.getContext('2d');
// ctx.rect(0, 0, canv.width, canv.height);
// ctx.fillStyle = "#888888"
// ctx.fill();

// const renderer = PIXI.autoDetectRenderer(256, 256);
// document.body.appendChild(renderer.view);

// const stage = new PIXI.Container();
// renderer.render(stage);

var hexagonRadius = 60;
var hexagonHeight = hexagonRadius * Math.sqrt(3);

var app = new PIXI.Application(800, 600, { backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// create a texture from an image path
var texture = PIXI.Texture.fromImage(
  "https://pixijs.github.io/examples/required/assets/bunny.png"
);

// Scale mode for pixelation
texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

for (var i = 0; i < 10; i++) {
  var hexaP = toHexagonPosition({
    x: Math.floor(Math.random() * app.renderer.width),
    y: Math.floor(Math.random() * app.renderer.width),
  });
  addSquareAt(hexaP.x, hexaP.y);
}

var hexagonRadius = 60;
var hexagonHeight = hexagonRadius * Math.sqrt(3);

function addSquareAt(x, y) {
  var hexagon = new PIXI.Graphics();
  hexagon.beginFill(0xff0000);

  hexagon.drawPolygon([
    -hexagonRadius,
    0,
    -hexagonRadius / 2,
    hexagonHeight / 2,
    hexagonRadius / 2,
    hexagonHeight / 2,
    hexagonRadius,
    0,
    hexagonRadius / 2,
    -hexagonHeight / 2,
    -hexagonRadius / 2,
    -hexagonHeight / 2,
  ]);

  hexagon.endFill();
  hexagon.x = x;
  hexagon.y = y;

  // enable interactive (respond to mouse and touch events)
  hexagon.interactive = true;

  // enable button mode (cursor on hover)
  hexagon.buttonMode = true;

  // center the anchor point
  // hexagon.anchor.set(0.5);

  // make it a bit bigger, so it's easier to grab
  // hexagon.scale.set(3);

  // setup events for mouse + touch using the pointer events
  hexagon
    .on("pointerdown", onDragStart)
    .on("pointerup", onDragEnd)
    .on("pointerupoutside", onDragEnd)
    .on("pointermove", onDragMove);

  // move the sprite to its designated position
  hexagon.x = x;
  hexagon.y = y;

  // add it to the stage
  app.stage.addChild(hexagon);
  // app.stage.addChild(hexagon);
}

*/

/*

// ------------------------------
// drag handlers
function onDragStart(event) {
  // store a reference to the data
  // the reason for this is because of multitouch
  // we want to track the movement of this particular touch
  this.data = event.data;
  this.alpha = 0.5;
  this.dragging = true;
}


function onDragEnd() {
  this.alpha = 1;
  this.dragging = false;
  // set the interaction data to null
  this.data = null;
}
*/

/*
function toHexagonPosition(p) {
  var newP = {};
  var xIdx = Math.round(p.x / (hexagonRadius * (3 / 2)));
  newP.x = xIdx * (hexagonRadius * (3 / 2));
  if (xIdx % 2) {
    newP.y =
      Math.floor(p.y / hexagonHeight) * hexagonHeight + hexagonHeight / 2;
  } else {
    newP.y = Math.round(p.y / hexagonHeight) * hexagonHeight;
  }

  return newP;
}
*/
