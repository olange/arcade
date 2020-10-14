import { LitElement, html, css } from "lit-element";

export class DEditor extends LitElement {
  static get styles() {
    return css`
      main { margin: 0 2em; }`;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <main>
        <h1>D-Arcade</h1>
        <d-board rows="5" cols="8"></d-board>
      </main>
    `;
  }
}
