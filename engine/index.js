const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
    likes: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    book(bookId: Int): Book
  }

  type Mutation {
    bookLike(bookId: Int): Book
  }
`;

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    likes: 0,
  },
  {
    title: "Jurassic Park",
    author: "Michael Crichton",
    likes: 0,
  },
  {
    title: "The Plague",
    author: "Albert Camus",
    likes: 0,
  },
  {
    title: "L'Assomoir",
    author: "Emile Zola",
    likes: 0,
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
    book: (obj, args) => books[args.bookId],
  },
  Mutation: {
    bookLike: (root, args) => {
      console.log("bookLike:", args, args.bookId);
      books[args.bookId].likes++;
      return books[args.bookId];
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
