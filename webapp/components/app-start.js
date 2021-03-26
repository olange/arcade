import { LitElement, html, css } from 'lit-element';
import { customElement, internalProperty, property } from 'lit-element';
import firebase from 'firebase/app';

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
    const timestamp = () => `[${new Date().toISOString()}]`
    console.log(timestamp(), "AppStart.firstUpdated")
    if( !this._data) {
      this._data = {};
      this.fetchData();
    }
  }

  async fetchData() {
   if (firebase.apps.length > 0) {
      this.loading = true;
      const querySnapshot = await firebase.firestore().collection("games").get();
      querySnapshot.forEach(( doc) => {
      console.log( `firestore › games › doc( ${doc.id}) => { name: ${doc.data().name} }`);
        this._data[ doc.id] = doc.data();
      });
      this.loading = false;
    } else {
      console.log("fetchData", "*** firebase not yet initialized");
      setTimeout(() => { this.fetchData() }, 1);
    }
  }

  render() {
    if( this.loading) {
      return html`<a class="link unresolved">Loading available games…</a>`
    }

    return Object.entries( this._data).map(([ gameId, gameObj]) =>
      html`<a class="link" href="${this.href}#${gameId}">${gameObj.name}</a> `)
  }
}
