import { LitElement, html, css } from 'lit-element';
import { customElement, property } from 'lit-element';

@customElement('app-start')
export class AppStart extends LitElement {
  @property() href;

  static get styles() {
    return css`
      :host {
          display: inline-block;
          margin: 36px 0 18px; }
      .link {
        color: white; background-color: #1262b3;
        padding: 18px 36px; text-decoration: none; }
    `;
  }

  render() {
    return html`
      <a class="link" href="${this.href}">
        <slot></slot>
      </a>`;
  }
}