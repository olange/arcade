import { LitElement, customElement, svg, css } from 'lit-element';

@customElement('d-board')
export class DBoard extends LitElement {
  static get properties() {
    return {
      layout: { type: String },
    };
  }

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
    this.layout = 'pacman-L01';
    this.cells = [
      'xxxxxxxxxxxxxxx',
      'xx·x●x····xx··x',
      'x··x·P··x●x·xxx',
      'xxMxxxx·xxx··xx',
      'xx·x●x····xx··x',
      'xx●···Fx··D···x',
      'xxxxxxxxxxxxxxx',
    ];
    this.rows = this.cells.length;
    this.cols = Math.max(...this.cells.map((line) => line.length));
  }

  boardCell(coord) {
    const { row, col } = coord;
    const isOddRow = Math.abs(row % 2) == 1;
    const isOddCol = Math.abs(col % 2) == 1;
    const cellCode = this.cells[row][col] || '·';
    return svg`<g class="cell ${isOddRow ? 'odd' : 'even'}"
                  transform="translate( ${col * 150}, ${isOddCol ? 87 : 0})">
      <polygon points="100,0 50,-87 -50,-87 -100,-0 -50,87 50,87"></polygon>
      <text dx="-0.7em" dy="0.4em">${cellCode}</text>
    </g>`;
    // <tspan class="q-coord">${row}</tspan>, <tspan class="r-coord">${col}</tspan>
  }

  boardRow(row, nbCols) {
    return [...Array(nbCols).keys()].map((i) =>
      this.boardCell({ col: i, row: row }),
    );
  }

  boardGrid(nbRows, nbCols) {
    return [...Array(nbRows).keys()].map(
      (i) =>
        svg`<g transform="translate( 0, ${i * 173})">${this.boardRow(
          i,
          nbCols,
        )}</g>`,
    );
  }

  render() {
    // console.log( `DBoard › render( ${this.rows}, ${this.cols})`);
    const width = -100 + (1 + this.cols) * 150 + 2;
    const height = -87 + (1 + this.rows) * 173 + 4;
    return svg`<svg viewBox="-101 -88 ${width} ${height}" style="background-color:green">
      <g class="grid">
        ${this.boardGrid(this.rows, this.cols)}
      </g>
    </svg>`;
  }
}
