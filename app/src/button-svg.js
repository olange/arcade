import { customElement, property, LitElement, html, css } from 'lit-element';

import {
  bookshelf,
  burgericon,
  hexaicon,
  mobilegame,
} from './assets/arcade-icons.js';

let defaultIcon = html`<svg viewBox="0 0 500 500">
  <circle cx="250" cy="250" r="180" fill-opacity="0" stroke-width="35" />
</svg>`;

@customElement('button-svg')
export class ButtonSvg extends LitElement {
  @property({ type: String })
  icon = 'unknown';

  static get styles() {
    return css`
      h1 {
        font-size: 4rem;
      }

      .wrapper {
        display: block;
        flex-direction: row;
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    console.log(`connected: ${this.icon}`);
  }

  selectedIcon() {
    switch (this.icon) {
      case 'bookshelf':
        return bookshelf;
      case 'mobilegame':
        return mobilegame;
      case 'hexaicon':
        return hexaicon;
      case 'burgericon':
        return burgericon;
      default:
        return defaultIcon;
    }
  }

  render() {
    return html`
      <div class="wrapper">
        <svg
          width="50"
          height="50"
          xmlns="http://www.w3.org/2000/svg"
          @click=${() => {
            console.log(`${this.icon}`);
            this.dispatchEvent(
              new CustomEvent('button-hit', { detail: this.icon }),
            );
          }}
        >
          ${this.selectedIcon()}
        </svg>
      </div>
    `;
  }
}
