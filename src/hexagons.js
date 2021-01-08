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

HEXAGON CODE PATTERNS

• new Hexagon(x, y, side, vertical, fillcolor, strokecolor) - draws a vertical or horizontal hexagon

• new DraggableHexagon(x, y, side) - draws a horizontal hexagon that snaps to discrete positions when dragged
  - has a method, toHexagonPosition2(newPosition) that returns the discrete position for the given newPosition
  - toHexagonPosition2(newPosition) can be used ba a parent object to place the hexaon initially to a discrete position
  - see class DragHexagons for an example

• new DragHexagons - creates a fixed number (10) of DraggableHexagon instances, placed on radomly onto a horizontal hexagon grid

• new HexaGrid(nx, ny, x, y, r, vertical, fillcolor, strokecolor) - creates a grid of nx * ny Hexagon instances
  - in constructor implements own version of algorithm for placing hexagons to discrete positions 

• let HexaDragMixin = (superclass) => class extends superclass - mixin, provides the draggable horizontal hexagon snap-to-grid behavior

• new DraggableHexagon3(x, y, side, vertical, fillcolor, strokecolor) - creates a draggable horizontal hexagon 
  - equivalent to DraggableHexagon [TODO make it a drop-in replacement for Hexagon]
  - extends HexaDragMixin(Hexagon)

DRAGGABLE CODE PATTERNS

• new Circle(x, y, radius, fillcolor, strokecolor) - creates a Circle instance
• new Square(x, y, side, fillcolor, strokecolor) - creates a Square instance

• let DragMixin = (superclass) => class extends superclass - mixin, provides the drag behavior (not snapping)

• new DraggableCircle(x, y, radius, fillcolor, strokecolor) - creates a Circle that can be dragged
 - extends DragMixin(Circle)

• new DraggableSquare(x, y, side, vertical, fillcolor, strokecolor) - creates a Square that can be dragged
  - extends DragMixin(Square)

PASSING ARGUMENTS BETWEEN CLASS AND SUPERCLASS (POSSIBLY A MIXIN)

There are two possibilities

• list of positional arguments
  - compact
  - can peel off arguments
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

// -------
// squares
// -------

/**
 * Creates a square
 *
 * @param {*} x    - origin.x
 * @param {*} y    - origin.y
 * @param {*} side
 * @param {*} fillcolor
 * @param {*} strokecolor
 */
