import { customElement, property, LitElement, html, css } from 'lit-element';

import { ArcadeApp } from './arcade-app';
import { DEditor } from './d-editor';

import { ButtonSvg } from './button-svg';
import { openWcLogo } from './open-wc-logo.js';

@customElement('arcade-dashboard')
export class ArcadeDashboard extends LitElement {
  @property() message = '';

  static get styles() {
    return css`
      :host {
        min-height: 100vh;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        font-size: calc(10px + 2vmin);
        color: #333333; /* text color */
        /*max-width: 960px;*/
        margin: 0 auto;
        text-align: center;
        background: linear-gradient(315deg, #ffee88, #ffffdd 100%);
      }

      /* Style the sidebar - fixed full height */
      .sidebar {
        height: 100%;
        width: 100px;

        display: flex;
        flex-direction: column;

        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: #c0c0c0;
        overflow-x: hidden;
        padding-top: 16px;
        justify-content: flex-start; /* primary = column ~ vert*/
        align-items: center; /* secondary = row ~ hor */
      }

      .menu-btn {
        text-decoration: none;
        font-size: 20px;
        stroke: black;
        width: 65px;
      }

      .menu-btn:hover {
        stroke: #bbffbb;
      }

      .main {
        display: flex;
        flex: 1;
        flex-direction: column; /* OK, this sends footnote to below the apps */

        justify-content: flex-start; /* primary = column ~ vert */
        align-items: center; /* secondary = row ~ hor */

        font-size: 16px;
        margin-left: 100px; /* Same as the width of the sidebar */
        padding: 0px 10px;
      }

      h1 {
        font-size: 2rem;
        color: gray;
      }
      h2 {
        font-size: 1.5rem;
        color: red;
      }

      .logo > svg {
        margin-top: 36px;
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      pre {
        font-size: calc(12px + 0.5vmin);
        text-align: left;
        background-color: white;
        margin: 1em;
        padding: 1em;
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'D-Arcade';
    this.selectedVariant = 'mobilegame';
  }

  static get properties() {
    return {
      title: { type: String },
      selectedVariant: { type: String },
    };
  }

  set selectedVariant(val) {
    let oldVal = this._appVariant;
    this._appVariant = val;
    console.log('selectedVariant', oldVal, val);

    this.requestUpdate('selectedVariant', oldVal);
  }

  get selectedVariant() {
    return this._appVariant;
  }

  handleButtonHit(e) {
    // alert(`You have clicked the ${e.detail} button.`);
    this.selectedVariant = e.detail;
    console.log('handleButtonHit', e.detail);
  }

  selectedAppVariant() {
    console.log('selectedAppVariant ', this.selectedVariant);
    switch (this.selectedVariant) {
      case 'bookshelf':
        return html`<arcade-app></arcade-app>`;
      case 'mobilegame':
        return html`<d-editor></d-editor>`;
      case 'burgericon':
        return html`
          <h3>Watch this space</h3>
          <h3>More fun coming soon</h3>
        `;
    }
  }

  render() {
    return html`
        <div class="sidebar">
            <div class="logo">
                ${openWcLogo}
                <h6>${this.title}</h6>
            </div>           
            <button-svg class="menu-btn" icon="bookshelf" @button-hit="${
              this.handleButtonHit
            }" >Books</button-svg>
            <button-svg class="menu-btn" icon="mobilegame" @button-hit="${
              this.handleButtonHit
            }" >Game</button-svg>  
            <button-svg class="menu-btn" icon="burgericon" @button-hit="${
              this.handleButtonHit
            }" ></button-svg>  
            <button-svg class="menu-btn" icon="" @button-hit="${
              this.handleButtonHit
            }" ></button-svg>  
        </div>
        <div class="main">
            <main>  
            ${this.selectedAppVariant()}
            </main>

            <p class="app-footer">
            Made with love at
            <a target="_blank" rel="noopener noreferrer" href="https://gongfu.io"
                >Gōng-fu I/O</a
            > </br>
            Built with
            <a target="_blank" rel="noopener noreferrer" href="https://www.snowpack.dev/"
            >Snowpack</a
            >
            </p>
        </div>
    `;
  }
}
