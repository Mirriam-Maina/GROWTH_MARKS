import { gql } from 'apollo-server';
 
 export default gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    token: String!
  }

  extend type Query {
    users: [User]
  }

  extend type Mutation {
    signUp(firstName: String, lastName: String, email: String! password: String! phoneNumber: String!): User,
    signIn(email: String! password: String!): User
  }
`;