export class Square extends PIXI.Graphics {
  constructor(x, y, side, fillcolor, strokecolor) {
    super();
    this.lineStyle(1, strokecolor);
    this.beginFill(fillcolor, 0.3);
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
export class Hexagon extends PIXI.Graphics {
  constructor(x, y, side, vertical, fillcolor, strokecolor) {
    //console.log("Hexagon", ...arguments);
    super();

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
export class HexaGrid extends PIXI.Container {
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
          strokecolor
        );
        //console.log("HexaGrid:", hexagon);
        hexagons.push(hexagon);
        this.addChild(hexagon);
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
export class DragHexagons extends PIXI.Container {
  constructor() {
    super();
    let hexagonSide = 40;
    this.app_stage_width = 500;

    let sampleHexagon = new DraggableHexagon(0, 0, hexagonSide);

    for (var i = 0; i < 10; i++) {
      var hexaP = sampleHexagon.toHexagonPosition2({
        x: Math.floor(Math.random() * this.app_stage_width),
        y: Math.floor(Math.random() * this.app_stage_width),
      });
      let hexagon = new DraggableHexagon(hexaP.x, hexaP.y, hexagonSide);
      this.addChild(hexagon);
    }
  }
}

// ----------------------------------------------------

function onTouchDown(e) {
  console.log("onTouchDown", e);
}

// ----------------------------------------------------

/**
 * Creates an instance of a (horizontal) hexagon which is draggable
 * When dragged, snaps to discrete positions on a hexa grid
 *
 * @param {*} x - center.x
 * @param {*} y - center.y
 * @param {*} side
 */
export class DraggableHexagon extends PIXI.Graphics {
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
    //console.log("DraggableHexagon.toHexagonPosition", p, newP);
    return newP;
  }
}

// ------------------------------

export let HexaDragMixin = (superclass) =>
  class extends superclass {
    constructor(...rest) {
      //("HexaDragMixin", ...arguments);
      super(...rest);
      //   console.log("HexaDragMixin", side); // how do we get side? A GOBAL!
      //   console.log("HexaDragMixin", rInner); // A GLOBAL!
      //   //console.log("HexaDragMixin", whatever); NOT DEFINED
      //   console.log("HexaDragMixin", this.side); // from the superclass

      //this.side = side;

      this.step_x = this.side * 1.5;
      this.step_y = this.side * Math.sqrt(3);
      this.odd_column_offset = this.step_y / 2;

      this.interactive = true;
      this.buttonMode = true;

      // enable interactive mode and hand cursor on hover
      this.interactive = true;
      this.buttonMode = true;

      // setup events for mouse + touch using the pointer events
      this.on("pointerdown", this.onDragStart2)
        .on("pointerup", this.onDragEnd2)
        .on("pointerupoutside", this.onDragEnd2)
        .on("pointermove", this.onDragMove2);
    }

    onDragStart2(event) {
      // store a reference to the data
      // the reason for this is because of multitouch
      // we want to track the movement of this particular touch
      this.data = event.data;
      this.alpha = 0.5;
      this.dragging = true;
      this.onDragMove2();
    }

    onDragEnd2() {
      this.alpha = 1;
      this.dragging = false;
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

    // onDragSnap2() {
    //   // same as onDragMove2
    //   if (this.dragging) {
    //     var newPosition = this.data.getLocalPosition(this.parent);
    //     var hexaP = this.toHexagonPosition2(newPosition);
    //     this.x = hexaP.x;
    //     this.y = hexaP.y;
    //   }
    // }

    toHexagonPosition2(p) {
      var newP = {};
      var xIndex = Math.round(p.x / this.step_x);
      newP.x = xIndex * this.step_x;
      var quot = p.y / this.step_y;
      if (xIndex % 2) {
        var yIndex = Math.floor(p.y / this.step_y);
        newP.y = yIndex * this.step_y + this.odd_column_offset;
      } else {
        var yIndex = Math.round(p.y / this.step_y);
        newP.y = yIndex * this.step_y;
      }
      //   console.log(
      //     "HexaDragMixin.toHexagonPosition",
      //     p,
      //     newP,
      //     xIndex,
      //     yIndex,
      //     quot
      //   );
      return newP;
      //return p;
    }

    toHexagonPosition2_A(p) {
      var newP = {};
      var xIndex = Math.round(p.x / this.step_x);
      newP.x = xIndex * this.step_x;
      var quot = p.y / this.step_y;
      if (xIndex % 2) {
        var yIndex = Math.round((p.y - this.odd_column_offset) / this.step_y);
        newP.y = yIndex * this.step_y + this.odd_column_offset;
      } else {
        var yIndex = Math.round(p.y / this.step_y);
        newP.y = yIndex * this.step_y;
      }
      //   console.log(
      //     "HexaDragMixin.toHexagonPosition",
      //     p,
      //     newP,
      //     xIndex,
      //     yIndex,
      //     quot
      //   );
      return newP;
      //return p;
    }

    /*
    TODO express in these terms, and write the vertical version
    snap hexagons: horizontal
        . step.x = side * 1.5
        . step.y = side * sqrt(3)  aka hexagonHeight
        . odd_offset.x = 0
        . odd_offset.y = odd_column ? hexagonHeight / 2 : 0
    */

    toHexagonPosition2_B(p) {
      var newP = {};
      var xIndex = Math.round(p.x / this.step_x);
      newP.x = xIndex * this.step_x;
      var quot = p.y / this.step_y;
      if (xIndex % 2) {
        var yIndex = Math.round((p.y - this.odd_column_offset) / this.step_y);
        newP.y = yIndex * this.step_y + this.odd_column_offset;
      } else {
        var yIndex = Math.round(p.y / this.step_y);
        newP.y = yIndex * this.step_y;
      }
      //   console.log(
      //     "HexaDragMixin.toHexagonPosition",
      //     p,
      //     newP,
      //     xIndex,
      //     yIndex,
      //     quot
      //   );
      return newP;
      //return p;
    }
  };

export class DraggableHexagon3 extends HexaDragMixin(Hexagon) {
  constructor(x, y, side, vertical, fillcolor, strokecolor) {
    //console.log("DraggableHexagon3", ...arguments);
    super(...arguments);
  }
}

export let DragMixin = (superclass) =>
  class extends superclass {
    constructor(...rest) {
      console.log("DragMixin", ...arguments);
      super(...rest);

      // enable interactive mode and hand cursor on hover
      this.interactive = true;
      this.buttonMode = true;

      // setup events for mouse + touch using the pointer events
      this.on("pointerdown", this.onDragStart)
        .on("pointerup", this.onDragEnd)
        .on("pointerupoutside", this.onDragEnd)
        .on("pointermove", this.onDragMove);
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

export class DraggableCircle extends DragMixin(Circle) {
  constructor(x, y, radius, fillcolor, strokecolor) {
    console.log("DraggableCircle", ...arguments);
    super(...arguments);
  }
}

export class DraggableSquare extends DragMixin(Square) {
  constructor(x, y, side, vertical, fillcolor, strokecolor) {
    console.log("DraggableSquare", ...arguments);
    super(...arguments);
  }
}
