import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      success
      message
      data {
        userId
        username
        firstName
        lastName
        email
        status
        lastLoggedIn
      }
    }
  }
`;
