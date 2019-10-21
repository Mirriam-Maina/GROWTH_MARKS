import passport from 'passport';
import config from '../configurations/config';
import auth from '../middleware/auth';
import User from '../models/users';
import FacebookTokenStrategy from 'passport-facebook-token';

passport.use( new FacebookTokenStrategy({
    clientID: config.facebookAuth.facebook_api_key,
    clientSecret: config.facebookAuth.facebook_api_secret
  },
  
  (accessToken, refreshToken, profile, done) => done(null, {accessToken, refreshToken, profile})
  ));


const facebookAuthController = (req, res) => new Promise((resolve, reject) => {
    passport.authenticate('facebook-token',{scope:'email'}, (err, data, info) => {
        if(err){
            if(err.oauthError){
                const oauthError = JSON.parse(err.oauthError.data);
                reject(oauthError.error.message);
            } else {
                reject(err);
            }
        } else {
            resolve({data, info});
        }
    })(req, res)
})


export const authenticateUser = async(req, res) => {
    const authData = await facebookAuthController(req, res);
    const { data: { profile: {_json: {email, first_name, last_name}} }} = authData;
    const userExists = await auth.checkIfExists(email);
    if(userExists){
        const user = await User.findOne({where: {'email':email}});
        const token = auth.createToken(email, user.id);
        user.token = token;
        return user;
    }
    const authenticatedUser =  await User.create({email, firstName: first_name, lastName: last_name })
    const token =  auth.createToken(email, authenticatedUser.id);
    authenticatedUser.token = token;
    return authenticatedUser;
}

