import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getUsers {
    users {
      userId
      firstName
      lastName
      username
      email
      status
    }
  }
`;

