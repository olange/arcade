import { LitElement, svg, css } from "lit-element";

export class DBoard extends LitElement {

  static get properties() {
    return {
      rows: { type: Number },
      cols: { type: Number },
    };
  }
  static get styles() {
    return css`
      g.grid { fill: white; stroke: black; }
      g.cell.odd { fill: #ddffdd; }
      text { font-size: 2em; }
      .q-coord { stroke: green; fill: green }
      .r-coord { stroke: blue;  fill: blue }`;
  }

  constructor() {
    super();
    this.rows = 5;
    this.cols = 5;
  }

  boardCell( coord) {
    const { row, col } = coord;
    const isOddRow = Math.abs( row % 2) == 1;
    const isOddCol = Math.abs( col % 2) == 1;
    return svg`<g class="cell ${isOddRow ? 'odd' : 'even'}"
                  transform="translate( ${col*150}, ${isOddCol ? 87 : 0})">
      <polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon>
      <text dx="-0.7em" dy="0.4em"><tspan class="q-coord">${row}</tspan>, <tspan class="r-coord">${col}</tspan></text>
    </g>`;
  }

  boardRow( row, nbCols) {
    return [...Array( nbCols).keys()].map(
      ( i) => this.boardCell({ col: i, row: row }));
  }

  boardGrid( nbRows, nbCols) {
    return [...Array( nbRows).keys()].map(
      ( i) => svg`<g transform="translate( 0, ${i*173})">${this.boardRow( i, nbCols)}</g>`);
  }

  render() {
    // console.log( `DBoard › render( ${this.rows}, ${this.cols})`);
    const width = -100 + (1 + this.cols) * 150 + 2;
    const height = -87 + (1 + this.rows) * 173 + 4;
    return svg`<svg viewBox="-101 -88 ${width} ${height}">
      <g class="grid">
        ${this.boardGrid( this.rows, this.cols)}
      </g>
    </svg>`;
  }
}