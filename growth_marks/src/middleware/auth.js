import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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
        const loggedInUser = {user_email, isLoggedIn: true };
        return loggedInUser;
    },

    checkIfExists: async (email) => {
        const userExists = await User.findOne({ where: {email} })
        if(userExists){
            throw new AuthenticationError('This user already exists')
        }
        return false;

    },

    hashPassword: (password) => {
        const salt = bcrypt.genSaltSync(10);
        const passHash = bcrypt.hashSync(password, salt);
        return passHash;
    },

    passwordsMatch: async(password, hash) => {
        return bcrypt.compareSync(password, hash);
    }


}

export default auth;


