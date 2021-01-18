import { Graphics } from 'pixi.js';

// -------
// circles
// -------
/**
 * Creates a circle
 *
 * @param {*} x    - center.x
 * @param {*} y    - center.y
 * @param {*} radius
 * @param {*} fillcolor
 * @param {*} strokecolor
 */
export class Circle extends Graphics {
  constructor(x, y, radius, fillcolor, strokecolor) {
    super();
    this.lineStyle(1, strokecolor);
    this.beginFill(fillcolor, 0.9);
    this.drawCircle(0, 0, radius); // NOT at (x,y)!
    this.endFill();
    this.x = x;
    this.y = y;
  }
}

// -------
// squares
// -------

/**
 * Creates a square
 *
 * @param {*} x    - center.x
 * @param {*} y    - center.y
 * @param {*} side
 * @param {*} fillcolor
 * @param {*} strokecolor
 */
export class Square extends Graphics {
  constructor(x, y, side, fillcolor, strokecolor) {
    super();
    this.lineStyle(1, strokecolor);
    this.beginFill(fillcolor, 0.5);
    let half = side / 2; // square centered on (0,0)
    this.drawPolygon([-half, -half, half, -half, half, half, -half, half]);
    this.endFill();
    this.x = x;
    this.y = y;

    //this.alpha = 0.8; // affects both stroke and fill
  }
}
// --------
// hexagons
// --------

/**
 * Creates a hexagon (vertical or horizontal)
 *
 * @param {*} x     - center-x
 * @param {*} y     - center-y
 * @param {*} side  - hexagon side (aka radius)
 * @param {*} vertical - if true: vertex on top else: side on top
 * @param {*} fillcolor
 * @param {*} strokecolor
 */
export class Hexagon extends Graphics {
  constructor(x, y, side, vertical, fillcolor, strokecolor) {
    //console.log("Hexagon", ...arguments);
    super();

    this.vertical = vertical;

    let rInner = (side * Math.sqrt(3)) / 2;
    this.side = side; // also visible in the subclass, e.g. a mixin

    if (strokecolor == null) {
      strokecolor = 0x999999;
    }
    this.lineStyle(1, strokecolor);
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
    if (this.vertical) {
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
