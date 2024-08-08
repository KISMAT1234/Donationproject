import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
  mutation SignUp($formData: SignupInput!) {
    Register(data: $formData) {
      username
      email
      password
    }
  }

`;

