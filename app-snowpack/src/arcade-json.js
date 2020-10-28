import { customElement, property, LitElement, html, css } from "lit-element";

@customElement('arcade-json')
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

  @property({ type: Array })
  books = [];

  @property({ type: Boolean })
  expanded = false;

  constructor() {
    super();
  }

  render() {
    const htmlButton = html`
      <toggle-button @toggle-click="${(e) => {
        this.expanded = e.detail;
      }}"/></toggle-button>
    `;
    const htmlJson = html`<pre>${JSON.stringify(this.books, null, 2)}</pre> `;

    return html`
      Data:
      <div>
        ${htmlButton} ${this.expanded ? htmlJson : ""}
      </div>
    `;
  }
}
