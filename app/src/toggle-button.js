// ToggleButton web component
// Copyright © 2020 Rudolf Farkas @rudifa

import { customElement, property, LitElement, html, css } from 'lit-element';

/**
 * example of use in a parent web component
 *     const htmlButton = html`<toggle-button activated @toggle-click="${(e) => {this.isOpen = e.detail;}}"></toggle-button>`;
 */

@customElement('toggle-button')
export class ToggleButton extends LitElement {
  @property({ type: Boolean, reflect: true })
  activated = false;

  @property({ type: String })
  activeSymbol = '▲';

  @property({ type: String })
  inactiveSymbol = '▼';

  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
    if (name === 'activated')
      this.dispatchEvent(
        new CustomEvent('toggle-click', { detail: this.activated }),
      );
  }

  render() {
    return html`
        <style>
          /* local DOM styles go here */
          :host {
            display: inline-block;
          }
        </style>
        <!-- local DOM goes here -->
        <div>
          <button
            id="mybutton"
            @click="${() => {
              this.activated = !this.activated;
            }}">
            ${
              this.activated
                ? html`${this.activeSymbol}`
                : html`${this.inactiveSymbol}`
            }
          </button></br>
        </div>
      `;
  }
}
