/*
TODO
- modify hexagon and onDragSnap to use sx, sy snap displacements stored in the hexagon
- use the same data/functions in placing hexagons onto the grid
- make onDragSnap work correctly for both orientations of hexagons
+ reactivate dragging of hexagons
- can we put the drag functions into a mixin?
+ makeHexaGrid: convert to class HexaGrid
- add keyboard interactions for hexagons and other shapes

- DragMixin: drag w/o snap: simply return p in toHexagonPosition2
- DragMixin: drag with snap, generalized using x and y granularity
- it might be possible to separate snapping into SnapMixin
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
export class Circle2 extends PIXI.Graphics {
  constructor(x, y, radius, fillcolor, strokecolor) {
    super();
    this.lineStyle(1, strokecolor);
    this.beginFill(fillcolor, 0.3);
    this.drawCircle(x, y, radius);
    this.endFill();
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
  constructor(nx, ny, x, y, r, vertical, fillcolor, strokecolor) {
    super();
    console.log("HexaGrid", nx, ny, x, y, r, vertical, fillcolor, strokecolor);
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

        let hexagon = new Hexagon(
          x + sx + i * dx,
          y + sy + j * dy,
          r,
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

    for (var i = 0; i < 10; i++) {
      var hexaP = toHexagonPosition({
        x: Math.floor(Math.random() * this.app_stage_width),
        y: Math.floor(Math.random() * this.app_stage_width),
      });
      let hexagon = new DraggableHexagon(hexaP.x, hexaP.y, hexagonSide);
      //      this.addChild(hexagon);
    }
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

// drag functions used by Square
// TODO CAN WE PUT THESE FUNCTIONS INTO A MIXIN? YES.

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
    console.log("DraggableHexagon.toHexagonPosition", p, newP);
    return newP;
  }
}

// ------------------------------

export let DragMixin = (superclass) =>
  class extends superclass {
    constructor(...rest) {
      console.log("DragMixin", ...arguments);
      super(...rest);

      this.hexagonHeight2 = side * Math.sqrt(3);
      this.side = side;

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
      console.log("DragMixin.toHexagonPosition", p, newP);
      return newP;
      //return p;
    }
  };

export class DraggableHexagon3 extends DragMixin(Hexagon) {
  constructor(x, y, side, vertical, fillcolor, strokecolor) {
    console.log("DraggableHexagon3", ...arguments);
    super(...arguments);
  }
}
