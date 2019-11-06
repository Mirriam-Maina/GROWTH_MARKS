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

  extend type Query {
    facebookAuth: User!
  }

  input AuthInput {
    accessToken: String!
  }

  type activateMessage {
    email: String
    message: String
  }

  extend type Mutation {
    signUp(firstName: String, lastName: String, email: String! password: String! phoneNumber: String!): activateMessage,
    signIn(email: String! password: String!): User
    confirmAccount(token: String!): User
  }

  extend type Mutation {
    facebookAuth(accessToken: String): User
  }
`;