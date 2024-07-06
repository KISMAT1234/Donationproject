import { gql } from 'apollo-server-express';

export default gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        image: String
        role: String!
        slug: String!
        profileViews: Int!
        followers: [User]
        following: [User]
        isVerified: Boolean!
    }

    type Query {
        users: [User]
    }
`;

