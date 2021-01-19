import { Graphics } from 'pixi.js';
import { HexaKeyboardMixin } from './pixi-interactive.js';

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
 * @param {*} col
 * @param {*} row
 * @param {*} side  - hexagon side (aka radius)
 * @param {*} vertical - if true: vertex on top else: side on top
 * @param {*} fillcolor
 * @param {*} strokecolor
 */
export class Hexagon extends Graphics {
  constructor(x, y, side, vertical, fillcolor, strokecolor) {
    console.log('Hexagon', ...arguments);
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

/**
 * Adds hexgonal (col,row)->(x,y) conversion to the superclass
 *
 * @param {*} superclass
 */
export let HexaCR2XYMixin = (superclass) =>
  class extends superclass {
    constructor(col, row, side, vertical, ...rest) {
      console.log('HexaRC2XYMixin', col, row, side, vertical, ...rest);
      super(col, row, side, vertical, ...rest);

      // horizontal
      this.step_x = side * 1.5;
      this.step_y = side * Math.sqrt(3);
      this.odd_offset_x = 0;
      this.odd_offset_y = this.step_y / 2;

      this.setDiscreteHexPosition(col, row);
    }

    incrementDiscreteHexPosition(col, row) {
      console.log('incrementDiscreteHexPosition', col, row);
      this.setDiscreteHexPosition(this.col + col, this.row + row);
    }

    setDiscreteHexPosition(col, row) {
      console.log('setDiscreteHexPosition', col, row);
      this.col = col;
      this.row = row;
      let discretePos = this.vertical
        ? this.verticalHexPosition(col, row)
        : this.horizontalHexPosition(col, row);
      this.x = discretePos.x;
      this.y = discretePos.y;
    }

    verticalHexPosition(col, row) {
      [row, col] = [col, row];
      let p = this.horizontalHexPosition(col, row);
      [p.y, p.x] = [p.x, p.y];
      return p;
    }

    horizontalHexPosition(col, row) {
      var p = {};
      p.x = col * this.step_x;
      p.y = row * this.step_y;
      if (col % 2) {
        p.y += this.odd_offset_y;
      }
      //console.log("horizontalHexPosition", p, newP, col, row);
      return p;
    }
  };

/**
 * creates a Hexagon placed at (col, row) on a hexa grid
 */
export class HexagonCR extends HexaCR2XYMixin(Hexagon) {
  constructor(col, row, side, vertical, fillcolor, strokecolor) {
    console.log('HexagonCR', ...arguments);
    super(...arguments);
  }
}

/**
 * Creates a Hexagon placed at (col, row) on a hexa grid and steered by keys HZTFVB
 */
export class HexagonCRKeyboard extends HexaKeyboardMixin(
  HexaCR2XYMixin(Hexagon),
) {
  constructor(col, row, side, vertical, fillcolor, strokecolor) {
    console.log('HexagonCRKeyboard', ...arguments);
    super(...arguments);
  }
}
