import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation SignUp($username: String!, $email: String!, $password: String!) {
    Signup(username: $username, email: $email, password: $password) {
      username
      email
    }
  }

`;

