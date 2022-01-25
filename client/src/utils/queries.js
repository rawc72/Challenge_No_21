import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Query($meId: String, $username: String) {
    me(id: $meId, username: $username) {
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
