import { LitElement, html, css } from 'lit-element';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { openWcLogo } from './open-wc-logo.js';

console.info( "ARCADE› Instantiating Apollo Client…");
const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

const BOOKS_QUERY = gql`
  query GetBooks {
    books {
        title
      rating
      author
    }
  }`;

console.info( "ARCADE› Looking up available books…");
client
  .query({ query: BOOKS_QUERY })
  .then( result => console.log( result));

export class ArcadeApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      books: { type: Array },
    };
  }

  constructor() {
    super();
    this.title = "D-Arcade";
    this.books = undefined;
  }

  connectedCallback() {
    super.connectedCallback();

    if( typeof this.books === "undefined") {
      this.fetchBooks();
    }
  }

  async fetchBooksTakeTwo() {
    const headers = new Headers();
    headers.append( 'Content-Type', 'application/json');
    headers.append( 'Accept', 'application/json');
    headers.append( 'Accept-Encoding', 'gzip, deflate');
    // headers.append( 'Connection', 'keep-alive');
    // headers.append( 'DNT', '1');
    // headers.append( 'Origin', 'http://localhost:4000');
    headers.append( 'authorization', 'b2xhbmdlQHBldGl0LWF0ZWxpZXIuY2g=');

    const query = '{ "query": "query {\n  books {\n    title\n  }\n}" }';
    const queryAsBlob = new Blob([ query ], { type : 'application/json' });

    const params = {
      method: 'POST',
      headers: headers,
      body: queryAsBlob,
      mode: 'cors',
      cache: 'default'
    };

    const response = await fetch( 'http://localhost:4000', params);
    const jsonResponse = await response.json();
    this.books = jsonResponse;
  }

  async fetchBooks() {
    const response = await fetch( 'https://api.openbrewerydb.org/breweries');
    const jsonResponse = await response.json();
    this.books = jsonResponse;
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex; flex-direction: column;
        align-items: center; justify-content: flex-start;
        font-size: calc(10px + 2vmin); color: #1a2b42;
        max-width: 960px; margin: 0 auto;
        text-align: center;
      }

      main { flex-grow: 1; }

      .logo > svg {
        margin-top: 36px;
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      pre {
        font-size: calc(12px + 0.5vmin);
        text-align: left;
        background-color:white;
        margin: 1em; padding: 1em;
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a { margin-left: 5px; }
    `;
  }

  render() {
    return html`
      <main>
        <div class="logo">${openWcLogo}</div>
        <h1>${this.title}</h1>

        ${this.books
          ? html`<pre>${JSON.stringify( this.books, null, 2)}</pre>`
          : html`<p>Loading…</p>`}
      </main>

      <p class="app-footer">
        Made with love at <a target="_blank" rel="noopener noreferrer" href="https://gongfu.io">Gōng-fu I/O</a>
      </p>
    `;
  }
}