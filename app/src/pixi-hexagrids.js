import { Container } from 'pixi.js';
import { Circle, Hexagon, HexagonCR, Square } from './pixi-shapes.js';

/*
TODO
- modify hexagon and onDragSnap to use sx, sy snap displacements stored in the hexagon
- use the same data/functions in placing hexagons onto the grid
- make onDragSnap work correctly for both orientations of hexagons
+ reactivate dragging of hexagons
+ can we put the drag functions into a mixin? yes
+ makeHexaGrid: convert to class HexaGrid
- add keyboard interactions for hexagons and other shapes

+ DragMixin: drag w/o snap: simply return p in toHexagonPosition2
- SnapMixin: snap to discrete positions initially and on change of position
- DragSnapMixin: drag with snap, generalized using x and y granularity

- define SnapToHexPosMixin, combine with DragMixin

SHAPE CODE PATTERNS

• new Circle(x, y, radius, fillcolor, strokecolor) - creates a Circle instance
• new Square(x, y, side, fillcolor, strokecolor) - creates a Square instance

• new Hexagon(x, y, side, vertical, fillcolor, strokecolor) - draws a vertical or horizontal hexagon

HEXAGON CODE PATTERNS

• new DragSnapHexagonCluster - creates a fixed number (10) of DragSnapHexagon instances, placed radomly onto a horizontal hexagon grid

• new HexaGrid(nx, ny, x, y, r, vertical, fillcolor, strokecolor) - creates a grid of nx * ny Hexagon instances
  - in constructor implements own version of algorithm for placing hexagons to discrete positions 

• new DragSnapHexagon(x, y, side, vertical, fillcolor, strokecolor) - creates a draggable snapping (vertical or horizontal) hexagon 
  - equivalent to DragSnapHexagon [TODO make it a drop-in replacement for Hexagon]
  - extends HexaDragMixin(Hexagon)

• let HexaDragMixin = (superclass) => class extends superclass - mixin, provides the draggable hexagon snap-to-grid behavior

OTHER DRAGGABLE CODE PATTERNS

• let DragMixin = (superclass) => class extends superclass - mixin, provides the drag behavior (not snapping)

• new DraggableCircle(x, y, radius, fillcolor, strokecolor) - creates a Circle that can be dragged
 - extends DragMixin(Circle)

• new DraggableSquare(x, y, side, vertical, fillcolor, strokecolor) - creates a Square that can be dragged
  - extends DragMixin(Square)

PASSING ARGUMENTS BETWEEN CLASS AND SUPERCLASS (POSSIBLY A MIXIN)

There are two possibilities

• list of positional arguments
  - compact
  - a mixin can peel off arguments or get their values from superclass
  - simpler if taking from the front of the list, see PushbuttonMixin for an example

• a js object (aka dictionary)
  - more verbose, but self-documented
  - more flexible

PIXI v5 uses the js object pattern (cf. options argument to PIXI.Application)
*/

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
/* moved to pixi-shapes
export class Circle extends PIXI.Graphics {
    constructor(x, y, radius, fillcolor, strokecolor) {
      super();
      this.lineStyle(1, strokecolor);
      this.beginFill(fillcolor, 0.3);
      this.drawCircle(0, 0, radius); // NOT at (x,y)!
      this.endFill();
      this.x = x;
      this.y = y;
    }
  }
  */
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
/* moved to pixi-shapes
  export class Square extends PIXI.Graphics {
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
  */

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
/* moved to pixi-shapes
  export class Hexagon extends PIXI.Graphics {
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
  */

// ---------
// hexagrids
// ---------

/**
 * Creates a grid of Hexagon
 *
 * @param {*} nx - number of hexagons in x-direction
 * @param {*} ny - number of hexagons in y-direction
 * @param {*} x  - grid origin.x
 * @param {*} y  - grid origin.y
 * @param {*} r  - hexagon radius (side)
 * @param {*} vertical - if true: vertex on top else: side on top
 * @param {*} fillcolor
 * @param {*} strokecolor
 */
