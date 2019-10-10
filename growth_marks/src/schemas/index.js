import userSchema from './users';
import articlesSchema from './articles';
import { gql } from 'apollo-server';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;


export default [linkSchema, userSchema, articlesSchema];