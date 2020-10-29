import { customElement, property, LitElement, html, css } from 'lit-element';
import { gql } from '@apollo/client';
import { client } from './arcade-app';

const UPDATE_BOOK = gql`
  mutation UpdateBook($bookId: Int) {
    bookLike(bookId: $bookId) {
      title
      author
      likes
    }
  }
`;

@customElement('arcade-book')
export class ArcadeBook extends LitElement {
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

  updateBook() {
    console.log('ArcadeBook.updateBook', this.index);
    client
      .mutate({ mutation: UPDATE_BOOK, variables: { bookId: this.index } })
      .then((result) => {
        console.log(
          'client.mutate: UPDATE_BOOK => result.data:',
          result.data.bookLike,
        );
        this.book = result.data.bookLike;
      });
  }

  render() {
    const htmlButton = html`
      <toggle-button @toggle-click="${(e) => {
        this.expanded = e.detail;
      }}"/></toggle-button>
    `;

    const htmlLikeButton = html`
      <toggle-button activeSymbol="🧡" inactiveSymbol="🧡" @toggle-click="${(
        e,
      ) => {
        this.updateBook();
      }}"/></toggle-button>
    `;

    const htmlDetail = html`<div style="font-size: 20px;">
      ${this.book.author}</br>
      <div style="font-size: 14px;">
        ${htmlLikeButton} ${this.book.likes}
      </div>
    </div>`;

    return html`<div class="book">
      ${this.book.title}</br> ${htmlButton} ${this.expanded ? htmlDetail : ''}
    </div>`;
  }
}
