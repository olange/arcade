/**
 * TODO
 *
 * HackBoard:
 * - width, height properties
 * - renderViewBox(bgcolor, svgtres) uses width, height, used in render()
 * + shapes: square, circle, pacman
 *
 * - buttons pan, zoom; move (clicked-on svg item), with arrow keys
 * - mat-button see accordion
 */

import {
  LitElement,
  customElement,
  html,
  svg,
  css,
  property,
} from 'lit-element';

import { square, circle0, circle, pacman } from './assets/hack-shapes';

/**
 * utilities ***********************************
 */
function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}
function cl_pretty(obj, title = '') {
  console.log(`${title} ${JSON.stringify(obj, null, 2)}`);
}

/**
 * SVG functions ***********************************
 */

/**
 * Return a `<svg...>...</svg>` svg box fragment
 *
 * @param {w} - box width px
 * @param {h} - box height px
 * @param {svg_array} - array of svg elements
 * @return {string} a svg `template` ready for insertion into a html page
 *
 */
function svgViewBox(w, h, bg_color, svg_array = []) {
  return `<svg width=${w} height=${h}" viewBox="0 0 ${w} ${h}" style="background-color:${bg_color}">
  ${svg_array}</svg>`;
}

/**
 *  Objects for use in tests ***********************
 */

function circle_00(cx, cy, r) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" style="stroke:black; stroke-width: 2;"/>`;
}

/**
 * Tests
 */

let testBox1 = svgViewBox(250, 100, '#f0e0f0', []);

// TODO render() should be similar to $$html() - it should just display textBox1 in this case

function circleL(cx, cy, r) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" style="stroke:green; stroke-width: 2;"/>`;
}
function squareL(s, fill) {
  // string
  return `<rect width="${s}" height="${s}" fill="${fill}"/>`;
}

function squareSvg(s, fill) {
  // SVGTemplateResult
  return svg`<rect width="${s}" height="${s}" fill="${fill}"/>`;
}

var dict = {
  x: squareL(40, '#B22222'),
  '·': squareL(40, '#000000FF'),
  P: squareL(40, '#663399FF'),
  '●': circleL(40),
  //'●': pacman.pacman(40, 60, 0),
};

var layout = `xxxxxxxxxxxxxxx
             xx·x●x····xx··x
             x··x·P··x●x·xxx
             xxMxxxx·xxx··xx
             xx·x●x····xx··x
             xx●···Fx··D···x
             xxxxxxxxxxxxxxx`;

/**
 * Return a group `g` that surrounds a shape and translates it
 *
 * @param {dx} - horizontal translation from orign px
 * @param {dx} - verticalal translation from orign px
 * @param {shape} - a svg element like circle or rect
 * @return {string} a `g` (group) element
 *
 */

