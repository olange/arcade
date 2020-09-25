import { LitElement, html, css } from "lit-element";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { openWcLogo } from "./open-wc-logo.js";

import { ArcadeBooks } from "./arcade-books.js";

console.info("ARCADE› Instantiating Apollo Client…");
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

    if (typeof this.books === "undefined") {
      this.fetchBooks();
    }
  }

  async fetchBooks1() {
    const response = await fetch("https://api.openbrewerydb.org/breweries");
    const jsonResponse = await response.json();
    this.books = jsonResponse;
  }

  fetchBooks() {
    console.log("fetchBooks: Looking up available books…");
    client.query({ query: BOOKS_QUERY }).then((result) => {
      console.log("result:", result);
      console.log("result.data:", result.data);
      console.log("result.data.books:", result.data.books);
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
    console.log(`ArcadeApp.render: ${this.books.length}`);
    const htmlBooks = html`<pre>${JSON.stringify(this.books, null, 2)}</pre>`;
    return html`
      <main>
        <div class="logo">${openWcLogo}</div>
        <h1>${this.title}</h1>
        ONE ${this.books ? htmlBooks : html`<p>Loading…</p>`}
        TWO
        <arcade-books .books=${this.books}></arcade-books>
      </main>

      <p class="app-footer">
        Made with love at
        <a target="_blank" rel="noopener noreferrer" href="https://gongfu.io"
          >Gōng-fu I/O</a
        >
      </p>
    `;
  }
}