/*export*/ class HexaGrid extends Container {
  constructor(nx, ny, x, y, side, vertical, fillcolor, strokecolor) {
    super();
    //console.log("HexaGrid", nx, ny, x, y, side, vertical, fillcolor, strokecolor);
    const c30 = Math.sqrt(3) / 2;
    if (vertical) {
      var dx = side * 2 * c30;
      var dy = side * 1.5;
    } else {
      var dx = side * 1.5;
      var dy = side * 2 * c30;
    }

    let hexagons = [];
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        if (vertical) {
          var sx = side * c30 * (j % 2);
          var sy = 0;
        } else {
          var sx = 0;
          var sy = side * c30 * (i % 2);
        }

        let hexagon = new Hexagon(
          x + sx + i * dx,
          y + sy + j * dy,
          side,
          vertical,
          fillcolor,
          strokecolor,
        );
        //console.log("HexaGrid:", hexagon);
        hexagons.push(hexagon);
        this.addChild(hexagon);
      }
    }
  }
}

/**
 * Creates a grid of HexagonCR
 *
 * @param {*} nx - number of hexagons in x-direction
 * @param {*} ny - number of hexagons in y-direction
 * @param {*} side  - hexagon side , pixels
 * @param {*} vertical - if true: vertex on top else: side on top
 * @param {*} fillcolor
 * @param {*} strokecolor
 */
export class HexagonCRGrid extends Container {
  constructor(nx, ny, side, vertical, fillcolor, strokecolor) {
    super();
    console.log(
      'HexagonCRGrid',
      nx,
      ny,
      side,
      vertical,
      fillcolor,
      strokecolor,
    );

    this.addHexagonCRs(nx, ny, side, vertical, fillcolor, strokecolor);
  }

  addHexagonCRs(nx, ny, side, vertical, fillcolor, strokecolor) {
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) {
        this.addChild(
          new HexagonCR(i, j, side, vertical, fillcolor, strokecolor),
        );
      }
    }
  }
}

// ----------------------------------------
// DRAGGABLE HEXAGONS
// from https://codepen.io/zeakd/pen/NdMBgB
// ----------------------------------------

/**
 * Creates a fixed number of DraggableHexagon instances,
 * at random positions
 * TODO: parametrize
 */
/*export*/ class DragSnapHexagonCluster extends Container {
  constructor(vertical, fillcolor, strokecolor) {
    super();
    let hexagonSide = 40;
    this.app_stage_width = 500;

    for (var i = 0; i < 10; i++) {
      var hexaP = {
        x: Math.floor(Math.random() * this.app_stage_width),
        y: Math.floor(Math.random() * this.app_stage_width),
      };
      // DragSnapHexagon(x, y, side, vertical, fillcolor, strokecolor)
      let hexagon = new DragSnapHexagon(
        hexaP.x,
        hexaP.y,
        hexagonSide,
        vertical,
        fillcolor,
        strokecolor,
      );
      this.addChild(hexagon);
    }
  }
}

// ----------------------------------------------------

function onTouchDown(e) {
  console.log('onTouchDown', e);
}

// ----------------------------------------------------

// ------------------------
// Define HexaDragSnapMixin
// ------------------------

/**
 * Adds hexgonal drag-and-snap behavior to the superclass Hexagon
 *
 * @param {*} superclass
 */
