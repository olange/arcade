import { LitElement, html, css } from "lit-element";

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
  
    render() {
      return html`
        <style>
          /* local DOM styles go here */
          :host {
            display: inline-block;
          }
        </style>
        <!-- local DOM goes here -->
        <div
          >Not much ${this.activated ? "more" : ""} here yet.</br>
          <button
            id="mybutton"
            @click="${() => {
              this.activated = !this.activated;
              console.log(this.activated);
            }}"
          >
            ${this.activated ? html`&#x25b2` : html`&#x25bc`}
          </button></br>
        </div>
      `;
    }
  }
  