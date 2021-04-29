import { LitElement, html, css } from 'lit-element';
import { customElement, internalProperty, property } from 'lit-element';
import firebase from 'firebase/app';
import { GameButton } from './game-button';
import { DemoGame } from './demo-game';

@customElement('app-start')
export class AppStart extends LitElement {
  @property({ type: String }) href;
  @internalProperty({ type: Boolean }) loading;
  @internalProperty({ type: String }) selectedGameId;

  static get styles() {
    return css`
      :host {
        display: inline-block;
        margin-bottom: -0.5em;
      }
      .link {
        color: white;
        background-color: var(--color-theme-primary, #1262b3);
        padding: 0.5rem 1rem;
        text-decoration: none;
        border-radius: 0.5rem;
      }
      .unresolved {
        background-color: var(--color-text-tertiary, rgba(0,0,0,0.1));
      }
      game-button {
        margin-right: 0.5rem;
        margin-bottom: 1rem;
      }
    `;
  }

  constructor() {
    super();
    this.loading = true;
    this._data = undefined;
    this.selectedGameId = null;
  }

  firstUpdated() {
    console.log( "app-start › firstUpdated() called.");
    if( !this._data) {
      this._data = {};
      // NOTE: fetchData() is actually a promise, not a synchronous callback
      this.retryUntilFirebaseAvailable( this.fetchData);
    }
  }

  retryUntilFirebaseAvailable( callback) {
    console.log( "app-start › retryUntilFirebaseAvailable() called.");
    if( firebase.apps.length === 0) {
      console.log( 'app-start › retryUntilFirebaseAvailable() › Firebase not yet initialized, retrying fetching in 100ms…');
      setTimeout(() => { this.retryUntilFirebaseAvailable( callback); }, 100);
    } else {
      // fire & forget, that is, don't await the callback, if it was async;
      // it will trigger re-rendering, by changing the `loading` property
      callback.call( this);
    }
  }

  async fetchData() {
    console.log( "app-start › fetchData() called.");
    const querySnapshot = await firebase.firestore().collection("games").get();
    querySnapshot.forEach(( doc) => {
      this._data[ doc.id] = doc.data();
    });
    // simulate another game list element
    this._data['demoGame'] = { 'name': 'Demo Game' };
    console.log( 'app-start › fetchData() › firestore().collection("games").get()', this._data);
    this.loading = false;
  }

  handleSelected(e) {
    console.log('handleSelected', e.detail);
    //alert('selected: ' + e.detail);
    this.selectedGameId = e.detail;
  }

  render() {
    if( this.loading) {
      return html`<a class="link unresolved">Loading available games…</a>`
    }

    return html`
      <slot></slot>
      ${Object.entries(this._data).map(([ gameId, gameObj]) => html`
        <game-button name="${gameId}" @selected="${this.handleSelected}">
          ${gameObj.name}
        </game-button>
      `)}
      ${this.selectedGameId == 'demoGame' ? html`<demo-game></demo-game>` : html``}
    `;
  }
}