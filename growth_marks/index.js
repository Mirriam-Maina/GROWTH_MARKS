const { ApolloServer } = require('apollo-server');
import typeDefs from './src/schemas/index';
import resolvers from './src/resolvers/index';

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});