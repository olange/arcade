import { Graphics } from 'pixi.js';

export function makeCircle(x, y, r, fillcolor) {
  let circle = new Graphics();
  circle.lineStyle(1, 0x000000);
  circle.beginFill(fillcolor);
  circle.drawCircle(x, y, r);
  circle.endFill();
  return circle;
}

export function makeSquare(x, y, side, fillcolor, strokecolor) {
  let square = new Graphics();
  square.lineStyle(1, strokecolor);
  if (fillcolor != null) {
    square.beginFill(fillcolor);
  }
  square.drawPolygon([0, 0, side, 0, side, side, 0, side]);

  if (fillcolor != null) {
    square.endFill();
  }
  square.x = x;
  square.y = y;

  // enable interactive (respond to mouse and touch events)
  // square.interactive = true;

  // enable button mode (cursor on hover)
  // square.buttonMode = true;

  // setup events for mouse + touch using the pointer events
  //   hexagon
  //     .on("pointerdown", onDragStart)
  //     .on("pointerup", onDragEnd)
  //     .on("pointerupoutside", onDragEnd)
  //     .on("pointermove", onDragMove);

  console.log('square', square);
  return square;
}

// FOR REFERENCE from https://codepen.io/zeakd/pen/NdMBgB

export function makeHexagon(x, y, radius, vertical, fillcolor, strokecolor) {
  let height = radius * Math.sqrt(3);

  let hexagon = new Graphics();
  if (strokecolor == null) {
    strokecolor = 0x999999;
  }
  hexagon.lineStyle(1, strokecolor);

  //fillcolor = 0xff00ff;
  if (fillcolor) {
    hexagon.beginFill(fillcolor);
  }

  let coordinates = [
    -radius,
    0,
    -radius / 2,
    height / 2,
    radius / 2,
    height / 2,
    radius,
    0,
    radius / 2,
    -height / 2,
    -radius / 2,
    -height / 2,
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

  // enable interactive (respond to mouse and touch events)
  hexagon.interactive = true;

  // enable button mode (cursor on hover)
  hexagon.buttonMode = true;

  // center the anchor point
  //hexagon.anchor.set(0.5);

  // make it a bit bigger, so it's easier to grab
  // hexagon.scale.set(3);

  // setup events for mouse + touch using the pointer events
  //   hexagon
  //     .on("pointerdown", onDragStart)
  //     .on("pointerup", onDragEnd)
  //     .on("pointerupoutside", onDragEnd)
  //     .on("pointermove", onDragMove);

  // move the sprite to its designated position
  //   hexagon.x = x;
  //   hexagon.y = y;

  // add it to the stage
  //app.stage.addChild(hexagon);
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
  strokecolor,
) {
  console.log(
    'makeHexaGrid',
    nx,
    ny,
    x,
    y,
    r,
    vertical,
    fillcolor,
    strokecolor,
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
        strokecolor,
      );
      //console.log("makeHexaGrid:", hexagon);
      hexagons.push(hexagon);
    }
  }
  return hexagons;
}
