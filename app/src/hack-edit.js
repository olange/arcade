import { LitElement, customElement, html, css } from 'lit-element';
import { HackBoard } from './hack-board';

@customElement('hack-edit')
export class HackEdit extends LitElement {
  static get styles() {
    return css`
      :host {
        background: #fcfcfc;
      }
      main {
        margin: 0 2em;
      }
      .hack-board {
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
    this.title = 'Hack Edit';
  }

  render() {
    return html`
      <main>
        <h1>${this.title}</h1>
        <div class="hack-board">
          <hack-board></hack-board>
        </div>
      </main>
    `;
  }
}
