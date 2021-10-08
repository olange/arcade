import { LitElement, html, css } from 'lit';
import { customElement, state, query } from 'lit-element';
import * as PIXI from 'pixi.js';
import { AppPixi } from './app-pixi.js';

@customElement('hexa-game')
export class HexaGame extends LitElement {
  @state({ type: Object }) app;

  @state({ type: Object })
  static pixiAppOptions = {
    backgroundColor: 0xbbccee,
    antialias: true,
    autoDensity: true, // !!!
    resolution: 2,
  };

  @query('div#container') containerEl;

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100vh;
      }
      div#container {
        width: 100%;
        height: 100%;
      }
    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    super.firstUpdated();
    const { clientWidth, clientHeight } = this.containerEl;
    const options = {
      ...this.pixiAppOptions,
      width: clientWidth,
      height: clientHeight,
    };
    console.log(`AppGame › new Application( ${clientWidth}x${clientHeight}px)`);
    this.app = new AppPixi(options);
    this.containerEl.appendChild(this.app.view);
  }

  render() {
    return html`<div id="container"></div>`;
  }
}
