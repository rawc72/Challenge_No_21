const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Book {
    _id: String
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type User {
    _id: String
    username: String
    email: String
    password: String
    savedBooks: [Book]
    bookCount: Int
  }

  type Auth {
    token: String
    user: User
  }

  input CreateUserInput {
    username: String
    email: String
    password: String
  }

  input SaveBookInput {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Query {
    me(id: String, username: String): User
  }

  type Mutation {
    login(email: String, password: String): Auth
    addUser(input: CreateUserInput): Auth
    saveBook(input: SaveBookInput): User
    removeBook(bookId: String): User
  }
`;

module.exports = typeDefs;
