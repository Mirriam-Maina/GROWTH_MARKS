import authController from '../controllers/authController';
import { facebookAuthController, authenticateUser } from '../controllers/socialAuthController';

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
        },
        facebookAuth: async(parent, {accessToken}, {req, res}) => {
          req.body = {
            ...req.body,
            access_token: accessToken
          };
          const user = await authenticateUser(req, res);
          return user;
        }
    }
  };