import { AuthenticationError } from 'apollo-server';
import auth from '../middleware/auth';
import User from '../models/users';
import errors from '../constants/errors';
import sendActivationEmail from '../middleware/activateAccount';

const authContoller = {
    signUp: async(data) => {
        const {email, password} = data;
        const passHash = auth.hashPassword(password);
        const userExists = await auth.checkIfExists(email);
        if(!userExists){
            const token =  auth.createToken(email);
            const newUser =  await User.create({...data, password: passHash, activateToken: token})
            const response = {email, message: errors.verifyAccountMessage}
            sendActivationEmail(email);
            return response;
        }
        else{
            throw new AuthenticationError('This user already exists')
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
    }, 

    confirmAccount: async(token) => {
        const userExists = await User.findOne({where: {'activateToken': token}});
        if(userExists){
            await User.update({isEnabled: true}, {where: {'activateToken': token}})
            return userExists;
        }
        throw new AuthenticationError('Incorrect verification token. Resend activation link');
    }

}

export default authContoller;