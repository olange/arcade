/**
 * TODO
 *
 * HackBoard:
 * + width, height properties
 * + renderViewBox(bgcolor, svgtres) uses width, height, used in render()
 * + shapes: square, circle, pacman
 * - hex shape
 * + render via dictionary
 * - buttons pan, zoom; move (clicked-on svg item), with arrow keys
 * - mat-button see accordion
 * - static vs. instance methods where these don't use the instance state?
 */

import {
  LitElement,
  customElement,
  html,
  svg,
  css,
  property,
} from 'lit-element';

import {
  square,
  squareX,
  squareText,
  circle,
  pacman,
} from './assets/hack-shapes';

/**
 * utilities ***********************************
 */

function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}
function cl_pretty(obj, title = '') {
  console.log(`⭕ ${title} ${JSON.stringify(obj, null, 2)}`);
}

/**
 * data ***********************************
 */

let dictionary = {
  //x: square(40, '#B22222'),
  x: squareX(40),
  M: square(40, '#000000FF'),
  '·': squareText(40, '·'),
  P: square(40, '#663399FF'),
  //'●': circle(40),
  '●': pacman(40, 60, 0),
  D: squareText(40, '👻'),
  default: squareText(40, '?!'),
};

const LAYOUT01 = `x·P●x··x
                  xxxxxxxx`;

const LAYOUT02 = `xxxxxxxxxxxxxxxx
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
  layout = LAYOUT03;

  @property({ type: Object })
  dictionary = dictionary;

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
   * convert code to shape per dictionary
   * @param {String} cellCode
   * @returns {SVGTemplateResult}
   */
  convert(cellCode) {
    return this.dictionary[cellCode] || squareText(40, cellCode);
  }

  /**
   * return svg shape wrapped in a group that translates it
   * @param { number } dx
   * @param { number } dy
   * @param { SVGTemplateResult } shape
   */
  static gTranslate(dx, dy, shape) {
    return svg`<g transform="translate(${dx},${dy})">${shape}</g>`;
  }

  /**
   * split the string on whitespace into lines then split into characters
   * @param {String} string
   * @returns {[[String]]}
   */
 static splitsplit(string) {
    return string.split(/\s+/).map((line) => {
      return line.split('');
    });
  }

  /**
   * convert cellCodeLine to array (row) of svgShapes
   * @param {[String]} cellCodeLine from splitsplit[i]
   * @returns {[SVGTemplateResult]}
   */
  shapesForCellCodeLine(cellCodeLine) {
    return cellCodeLine.map((elt, index) => {
      return HackBoard.gTranslate(index * 40, 0, this.convert(elt));
    });
  }

  /**
   * convert this.layout (per this.dictionary) to 2dim array of cell shapes
   */
  shapesForCellCodeLines() {
    let arr2dimOfCellCodes = HackBoard.splitsplit(this.layout);
    return arr2dimOfCellCodes.map((arr1dimOfCellCodes, index) => {
      let shapes1dim = this.shapesForCellCodeLine(arr1dimOfCellCodes);
      return HackBoard.gTranslate(0, index * 40, shapes1dim);
    });
  }

  /**
   * render the layout
   */
  renderLayout() {
    const mode = 2;

    switch (mode) {
      case 0: {
        // single cell
        let arrarr = HackBoard.splitsplit(this.layout);
        // cl_pretty(arrarr, 'arrarr');
        let cellCode = arrarr[3][0];
        let cellShape = this.convert(cellCode);
        // cl_pretty(cellShape, 'cellShape');
        return svg`${cellShape}`;
      }
      case 1: {
        // row of cells
        let arrarr = HackBoard.splitsplit(this.layout);
        let cellCodes = arrarr[1];
        // cl_pretty(cellCodes, 'cellCodes');
        let cellShapes1Dim = this.shapesForCellCodeLine(cellCodes);
        // cl_pretty(cellShapes1Dim, 'cellShapes1Dim');
        return svg`${cellShapes1Dim}`;
      }
      default:
      case 2: {
        // full 2Dim board
        let cellShapes2Dim = this.shapesForCellCodeLines();
        // cl_pretty(cellShapes2Dim, 'cellShapes2Dim');
        return svg`${cellShapes2Dim}`;
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

    return this.renderViewBox('#ffee88', this.renderLayout());
  }
}
