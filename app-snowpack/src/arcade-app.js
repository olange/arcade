import { customElement, property, LitElement, html, css } from "lit-element";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { openWcLogo } from "./open-wc-logo.js";

import { ToggleButton } from './toggle-button';
import { ArcadeJson } from './arcade-json';
import { ArcadeBooks } from './arcade-books';

console.info( "ARCADE› Instantiating Apollo Client…");
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

const BOOKS_QUERY = gql`
  query GetBooks {
    books {
      title
      rating
      author
    }
  }
`;

@customElement('arcade-app')
export class ArcadeApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      books: { type: Array },
      isOpen: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.title = "D-Arcade";
    this.books = undefined;
    this.isOpen = false;
  }

  connectedCallback() {
    super.connectedCallback();

    if (typeof this.books === "undefined") {
      this.fetchBooks();
    }
  }

  fetchBooks() {
    console.log( "ARCADE› fetchBooks() › Looking up available books…");
    client.query({ query: BOOKS_QUERY }).then((result) => {
      console.log( "ARCADE› fetchBooks() › Books fetched:", result.data.books);
      this.books = result.data.books;
    });
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
      }

      main {
        flex-grow: 1;
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

  render() {
    const htmlLoading = html`<p>Loading… possibly a network error</p>`;

    const htmlButton = html`<p>
      <toggle-button @toggle-click="${(e) => {
        this.isOpen = e.detail;
      }}"/></toggle-button>
    </p>`;

    const htmlBooks = html`<div>
      <arcade-json .books=${this.books}></arcade-json>
      <arcade-books .books=${this.books}></arcade-books>
    </div> `;

    const htmlButtonAndBooks = html`<div>
      ${htmlButton}
      ${this.isOpen ? htmlBooks : "Closed"} </br>
    </div>`;

    return html`
      <main>
        <div class="logo">${openWcLogo}</div>
        <h1>${this.title}</h1>
        ${!this.books ? htmlLoading : htmlButtonAndBooks}
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
    `;
  }
}