var Board = class {
  constructor(value) {
    this.value = value;
    this.dict = {};
  }

  getValue() {
    return this.value;
  }

  done() {
    return undefined;
  }

  // text collection methods, chainable

  addDict(dict) {
    this.dict = dict;
    return this;
  }
  setLayout(layout) {
    this.value = layout;
    return this;
  }
  arrArrSplitIntoCells() {
    let regex = /\s+/;
    let lines = this.value.split(regex);
    this.value = lines.map((line) => line.split(''));
    return this;
  }

  // html/svg methods

  getHtmlValue() {
    return html`${this.value}`;
  }

  // static methods

  static shapeFor(string, dict) {
    return dict[string];
  }

  static shapesFor(stringArray, dict) {
    return stringArray.map((str) => {
      `${Board.shapeFor(str, dict)}`;
    });
  }

  /**
   * return svg shape wrapped in a group that translates it
   * @param { number } dx
   * @param { number } dy
   * @param { SVGTemplateResult } shape
   */
  static g_trans(dx, dy, shape) {
    return svg`<g transform="translate(${dx},${dy})">${shape}</g>`;
  }

  /**
   *
   * @param { number } sx
   * @param { number } sx
   * @param {  object} shapes - array of
   */
  static spread(sx, sy, shapes) {
    return html`shapes.map((shape, index) => { Board.g_trans(${index * sx},
    ${index * sy}, shape) })`;
  }

  // instance methods

  svgElementsFor(letters, dict) {
    return svg`letters.map((elt, index) => {
      return Board.g_trans(index * 40, 0, dict[elt]);
    })`;
  }
  svgViewBox(w, h, bg_color, svg_array = []) {
    return `<svg width=${w} height=${h}" viewBox="0 0 ${w} ${h}" style="background-color:${bg_color}">
                  ${svg_array}</svg>`;
  }

  // html/svg methods, chainable

  //   g_trans(dx, dy) {
  //     this.value = svg`<g transform="translate(${dx},${dy})">${this.value}</g>`;
  //     return this
  //   }

  g_trans(dx, dy) {
    this.value = Board.g_trans(dx, dy, this.value);
    return this;
  }
  makeSvgElementsForCells() {
    this.value = this.value.map((lineArray) => {
      return this.svgElementsFor(lineArray, this.dict);
    });
    return this;
  }
  makeSvgElementsForArrays() {
    this.value = this.svgViewBox(700, 300, '#e0e0f0', [
      this.value.map((elt, index) => {
        return Board.g_trans(0, index * 40, elt);
      }),
    ]);
    return this;
  }
};
var board = new Board();
board
  .setLayout(layout)
  .addDict(dict)
  .arrArrSplitIntoCells()
  .makeSvgElementsForCells()
  .makeSvgElementsForArrays()
  .done();

// ============================================

@customElement('hack-board')
export class HackBoard extends LitElement {
  @property({ type: Number })
  width = 1000;

  @property({ type: Number })
  height = 800;

  @property({ type: Number })
  cellSize = 50;

  @property({ type: String })
  layout = 'pacman-L01';

  static get styles() {
    return css`
      g.grid {
        fill: white;
        stroke: black;
      }
      g.cell.odd {
        fill: #ddffdd;
      }
      text {
        font-size: 2em;
      }
      .q-coord {
        stroke: green;
        fill: green;
      }
      .r-coord {
        stroke: blue;
        fill: blue;
      }
    `;
  }

  constructor() {
    super();
  }

  /**
   * render the layout ... starting simply
   */
  renderLayout() {
    let test = 2;
    // {
    //   let sq = svg`${square(this.cellSize, 'green')}`;
    //   return svg`${sq}`; // OK
    // }
    switch (test) {
      default:
      case 0: {
        let sq = svg`${square(this.cellSize, 'green')}`;
        cl_pretty(sq);
        return svg`${sq}`; // OK
      }
      case 1: {
        let cc = svg`${circle(this.cellSize, "red")}`;
        cl_pretty(cc);
        return svg`${cc}`; // OK
      }
      case 2: {
        let pm = pacman(this.cellSize, 60);
        cl_pretty(pm);
        return svg`${pm}`;

        // let sq = svg`${square(this.cellSize, 'green')}`;
        // cl_pretty(sq);
        // return svg`${sq}`; // OK
      }
    }
  }

  /** return a svg viewBox containing svgtres
   *
   * @param {String} bgcolor
   * @param {SVGTemplateResult} svgtres: svg to render
   * @returns {SVGTemplateResult}
   */
  renderViewBox(bgcolor, svgtres) {
    return html`<svg
      viewBox="0 0 ${this.width} ${this.height}"
      style="background-color:${bgcolor}"
    >
      ${svgtres}
    </svg>`;
  }

