import { LitElement, customElement, html, css } from 'lit-element';

import { Application, Graphics } from 'pixi.js';
import {
  makeCircle,
  makeHexaGrid,
  makeHexagon,
  makeSquare,
} from './pixi-graphics';

const aw = 1000;
const ah = 600;
const app = new Application({
  width: aw,
  height: ah,
  backgroundColor: 0x304050,
});

// ---------------------------------------------
// draw circles, squares, hexagons and hexagrids
// ---------------------------------------------

app.stage.addChild(makeCircle(40, 40, 40, 0xff0000));
app.stage.addChild(makeCircle(40, 100, 40, 0x33cc33));

const ss = 80;
app.stage.addChild(makeSquare(0, 0, ss, null, 0xffffff));
app.stage.addChild(makeSquare(0, ah - ss, ss, null, 0xffffff));
app.stage.addChild(makeSquare(aw - ss, ah - ss, ss, null, 0xffffff));
app.stage.addChild(makeSquare(aw - ss, 0, ss, null, 0xffffff));

// ---------------
// draw hexa grids
// ---------------
let r = 40;

for (let hexagon of makeHexaGrid(5, 6, 0, 0, r, true, null, 0x00aa00)) {
  app.stage.addChild(hexagon);
}

for (let hexagon of makeHexaGrid(
  6,
  5,
  10 * r,
  0,
  r,
  false,
  0xffa500,
  0xff0000,
)) {
  app.stage.addChild(hexagon);
}

// ----------------
//    pixi-hello
// ----------------
@customElement('pixi-hello')
export class PixiHello extends LitElement {
  static get styles() {
    return css`
      :host {
        background: #fcfcfc;
      }
      main {
        margin: 0 2em;
      }
      .pixi-hello {
        width: 80vw; /* pct of viewport width */
      }
      h1 {
        font-size: 1.5rem;
        color: gray;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'PixiHello';
  }

  firstUpdated() {
    super.firstUpdated();
    this.renderRoot.appendChild(app.view);
    console.log('this.renderRoot=', this.renderRoot);
  }

  render() {
    return html`
      <main id="main">
        <h1>${this.title}</h1>
        <div class="hello" id="hello">
          <!--
            -->
        </div>
      </main>
    `;
  }
}

// ------------------------------------
// PIXI
// function makeCircle(x, y, r, fillcolor) {
//   let circle = new Graphics();
//   circle.lineStyle(1, 0x000000);
//   circle.beginFill(fillcolor);
//   circle.drawCircle(x, y, r);
//   circle.endFill();
//   return circle;
// }