/*export*/ let HexaDragSnapMixin = (superclass) =>
  class extends superclass {
    constructor(...rest) {
      console.log('HexaDragSnapMixin', ...rest);
      super(...rest);
      //   console.log("HexaDragSnapMixin", this.side); // from the superclass

      // horizontal
      this.step_x = this.side * 1.5;
      this.step_y = this.side * Math.sqrt(3);
      this.odd_offset_x = 0;
      this.odd_offset_y = this.step_y / 2;

      // enable interactive mode and hand cursor on hover
      this.interactive = true;
      this.buttonMode = true;

      // setup events for mouse + touch using the pointer events
      this.on('pointerdown', this.onDragStart)
        .on('pointerup', this.onDragEnd)
        .on('pointerupoutside', this.onDragEnd)
        .on('pointermove', this.onDragMove);

      let discretePos = this.discreteHexPosition(this.x, this.y);
      this.x = discretePos.x;
      this.y = discretePos.y;
    }

    onDragStart(event) {
      // store a reference to the data
      this.data = event.data;
      this.alpha = 0.5;
      this.dragging = true;
      this.onDragMove();
    }

    onDragEnd() {
      this.alpha = 1;
      this.dragging = false;
      this.data = null;
    }

    onDragMove() {
      if (this.dragging) {
        let newPos = this.data.getLocalPosition(this.parent);
        let hexaP = this.discreteHexPosition(newPos.x, newPos.y);
        this.x = hexaP.x;
        this.y = hexaP.y;
      }
    }

    discreteHexPosition(x, y) {
      let p = { x: x, y: y };
      return this.vertical
        ? this.verticalHexPosition(p)
        : this.horizontalHexPosition(p);
    }

    verticalHexPosition(p) {
      [p.y, p.x] = [p.x, p.y];
      p = this.horizontalHexPosition(p);
      [p.y, p.x] = [p.x, p.y];
      return p;
    }

    horizontalHexPosition(p) {
      var newP = {};
      var xIndex = Math.round(p.x / this.step_x);
      newP.x = xIndex * this.step_x;
      if (xIndex % 2) {
        var yIndex = Math.floor(p.y / this.step_y);
        newP.y = yIndex * this.step_y + this.odd_offset_y;
      } else {
        var yIndex = Math.round(p.y / this.step_y);
        newP.y = yIndex * this.step_y;
      }
      //console.log("horizontalHexPosition", p, newP, xIndex, yIndex);
      return newP;
    }

    horizontalHexPosition_A(p) {
      var newP = {};
      var xIndex = Math.round(p.x / this.step_x);
      newP.x = xIndex * this.step_x;
      var quot = p.y / this.step_y;
      if (xIndex % 2) {
        var yIndex = Math.round((p.y - this.odd_offset_y) / this.step_y);
        newP.y = yIndex * this.step_y + this.odd_offset_y;
      } else {
        var yIndex = Math.round(p.y / this.step_y);
        newP.y = yIndex * this.step_y;
      }
      return newP;
    }

    horizontalHexPosition_B(p) {
      var newP = {};
      var xIndex = Math.round(p.x / this.step_x);
      newP.x = xIndex * this.step_x;
      var quot = p.y / this.step_y;
      if (xIndex % 2) {
        var yIndex = Math.round((p.y - this.odd_offset_y) / this.step_y);
        newP.y = yIndex * this.step_y + this.odd_offset_y;
      } else {
        var yIndex = Math.round(p.y / this.step_y);
        newP.y = yIndex * this.step_y;
      }
      return newP;
    }
  };

/**
 * Adds hexgonal snap behavior to the superclass
 *
 * @param {*} superclass
 */
/*export*/ let HexaSnapMixin = (superclass) =>
  class extends superclass {
    constructor(...rest) {
      console.log('HexaSnapMixin', ...rest);
      super(...rest);

      // horizontal
      this.step_x = this.side * 1.5; // from superclass
      this.step_y = this.side * Math.sqrt(3);
      this.odd_offset_x = 0;
      this.odd_offset_y = this.step_y / 2;

      let discretePos = this.discreteHexPosition(this.x, this.y);
      this.x = discretePos.x;
      this.y = discretePos.y;
    }

    discreteHexPosition(x, y) {
      let p = { x: x, y: y };
      return this.vertical
        ? this.verticalHexPosition(p)
        : this.horizontalHexPosition(p);
    }

    verticalHexPosition(p) {
      [p.y, p.x] = [p.x, p.y];
      p = this.horizontalHexPosition(p);
      [p.y, p.x] = [p.x, p.y];
      return p;
    }

    horizontalHexPosition(p) {
      var newP = {};
      var xIndex = Math.round(p.x / this.step_x);
      newP.x = xIndex * this.step_x;
      if (xIndex % 2) {
        var yIndex = Math.floor(p.y / this.step_y);
        newP.y = yIndex * this.step_y + this.odd_offset_y;
      } else {
        var yIndex = Math.round(p.y / this.step_y);
        newP.y = yIndex * this.step_y;
      }
      //console.log("horizontalHexPosition", p, newP, xIndex, yIndex);
      return newP;
    }

    horizontalHexPosition_A(p) {
      var newP = {};
      var xIndex = Math.round(p.x / this.step_x);
      newP.x = xIndex * this.step_x;
      var quot = p.y / this.step_y;
      if (xIndex % 2) {
        var yIndex = Math.round((p.y - this.odd_offset_y) / this.step_y);
        newP.y = yIndex * this.step_y + this.odd_offset_y;
      } else {
        var yIndex = Math.round(p.y / this.step_y);
        newP.y = yIndex * this.step_y;
      }
      return newP;
    }

    horizontalHexPosition_B(p) {
      var newP = {};
      var xIndex = Math.round(p.x / this.step_x);
      newP.x = xIndex * this.step_x;
      var quot = p.y / this.step_y;
      if (xIndex % 2) {
        var yIndex = Math.round((p.y - this.odd_offset_y) / this.step_y);
        newP.y = yIndex * this.step_y + this.odd_offset_y;
      } else {
        var yIndex = Math.round(p.y / this.step_y);
        newP.y = yIndex * this.step_y;
      }
      return newP;
    }
  };

