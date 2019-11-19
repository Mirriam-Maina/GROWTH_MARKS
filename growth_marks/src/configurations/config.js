import dotenv from 'dotenv';
dotenv.config()

const config = {
    facebookAuth: {
        "facebook_api_key"      :     process.env.FB_KEY,
        "facebook_api_secret"   :     process.env.FB_SECRET,
        "callback_url"          :     "http://localhost:4000/auth/facebook/callback",
        "use_database"          :      true,
        "host"                  :     "localhost",
        "username"              :     process.env.DB_USERNAME,
        "password"              :     process.env.DB_PASSWORD,
        "database"              :     process.env.DB_NAME
    },

    googleAuth: {
        
    }
};

export default config;