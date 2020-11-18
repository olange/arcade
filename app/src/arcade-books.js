import { customElement, property, LitElement, html, css } from 'lit-element';

@customElement('arcade-books')
export class ArcadeBooks extends LitElement {
  @property({ type: Array })
  books = [];

  @property({ type: Boolean })
  expanded = false;

  constructor() {
    super();
  }

  render() {
    const htmlButton = html`
      <toggle-button @toggle-click="${(e) => {
        this.expanded = e.detail;
      }}"/></toggle-button>
    `;

    const htmlBooks = html`
      ${this.books.map(
        (book) => html`<arcade-book .book=${book}></arcade-book>`,
      )}
    `;

    return html`
      ArcadeBooks:
      <div>${htmlButton} ${this.expanded ? htmlBooks : ''}</div>
    `;
  }
}

@customElement('arcade-book')
class ArcadeBook extends LitElement {
  static get styles() {
    return css`
      .book {
        background-color: white;
        border: 1px solid lightgray;
      }
    `;
  }

  @property({ type: Object })
  book = undefined;

  @property({ type: Boolean })
  expanded = false;

  constructor() {
    super();
  }

  render() {
    const htmlButton = html`
      <toggle-button @toggle-click="${(e) => {
        this.expanded = e.detail;
      }}"/></toggle-button>
    `;

    const htmlDetail = html`<div>${this.book.author}</br>${this.book.rating}</div>`;

    return html`<div class="book">
      ${this.book.title}</br> ${htmlButton} ${this.expanded ? htmlDetail : ''}
    </div>`;
  }
}