/**
 * Creates a drag-snap hexagon
 * When dragged, snaps to discrete positions on a hexagon grid
 *
 * @param {*} x - center.x
 * @param {*} y - center.y
 * @param {*} side  - hexagon side (aka radius)
 * @param {*} vertical - if true: vertex on top else: side on top
 * @param {*} fillcolor
 * @param {*} strokecolor
 */
/*export*/ class DragSnapHexagon extends HexaDragSnapMixin(Hexagon) {
  constructor(x, y, side, vertical, fillcolor, strokecolor) {
    //console.log("DragSnapHexagon", ...arguments);
    super(...arguments);
  }
}

/**
 * Creates a snapping hexagon
 * When created, snaps to a discrete position on a hexagon grid
 *
 * @param {*} x - center.x
 * @param {*} y - center.y
 * @param {*} side  - hexagon side (aka radius)
 * @param {*} vertical - if true: vertex on top else: side on top
 * @param {*} fillcolor
 * @param {*} strokecolor
 */
/*export*/ class SnappingHexagon extends HexaSnapMixin(Hexagon) {
  constructor(x, y, side, vertical, fillcolor, strokecolor) {
    //console.log("SnappingHexagon", ...arguments);
    super(...arguments);
  }
}

/**
 * Adds drag behavior to the superclass
 *
 * @param {*} superclass
 */
/*export*/ let DragMixin = (superclass) =>
  class extends superclass {
    constructor(...rest) {
      console.log('DragMixin', ...arguments);
      super(...rest);

      // enable interactive mode and hand cursor on hover
      this.interactive = true;
      this.buttonMode = true;

      // setup events for mouse + touch using the pointer events
      this.on('pointerdown', this.onDragStart)
        .on('pointerup', this.onDragEnd)
        .on('pointerupoutside', this.onDragEnd)
        .on('pointermove', this.onDragMove);
    }

    onDragStart(event) {
      this.data = event.data;
      this.alpha = 0.7;
      this.dragging = true;
    }

    onDragEnd() {
      this.alpha = 1;
      this.dragging = false;
      this.data = null;
    }

    onDragMove() {
      if (this.dragging) {
        var newPosition = this.data.getLocalPosition(this.parent);
        this.x = newPosition.x;
        this.y = newPosition.y;
      }
    }
  };

/**
 * Creates a draggable Circle
 *
 * @param {*} x - center.x
 * @param {*} y - center.y
 * @param {*} radius
 * @param {*} fillcolor
 * @param {*} strokecolor
 */
/*export*/ class DraggableCircle extends DragMixin(Circle) {
  constructor(x, y, radius, fillcolor, strokecolor) {
    console.log('DraggableCircle', ...arguments);
    super(...arguments);
  }
}

/**
 * Creates a draggable square
 *
 * @param {*} x - center.x
 * @param {*} y - center.y
 * @param {*} side
 * @param {*} fillcolor
 * @param {*} strokecolor
 */
/*export*/ class DraggableSquare extends DragMixin(Square) {
  constructor(x, y, side, fillcolor, strokecolor) {
    console.log('DraggableSquare', ...arguments);
    super(...arguments);
  }
}
