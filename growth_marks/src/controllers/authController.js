import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';
import auth from '../middleware/auth';
import User from '../models/users';
import { sign } from 'crypto';

const authContoller = {
    signUp: async(data) => {
        const {email, password} = data;
        const passHash = auth.hashPassword(password);
        const userExists = await auth.checkIfExists(email);
        if(!userExists){
            const token =  auth.createToken(email);
            const newUser =  await User.create({...data, password: passHash})
            newUser.token = token;
            return newUser;
        }
    },

    signIn: async(data) => {
        const {email, password } = data;
        const signedInUser = await User.findOne({where: {'email':email}});
        if(signedInUser){
            const passwordMatch = await auth.passwordsMatch(password, signedInUser.password);
            if(passwordMatch){
                const token = auth.createToken(email);
                signedInUser.token = token;
                return signedInUser;
            }
            else {
                throw new AuthenticationError('User with that email and password does not exist');
            }
        }
        throw new AuthenticationError('User with that email and password does not exist');
    },

    getUser: async(data)=>{
        const { email } = data;
        const userData = await User.findOne({where: {email}});
        return userData;
    }

}

export default authContoller;