import { throwServerError } from "@apollo/client";
import { LitElement, html, css } from "lit-element";
import { ToggleButton } from "./toggle-button.js";

export class ArcadeJson extends LitElement {
  static get styles() {
    return css`
      pre {
        font-size: calc(12px + 0.5vmin);
        text-align: left;
        background-color: white;
        margin: 1em;
        padding: 1em;
      }
    `;
  }

  static get properties() {
    return {
      books: { type: Array },
      expanded: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.books = [];
    this.expanded = false;
  }

  render() {
    console.log(`ArcadeJson.render: ${this.books.length}`);

    const htmlButton = html`
      <toggle-button @toggle-click="${(e) => {
        this.expanded = e.detail;
      }}"/></toggle-button> 
    `;
    const htmlJson = html` <pre>${JSON.stringify(this.books, null, 2)}</pre> `;

    return html`
      ArcadeJson:
      <div style="background-color: beige">
        ${htmlButton} ${this.expanded ? htmlJson : ""}
      </div>
    `;
  }
}
