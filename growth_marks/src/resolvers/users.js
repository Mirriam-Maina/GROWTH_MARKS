import User from '../models/users';
import authController from '../controllers/authController';
import sequelize from '../models/config';

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


sequelize.sync();