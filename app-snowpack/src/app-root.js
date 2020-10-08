import { customElement, property, LitElement, html, css } from 'lit-element';
import { ArcadeApp } from './arcade-app';

@customElement('app-root')
export class AppRoot extends LitElement {
  // @property() message = 'Learn LitElement';

  static get styles() {
    return css`
      h1 {
        font-size: 2rem;
      }
      .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        //height: 100vh;
        background-color: #2196f3;
        background: linear-gradient(315deg, #b4d2ea 0%, #2196f3 100%);
        font-size: 24px;
      }
      .link {
        color: white;
      }
    `;
  }

  render() {
    return html`
      <div class="wrapper">

        <arcade-app></arcade-app>

      </div>
    `;
  }
}
