import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        password
        savedBooks {
          _id
          authors
          description
          bookId
          image
          link
          title
        }
        bookCount
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($input: CreateUserInput) {
    addUser(input: $input) {
      token
      user {
        _id
        username
        email
        password
        savedBooks {
          _id
          authors
          description
          bookId
          image
          link
          title
        }
        bookCount
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($input: SaveBookInput) {
    saveBook(input: $input) {
      _id
      username
      email
      password
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
      bookCount
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: String) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      password
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
      bookCount
    }
  }
`;
