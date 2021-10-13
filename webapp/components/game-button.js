import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('game-button')
export class GameButton extends LitElement {
  @property({ type: String }) name;

  static styles = css`
    :host {
      display: inline-block;
    }
    .button {
      color: white;
      background-color: var(--color-theme-primary, #1262b3);
      text-decoration: none;
      border-radius: 0.5rem;
      display: inline-block;
      padding: 0.5rem 1rem;
    }
  `;

  constructor() {
    super();
    this.name = undefined;
  }

  handleClick(gameName) {
    this.dispatchEvent(new CustomEvent('selected', { detail: gameName }));
  }

  render() {
    return html` <div
      class="button"
      role="button"
      aria-label="${this.name}"
      @click=${() => this.handleClick(this.name)}>
      <slot></slot>
    </div>`;
  }
}
