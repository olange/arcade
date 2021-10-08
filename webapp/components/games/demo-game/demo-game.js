import { LitElement, html, css } from 'lit';
import { customElement, state, query } from 'lit-element';
import * as PIXI from 'pixi.js';

@customElement('demo-game')
export class DemoGame extends LitElement {
  @state({ type: Object })
  app;

  @state({ type: Object })
  static pixiAppOptions = {
    backgroundColor: 0xffffff,
    antialias: true,
    autoDensity: true, // !!!
    resolution: 2,
  };

  @query('div#container')
  containerEl;

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
    console.log(
      `DemoGame › new Pixi.Application( ${clientWidth}x${clientHeight}px)`,
    );
    this.app = new PIXI.Application(options);
    this.containerEl.appendChild(this.app.view);

    this.app.loader
      .add('circle', '/assets/apple-touch-icon.png')
      .load((loader, resources) => {
        const circle = new PIXI.Sprite(resources.circle.texture);
        circle.x = clientWidth / 2;
        circle.y = clientHeight / 2;
        circle.anchor.x = 0.5;
        circle.anchor.y = 0.5;
        console.log(`DemoGame › makeCircle()`, circle);
        this.app.stage.addChild(circle);
        this.app.ticker.add(() => {
          circle.rotation += 0.01;
        });
      });
  }

  render() {
    return html`<div id="container"></div>`;
  }
}
