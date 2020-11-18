import { customElement, property, LitElement, html, css } from 'lit-element';
import { ArcadeBook } from './arcade-book';

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
    console.log('ArcadeBooks.render', this.books);

    const htmlButton = html`
      <toggle-button @toggle-click="${(e) => {
        this.expanded = e.detail;
      }}"/></toggle-button>
    `;

    const htmlBooks = html`
      ${this.books.map(
        (book, index) =>
          html`<arcade-book .book=${book} .index=${index}></arcade-book>`,
      )}
    `;

    return html`
      ArcadeBooks:
      <div>${htmlButton} ${this.expanded ? htmlBooks : ''}</div>
    `;
  }
}