  render() {
    const width = 1000;
    const height = 800;
    console.log(`HackBoard › render: ${width}, ${height}`);

    var board = new Board();
    board
      .setLayout(layout)
      .addDict(dict)
      .arrArrSplitIntoCells()
      .makeSvgElementsForCells()
      .makeSvgElementsForArrays()
      .done();

    //console.log(`HackBoard › render  ${board.getValue()} `);

    let size = 100;
    let fill = 'white';

    let textSvg2 = svg`<text x="65" y="55" class="Rrrrr">Neat!</text>`; // it works, below
    let squareSvg3 = squareSvg(100, 'blue');

    let grrrrSvg4 = svg` <svg viewBox="0 0 240 80" xmlns="http://www.w3.org/2000/svg">
        <style>
            .small { font: italic 13px sans-serif; }
            .heavy { font: bold 30px sans-serif; }
            .Rrrrr { font: italic 40px serif; fill: red; }
        </style>

        <text x="20" y="35" class="small">My</text>
        <text x="40" y="35" class="heavy">cat</text>
        <text x="55" y="55" class="small">is</text>
        <text x="65" y="55" class="Rrrrr">grumpy!</text>
    </svg>`;

    // =====================================================
    function htmlBox_0(width, height, bgcolor, hsObject) {
      return html`<svg
        viewBox="0 0 ${width} ${height}"
        style="background-color:${bgcolor}"
      >
        ${hsObject}
      </svg>`;
    }

    // =====================================================
    // return various svg objects in a colored svg box

    /**
     * restarting tests ***********************************
     */

    let test = 1;

    switch (test) {
      case 1:
        //return this.renderViewBox('lightblue', squareSvg3);
        return this.renderViewBox('lightblue', this.renderLayout());

      //${renderLayout()}

      case 30: {
        let tr_textSvg2 = svg`<text x="65" y="55" class="Rrrrr">Neat!</text>`; // it works, below
        return htmlBox_0(width, height, 'yellow', tr_textSvg2);
      }
      case 31:
        let xxx = svg`${testBox1}`;
        cl_pretty(xxx, 'xxx');
        return htmlBox_0(width, height, 'lightgreen', {});
      case 20:
        return htmlBox_0(
          width,
          height,
          'lightgreen',
          svg`<text x="200" y="200" >My text starts at 200,200</text>`,
        );

      case 4:
        return htmlBox_0(width, height, 'lightblue', grrrrSvg4);
      case 5:
        let board5 = new Board(squareSvg(80, 'orange'));
        return htmlBox_0(width, height, 'white', board5.getValue());
      case 6:
        let board6 = new Board(squareSvg(80, 'teal'));
        board6.g_trans(400, 200);

        console.log(
          `HackBoard › render: out6 ${pretty(board6.getHtmlValue())} `,
        );
        return htmlBox_0(width, height, 'pink', board6.getHtmlValue());
      case 10:
        let out10 = Board.g_trans(400, 200, squareSvg(80, 'gray')); // OK
        console.log(`HackBoard › render: out10 ${pretty(out10)} `);

        //let out10 = Board.g_trans(400, 200, square(80, 'gray')); // NOPE
        return htmlBox_0(width, height, 'pink', out10);
      case 11:
        let out11 = Board.g_trans(400, 200, svg`${squareL(80, 'gray')}`); // NOPE
        console.log(`HackBoard › render: out11 ${pretty(out11)} `);

        return htmlBox_0(width, height, 'pink', out11);

      case 7:
        let str7 = 'x';
        let shape7 = Board.shapeFor(str7, dict);
        let out7 = html`${Board.g_trans(0, 100, shape7)}`;

        console.log(`HackBoard › render: shape7 ${pretty(shape7)} `);
        console.log(`HackBoard › render: out7 ${pretty(out7)} `);

        return htmlBox_0(width, height, 'lightgreen', out7);

      case 8:
        let strs8 = 'x··x·P··x●x·xxx'.split();
        let shapes8 = Board.shapesFor(strs8, dict);
        // let spread8 = Board.spread(40,0,shapes8)
        console.log(`HackBoard › render: strs8 ${typeof strs8} ${strs8}`);
        console.log(
          `HackBoard › render: shapes8 ${typeof shapes8} ${
            Object.keys(shapes8).length
          }  ${shapes8}`,
        );
        console.log(`HackBoard › render: shapes8 ${JSON.stringify(shapes8)} `);
        // console.log(`HackBoard › render: ${strs8}`);

        return htmlBox_0(width, height, 'orange', {});

      default:
        return htmlBox_0(width, height, 'gray', {});
    }

    // =====================================================
  }
}
