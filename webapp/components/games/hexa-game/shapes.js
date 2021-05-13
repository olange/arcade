import { Graphics } from 'pixi.js';
import { HexaKeyboardMixin } from './interactive-mixins.js';
import { RotatingSprite } from './sprites.js';

// -------
// circles
// -------

/**
 * Creates a circle
 *
 * @param {*} options.x - center.x
 * @param {*} options.y - center.y
 * @param {*} options.radius
 * @param {*} options.fillcolor
 * @param {*} options.strokecolor
 */
export class Circle extends Graphics {
  constructor(options) {
    console.log('Circle', options);
    super();
    this.lineStyle(1, options.strokecolor);
    this.beginFill(options.fillcolor, 0.9);
    this.drawCircle(0, 0, options.radius); // NOT at (x,y)!
    this.endFill();
    this.x = options.x;
    this.y = options.y;
  }
}

// -------
// squares
// -------

/**
 * Creates a square
 *
 * @param {*} options.x - center.x
 * @param {*} options.y - center.y
 * @param {*} options.side
 * @param {*} options.fillcolor
 * @param {*} options.strokecolor
 */
export class Square extends Graphics {
  constructor(options) {
    console.log('Square', options);
    super();
    this.lineStyle(1, options.strokecolor);
    this.beginFill(options.fillcolor, 0.5);
    let half = options.side / 2; // square centered on (0,0)
    this.drawPolygon([-half, -half, half, -half, half, half, -half, half]);
    this.endFill();
    this.x = options.x;
    this.y = options.y;

    //this.alpha = 0.8; // affects both stroke and fill
  }
}

// --------
// hexagons
// --------

/**
 * Creates a hexagon (vertical or horizontal)
 *
 * @param {*} options.x     - center.x, pixels
 * @param {*} options.y     - center.y, pixels
 * @param {*} options.side  - hexagon side (aka radius), pixels
 * @param {*} options.vertical - if true: vertex on top else: side on top
 * @param {*} options.fillcolor
 * @param {*} options.strokecolor
 */
export class Hexagon extends Graphics {
  constructor(options) {
    // console.log('Hexagon', options);
    super();

    this.vertical = options.vertical;

    const side = options.side;
    this.side = side; // also visible in the subclass, e.g. a mixin
    const rInner = (side * Math.sqrt(3)) / 2;

    if (options.strokecolor == null) {
      options.strokecolor = 0x999999;
    }
    this.lineStyle(1, options.strokecolor);
    if (options.fillcolor) {
      this.beginFill(options.fillcolor);
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

    this.x = options.x;
    this.y = options.y;
  }
}

// ------------------
// positioning mixins
// ------------------

/**
 * Adds hexgonal (col,row)->(x,y) conversion to the superclass
 *
 * @param {*} superclass
 */
export let HexaCR2XYMixin = (superclass) =>
  class extends superclass {
    constructor(options) {
      // console.log('HexaCR2XYMixin', options);
      super(options);

      this.vertical = options.vertical;
      // horizontal
      this.step_x = options.side * 1.5;
      this.step_y = options.side * Math.sqrt(3);
      this.odd_offset_x = 0;
      this.odd_offset_y = this.step_y / 2;

      this.setDiscreteHexPosition(options.col, options.row);
    }

    incrementDiscreteHexPosition(col, row) {
      //console.log('incrementDiscreteHexPosition', col, row);
      this.setDiscreteHexPosition(this.col + col, this.row + row);
    }

    setDiscreteHexPosition(col, row) {
      //console.log('setDiscreteHexPosition', col, row);
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

    gridSteps() {
      if (this.vertical) {
        return [this.step_y, this.step_x];
      } else {
        return [this.step_x, this.step_y];
      }
    }
  };

// ---------------
// extended shapes
// ---------------

/**
 * creates a Hexagon placed at (col, row) on a hexa grid
 */
export class HexagonCR extends HexaCR2XYMixin(Hexagon) {
  constructor(options) {
    // console.log('HexagonCR', options);
    super(options);
  }
}

/**
 * Creates a Hexagon placed at (col, row) on a hexa grid and steered by keys HZTFVB/ASDYXC
 */
export class HexagonCRKeyboard extends HexaKeyboardMixin(
  HexaCR2XYMixin(Hexagon),
) {
  //   constructor(options) {
  //     // console.log('HexagonCRKeyboard', options);
  //     super(options);
  //   }
}

/**
 * Creates a Circle placed at (col, row) on a hexa grid and steered by keys HZTFVB/ASDYXC
 */
export class CircleOnHexagonCRKeyboard extends HexaKeyboardMixin(
  HexaCR2XYMixin(Circle),
) {
  //   constructor(options) {
  //     console.log('CircleOnHexagonCRKeyboard', options);
  //     super(options);
  //   }
}

/**
 * Creates a rotating sprite placed at (col, row) on a hexa grid and steered by keys HZTFVB/ASDYXC
 * @param {*} options.col - column in hexa grid
 * @param {*} options.row - row in hexa grid
 * @param {*} options.side - hexagonSide in hexa grid
 * @param {*} options.vertical - if true: vertex on top else: side on top
 * @param {*} options.imageUrl
 * @param {*} options.size - pixels (optional)
 */
export class RotatingSpriteOnHexagonCRKeyboard extends HexaKeyboardMixin(
  HexaCR2XYMixin(RotatingSprite),
) {
  //   constructor(options) {
  //     console.log('RotatingSpriteOnHexagonCRKeyboard', options);
  //     super(options);
  //   }
}
