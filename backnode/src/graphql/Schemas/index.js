import { gql } from 'apollo-server-express';
import userSchema from './userSchema.js';

const rootSchema = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;

export default [rootSchema, userSchema];