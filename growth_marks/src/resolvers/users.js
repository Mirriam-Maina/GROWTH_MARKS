import authController from '../controllers/authController';

export default {
    Query: {
      users: () => users,
    },

    Mutation: {
        signUp: async(parent, {firstName, lastName, email, password, phoneNumber}) =>{
          const createdUser = authController.signUp({firstName, lastName, email, password, phoneNumber});
          return createdUser;
        },
        signIn: async(parent, { email, password})=> {
          const signedInUser = authController.signIn({email, password});
          return signedInUser;
        }
    }
  };