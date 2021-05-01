import { Container } from 'pixi.js';
import { Circle, Hexagon, HexagonCR, Square } from './shapes.js';

// ---------
// hexagrids
// ---------

/**
 * Creates a grid of HexagonCR
 *
 * @param {*} options.cols - number of hexagons in x-direction
 * @param {*} options.rows - number of hexagons in y-direction
 * @param {*} options.side  - hexagon side , pixels
 * @param {*} options.vertical - if true: vertex on top else: side on top
 * @param {*} options.fillcolor
 * @param {*} options.strokecolor
 * @param {*} options.width - if defined, overrides options.cols
 * @param {*} options.height - if defined, overrides options.rows
 */
export class HexagonGrid extends Container {
  constructor(options) {
    super();
    console.log('HexagonGrid', options);

    this.setRowsCols(options);
    this.addHexagonCRs(options);
  }

  setRowsCols(options) {
    //console.log('HexagonGrid.setRowsCols', options);
    const sample = new HexagonCR({
      col: 0,
      row: 0,
      side: options.side,
      vertical: options.vertical,
    });
    const [step_x, step_y] = sample.gridSteps();
    if (options.width === undefined) {
      this.cols = options.cols;
    } else {
      this.cols = 1 + Math.ceil(options.width / step_x);
    }
    if (options.height === undefined) {
      this.rows = options.rows;
    } else {
      this.rows = 1 + Math.ceil(options.height / step_y);
    }
  }

  addHexagonCRs(options) {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.addChild(
          new HexagonCR({
            col: i,
            row: j,
            side: options.side,
            vertical: options.vertical,
            fillcolor: options.fillcolor,
            strokecolor: options.strokecolor,
          }),
        );
      }
    }
  }
}

/**
 * Creates a fixed number of HexagonCR instances,
 * representing walls and obstacles
 * TODO: configure from a character matrix
 *
 * @param {*} options
 * @param {*} options.side  - hexagon side , pixels
 * @param {*} options.vertical - if true: vertex on top else: side on top
 * @param {*} options.fillcolor
 * @param {*} options.strokecolor
 */
// export class HexagonGroupFixed extends Container {
//   constructor(options) {
//     super();
//     console.log('HexagonGroup', options);

//     this.addChild(
//       new HexagonCR(
//         3,
//         1,
//         options.side,
//         options.vertical,
//         options.fillcolor,
//         options.strokecolor,
//       ),
//     );
//     this.addChild(
//       new HexagonCR(
//         3,
//         2,
//         options.side,
//         options.vertical,
//         options.fillcolor,
//         options.strokecolor,
//       ),
//     );
//     this.addChild(
//       new HexagonCR(
//         3,
//         3,
//         options.side,
//         options.vertical,
//         options.fillcolor,
//         options.strokecolor,
//       ),
//     );
//     this.addChild(
//       new HexagonCR(
//         3,
//         4,
//         options.side,
//         options.vertical,
//         options.fillcolor,
//         options.strokecolor,
//       ),
//     );
//     this.addChild(
//       new HexagonCR(
//         4,
//         4,
//         options.side,
//         options.vertical,
//         options.fillcolor,
//         options.strokecolor,
//       ),
//     );
//     this.addChild(
//       new HexagonCR(
//         5,
//         4,
//         options.side,
//         options.vertical,
//         options.fillcolor,
//         options.strokecolor,
//       ),
//     );
//   }
// }

// layouts for class HexagonGroupFromLayout

const LAYOUT01 = `x·P●x··x
                  xxxxxxxx`;

const LAYOUT02 = `xxxxxxxxxxxxxxx
                  xx·x●x····xx··x
                  x··x·P··x●x·xxx
                  xxMxxxx·xxx··xx
                  xx·x●x····xx··x
                  xx●···Fx··D···x
                  xxxxxxxxxxxxxxx`;

const LAYOUT03 = `xxxxxxxxxxxxxxxxxxxxxxxxx
xx·x●x····xx··xxx·x●x···x
x··x·P··x●x·xxxxxMxxxx·xx
xxMxxxx·xxx··xxxxMxxxx·xx
xx·x●x····xx··xxxMxxxx·xx
xx●···Fx··D·············x
xx·xxxxxxxxxxxxxxMxxxx·xx
xx·x●x····xx··xxx·x●x···x
x··x·P··x●x·xxxxxMxxxx·xx
xxMx·xx·xxx··xxxxMxxxx·xx
xx·x●x····xx············x
xx●···Fx··D···xxxMxxxx·xx
xxxxxxxxxxxxxxxxxxxxxxxxx`;

// helper funcs for class HexagonGroupFromLayout

/**
 * split the string on whitespace into lines then split into characters
 * @param {String} string
 * @returns {[[String]]}
 */
function splitsplit(string) {
  return string.split(/\s+/).map((line) => {
    return line.split('');
  });
}

class GridItem {
  constructor(col, row, name) {
    this.col = col;
    this.row = row;
    this.name = name;
  }
}

/**
 * convert a layout (matrix of characters) to array of GridItem
 * @param {[[String]]} charMatrix
 * @returns {[GridItem]}
 */
function gridItemsFromLayout(layout) {
  const charMatrix = splitsplit(LAYOUT02);
  // console.log('gridItemsFrom matrix', charMatrix);
  const rows = charMatrix.length;
  const cols = charMatrix[0].length;
  //console.log('charsToColRow', rows, cols, charMatrix, charMatrix[0][0]);
  let gridItems = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      //console.log('charsToColRow', charMatrix[row][col]);
      if (charMatrix[row][col] === 'x') {
        gridItems.push(new GridItem(col, row, 'x'));
      } else {
        // ignore for now
      }
    }
  }
  return gridItems;
}
/**
 * Creates a group HexagonCR instances,
 * representing walls and obstacles,
 * from a text matrix LAYOUT (fixed for now)
 *
 * @param {*} options.side  - hexagon side , pixels
 * @param {*} options.vertical - if true: vertex on top else: side on top
 * @param {*} options.fillcolor
 * @param {*} options.strokecolor
 */
export class HexagonGroupFromLayout extends Container {
  constructor(options) {
    super();
    console.log('HexagonGroupFromLayout', options);

    this.addHexagons(options);
  }

  addHexagons(options) {
    const gridItems = gridItemsFromLayout(LAYOUT02);
    //console.log('addHexagons gridItems', gridItems);
    for (const item of gridItems) {
      let hexagon = new HexagonCR({
        col: item.col,
        row: item.row,
        side: options.side,
        vertical: options.vertical,
        fillcolor: options.fillcolor,
        strokecolor: options.strokecolor,
      });
      this.addChild(hexagon);
    }
  }
}

/**
 * Creates a fixed number of DraggableHexagon instances,
 * at random positions
 * TODO: parametrize
 */
/*export*/ class DragSnapHexagonCluster_UNUSED extends Container {
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
export let HexaSnapMixin = (superclass) =>
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
