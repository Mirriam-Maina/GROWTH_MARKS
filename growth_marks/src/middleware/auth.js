import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import User from '../models/users';

const auth =  {
    createToken: (email) => {
        const token = jwt.sign({
            data: email
        }, 'secret', { expiresIn: '1h' });

        return token;
    },

    decodeToken: (token) => {
        let user_email;
        jwt.verify(token, 'secret', (err, decoded) => {
            if(err){
                throw new AuthenticationError(err)
            }
            user_email = decoded;

        });
        return user_email; 
    },

    checkIfExists: async (email) => {
        const userExists = await User.findOne({ where: {email} })
        if(userExists){
            throw new AuthenticationError('This user already exists')
        }
        return false;

    }
}

export default auth;


