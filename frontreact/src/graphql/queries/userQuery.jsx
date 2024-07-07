import { gql } from '@apollo/client';

export  const GET_USERS = gql`
  query GetUser {
    users {
      username
      email
    }
  }
`;