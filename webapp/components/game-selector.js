import { LitElement, html, css } from 'lit-element';
import { customElement, internalProperty, property } from 'lit-element';

@customElement('game-selector')
export class GameSelector extends LitElement {
  @property({ type: Array }) games;

  static get styles() {
    return css`
      :host {
        display: inline-block;
        margin: 36px 0 18px;
      }
      .button {
        color: white;
        background-color: #1262b3;
        padding: 18px 36px;
        text-decoration: none;
        border-radius: 9px;
        display: inline-block;
        margin: 4px;
      }
    `;
  }

  constructor() {
    super();
    this.games = [];
  }

  render() {
    return html`<p>Select your game</p>
    ${this.games.map((gameName) =>
    html`<div class="button" @click=${() => { this.dispatchEvent(new CustomEvent('selected', {detail: gameName})) }}>${gameName}</div>`)}`
  }
}
