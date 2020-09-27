import { throwServerError } from "@apollo/client";
import { LitElement, html, css } from "lit-element";

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

    const htmlButton = this.htmlButton();
    const htmlJson = html` <pre>${JSON.stringify(this.books, null, 2)}</pre> `;

    return html`
      ArcadeJson:
      <div style="background-color: beige">
        ${htmlButton} ${this.expanded ? htmlJson : ""}
      </div>
    `;
  }

  // TODO move into a component
  htmlButton() {
    return html` <button
      id="mybutton"
      @click="${() => {
        this.expanded = !this.expanded;
        console.log(this.expanded);
      }}"
    >
      ${this.expanded ? html`&#x25b2` : html`&#x25bc`}
    </button>`;
  }
}
