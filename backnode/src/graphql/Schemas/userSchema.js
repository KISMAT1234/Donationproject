import { gql } from 'apollo-server-express';

export default gql`
    type User {
        id: ID!
        username: String!
        email: String!
    }

    type Query {
        users: [User]
    }



     type Mutation{
        Signup(username: String!, email: String!, password: String!): User!
    }

    input SignupInput {
    username: String!
    email: String!
    password: String!
    }
`;