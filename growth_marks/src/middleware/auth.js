import { AuthenticationError, ForbiddenError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/users';

const auth =  {
    createToken: (email, id) => {
        const token = jwt.sign({
            data: {email, id}
        }, 'secret', { expiresIn: '24h' });

        return token;
    },

    decodeToken: async(req) => {
        const token = req.headers.authorization;
        if(!token){
            throw new AuthenticationError('Token is required');
        }
        let user;
        jwt.verify(token, 'secret', (err, decoded) => {
            if(err){
                throw new AuthenticationError(err)
            }
            user = decoded;
        });
        const userExists = await User.findOne({where: {id: user.data.id}})
        if(userExists){
            const loggedInUser = {user, isLoggedIn: true };
            return loggedInUser;
        }
        throw new ForbiddenError('User does not exist');
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


