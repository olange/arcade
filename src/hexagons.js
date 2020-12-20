/*
TODO
- modify hexagon and onDragSnap to use sx, sy snap displacements stored in the hexagon
- use the same data/functions in placing hexagons onto the grid
- make onDragSnap work correctly for both orientations of hexagons
- reactivate dragging of hexagons
*/

export function makeCircle(x, y, r) {
  let circle = new PIXI.Graphics();
  circle.lineStyle(1, 0x000000);
  circle.beginFill(0x33cc33);
  circle.drawCircle(x, y, r);
  circle.endFill();
  return circle;
}

export function makeSquare(x, y, side) {
  let square = new PIXI.Graphics();

  square.lineStyle(1, 0x000000);

  square.beginFill(0xff0000);
  square.drawPolygon([0, 0, side, 0, side, side, 0, side]);
  square.endFill();
  square.x = x;
  square.y = y;

  square.alpha = 0.1; // affects both stroke and fill

  // enable interactive (mouse and touch events) and cursor on hover
  square.interactive = true;
  square.buttonMode = true;

  // setup events for mouse + touch using the pointer events
  square
    .on("pointerdown", onDragStart)
    .on("pointerup", onDragEnd)
    .on("pointerupoutside", onDragEnd)
    .on("pointermove", onDragSnap);

  console.log("square", square);
  return square;
}

var hexagonRadius = 0;
var hexagonHeight = 0;

export function makeHexagon(x, y, rOuter, vertical, fillcolor, strokecolor) {
  let height = rOuter * Math.sqrt(3);
  let rInner = (rOuter * Math.sqrt(3)) / 2;
  hexagonRadius = rOuter;
  hexagonHeight = height;

  let hexagon = new PIXI.Graphics();
  if (strokecolor == null) {
    strokecolor = 0x999999;
  }
  hexagon.lineStyle(1, strokecolor);

  //fillcolor = 0xff00ff;
  if (fillcolor) {
    hexagon.beginFill(fillcolor);
  }

  let coordinates = [
    -rOuter,
    0,
    -rOuter / 2,
    rInner,
    rOuter / 2,
    rInner,
    rOuter,
    0,
    rOuter / 2,
    -rInner,
    -rOuter / 2,
    -rInner,
  ];
  if (vertical) {
    coordinates = coordinates.reverse();
  }
  hexagon.drawPolygon(coordinates);

  if (fillcolor) {
    hexagon.endFill();
  }
  hexagon.x = x;
  hexagon.y = y;

  //hexagon.radius = radius;
  //hexagon.height = height;

  // enable interactive (respond to mouse and touch events)
  hexagon.interactive = true;

  // enable button mode (cursor on hover)
  hexagon.buttonMode = true;

  // center the anchor point
  //hexagon.anchor.set(0.5);

  // make it a bit bigger, so it's easier to grab
  // hexagon.scale.set(3);

  // setup events for mouse + touch using the pointer events
  hexagon
    .on("pointerdown", onDragStart)
    .on("pointerup", onDragEnd)
    .on("pointerupoutside", onDragEnd)
    .on("pointermove", onDragSnap);

  //console.log("makeHexagon", hexagon);
  return hexagon;
}

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
    var ox = 0;
    var oy = r;
  } else {
    var dx = r * 1.5;
    var dy = r * 2 * c30;
    var ox = 0;
    var oy = r;
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

      let hexagon = makeHexagon(
        x + ox + sx + (i + 0.5) * dx,
        y + oy + sy + j * dy,
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

function onDragSnap() {
  if (this.dragging) {
    var newPosition = this.data.getLocalPosition(this.parent);
    var hexaP = toHexagonPosition(newPosition);
    this.x = hexaP.x;
    this.y = hexaP.y;

    // this.mask.x = this.x;
    // this.mask.y = this.y;
  }
}

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
