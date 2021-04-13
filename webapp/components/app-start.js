import { LitElement, html, css } from 'lit-element';
import { customElement, internalProperty, property } from 'lit-element';
import firebase from 'firebase/app';
import { GameSelector } from './game-selector';

@customElement('app-start')
export class AppStart extends LitElement {
  @property({ type: String }) href;
  @internalProperty({ type: Boolean }) loading;

  static get styles() {
    return css`
      :host {
        display: inline-block;
        margin: 36px 0 18px;
      }
      .link {
        color: white;
        background-color: #1262b3;
        padding: 18px 36px;
        text-decoration: none;
        border-radius: 9px;
      }
      .unresolved {
        background-color: #dedede;
      }
    `;
  }

  constructor() {
    super();
    this.loading = true;
    this._data = undefined;
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
    console.log( 'app-start › fetchData() › firestore().collection("games").get()', this._data);
    this.loading = false;
  }
 
  handleSelected(e) {
    console.log('handleSelected', e.detail);
    alert('selected: ' + e.detail);
  }

  render() {
    if( this.loading) {
      return html`<a class="link unresolved">Loading available games…</a>`
    }
 
    let gameNames = Object.entries(this._data).map(([ gameId, gameObj]) => gameObj.name);

    console.log("AppStart.render gameNames", gameNames, JSON.stringify(gameNames));

    return html`<game-selector games=${JSON.stringify(gameNames)} @selected="${this.handleSelected}"></game-selector>`;
  }
}
