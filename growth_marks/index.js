import { ApolloServer } from 'apollo-server';
import typeDefs from './src/schemas/index';
import resolvers from './src/resolvers/index';

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: async({req, res}) => {
      return { req, res};
  },
  formatError: (err) => {
    if (err.message.startsWith("Database Error: ")) {
      return new Error('Internal server error');
    }
    return err;
  },
});


server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});