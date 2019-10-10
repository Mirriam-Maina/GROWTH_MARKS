import { gql } from 'apollo-server';
 
 export default gql`
  type Article {
    id: ID!
    title: String!
    body: String!
  }

  extend type Query {
    articles: [Article]
  }

  extend type Mutation {
    createArticle(title: String, body: String): Article!,
    updateArticle(title: String, body: String, id: ID!): Article!,
    deleteArticle(id: ID!): Boolean!
  }
`;