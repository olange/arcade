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
    const htmlButton = html`
      <toggle-button @toggle-click="${(e) => {
        this.expanded = e.detail;
      }}"/></toggle-button>
    `;

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
    const htmlButton = html`
      <toggle-button @toggle-click="${(e) => {
        this.expanded = e.detail;
      }}"/></toggle-button>
    `;

    const htmlDetail = html`<div>${this.book.author}</br>${this.book.rating}</div>`;

    return html`<div style='border: 1px solid'>
      ${this.book.title}</br> ${htmlButton} ${this.expanded ? htmlDetail : ""}
    </div>`;
  }
}

customElements.define("arcade-book", ArcadeBook);
