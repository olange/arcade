import { LitElement, html } from "lit-element";

export class ArcadeBooks extends LitElement {
  static get properties() {
    return {
      books: { type: Array },
    };
  }

  constructor() {
    super();

    this.books = [];
  }

  render() {
    console.log(`ArcadeBooks.render: ${this.books.length}`);
    return html`
      ArcadeBooks:
      <ul style='background-color: beige'>
        ${this.books.map(
          (book) => html`<arcade-book .book=${book}></arcade-book>`
        )}
      </ul>
    `;
  }
}

// ${this.books.map((book) => html` <li>${book.author}: ${book.title}</li>`)}

// ${this.books.map((book) => html`<arcade-book .book=${book}></arcade-book>`)}

class ArcadeBook extends LitElement {
  static get properties() {
    return {
      book: { type: Object },
    };
  }
  constructor() {
    super();
  }

  render() {
    return html`<li>${this.book.author}: ${this.book.title}</li>`;
  }
}

customElements.define("arcade-book", ArcadeBook);
