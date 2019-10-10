import { AuthenticationError } from 'apollo-server';
import auth from '../../middleware/auth';
import User from '../users';

const authContoller = {
    signUp: async(data) => {
        const {email} = data;
        const userExists = await auth.checkIfExists(email);
        if(!userExists){
            const token =  auth.createToken(email);
            const newUser =  await User.create(data)
            newUser.token = token;
            return newUser;
        }
    },

    signIn: async(data) => {
        const {email, password } = data;
        const signedInUser = await User.findOne({where: {'email':email, 'password':password}});
        if(!signedInUser){
            throw new AuthenticationError('User with that email and password does not exist');
        }
        const token = auth.createToken(email);
        signedInUser.token = token;
        return signedInUser;
    },

    getUser: async(data)=>{
        const { email } = data;
        const userData = await User.findOne({where: {email}});
        return userData;
    }

}

export default authContoller;