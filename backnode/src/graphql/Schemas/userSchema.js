import { gql } from 'apollo-server-express';

export default gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password:String!
    }

    type Query {
        users: [User]
    }



     type Mutation{
        Register(data: SignupInput!): User!
    }

    input SignupInput {
    username: String!
    email: String!
    password: String!
    }
`;