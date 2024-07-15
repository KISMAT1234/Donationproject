import { gql } from 'apollo-server-express';

export default gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
    }

    type Query {
        users: [User]
    }

     type Mutation{
        createUser(username: String!, email: String!, password: String!): User
    }
    
`;

