import { throwServerError } from "@apollo/client";
import { LitElement, html } from "lit-element";

export class ArcadeBooks extends LitElement {
  static get properties() {
    return {
      books: { type: Array },
      expanded: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.books = [];
    this.expanded = false;
  }

  render() {
    console.log(`ArcadeBooks.render: ${this.books.length}`);
    const htmlButton = this.htmlButton();
    const htmlBooks = html`
      ${this.books.map(
        (book) => html`<arcade-book .book=${book}></arcade-book>`
      )}
    `;

    return html`
      ArcadeBooks:
      <div style="background-color: beige">
        ${htmlButton} ${this.expanded ? htmlBooks : ""}
      </div>
    `;
  }

  // TODO move into a component
  htmlButton() {
    return html` <button
      id="mybutton"
      @click="${() => {
        this.expanded = !this.expanded;
        console.log(this.expanded);
      }}"
    >
      ${this.expanded ? html`&#x25b2` : html`&#x25bc`}
    </button>`;
  }
}

class ArcadeBook extends LitElement {
  static get properties() {
    return {
      book: { type: Object },
      expanded: { type: Boolean },
    };
  }
  constructor() {
    super();
    this.expanded = false;
  }

  render() {
    const htmlButton = this.htmlButton();
    const htmlDetail = html`<div>${this.book.author}</br>${this.book.rating}</div>`;
    return html`<div style='border: 1px solid'>
      ${this.book.title}</br> ${htmlButton} ${this.expanded ? htmlDetail : ""}
    </div>`;
  }

  // TODO move into a component
  htmlButton() {
    return html` <button
      id="mybutton"
      @click="${() => {
        this.expanded = !this.expanded;
        console.log(this.expanded);
      }}"
    >
      ${this.expanded ? html`&#x25b2` : html`&#x25bc`}
    </button>`;
  }
}

customElements.define("arcade-book", ArcadeBook);
