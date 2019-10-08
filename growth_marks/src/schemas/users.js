const { gql } = require('apollo-server');
 
 export default gql`
  type User {
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
    token: String!
  }

  type Query {
    users: [User],
    authenticationError: String
  }

  type Mutation {
    signUp(firstName: String, lastName: String, email: String! password: String! phoneNumber: String!): User,
    signIn(email: String! password: String!): User
  }
`;