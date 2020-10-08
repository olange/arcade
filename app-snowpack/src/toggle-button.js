// ToggleButton web component
// Copyright © 2020 Rudolf Farkas @rudifa

import { customElement, property, LitElement, html, css } from "lit-element";

/**
 * example of use in a parent web component
 *     const htmlButton = html`<toggle-button activated @toggle-click="${(e) => {this.isOpen = e.detail;}}"></toggle-button>`;
 */

@customElement('toggle-button')
export class ToggleButton extends LitElement {
  constructor() {
    super();
    this.activated = false;
    // this.activeSymbol = "&#x25b2";
    // this.inactiveSymbol = "&#x25bc";
  }
  static get properties() {
    return {
      // activeSymbol: String,
      // inactiveSymbol: String,
      activated: {
        type: Boolean,
        reflect: true,
      },
    };
  }

  attributeChangedCallback(name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval);
    if (name === "activated")
      this.dispatchEvent(
        new CustomEvent("toggle-click", { detail: this.activated })
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
              console.log("ToggleButton", this.activated);
            }}">
            ${this.activated ? html`&#x25b2` : html`&#x25bc`}
          </button></br>
        </div>
      `;
  }
}
