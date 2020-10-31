import { LitElement, customElement, html, css } from 'lit-element';
import { DBoard } from './d-board';

@customElement('d-editor')
export class DEditor extends LitElement {
  static get styles() {
    return css`
      :host {
        background: #fcfcfc;
      }
      main {
        margin: 0 2em;
      }
      .d-board {
        width: 80vW;
      }
      h1 {
        font-size: 1.5rem;
        color: gray;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'D-Arcade Editor';
  }

  render() {
    return html`
      <main>
        <h1>${this.title}</h1>
        <div class="d-board">
          <d-board></d-board>
        </div>
      </main>
    `;
  }
}
