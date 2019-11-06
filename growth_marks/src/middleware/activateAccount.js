import nodemailer from 'nodemailer';
import User from '../models/users';
import dotenv from 'dotenv';

dotenv.config();


const sendActivationEmail = async(email) => {

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true, 
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD
    }
});

const activateToken = await User.findAll({
    where: {email},
    attributes: ['activateToken']
});

console.log()

let emailData ={
        from: '"Growth Marks 👻" <growthmarks@gmail.com>', 
        to: `${email}`,
        subject: 'Welcome to Growth Marks',  
        html: `<b>Welcome to growth marks. Click on the link below to activate your account  <a href="http://localhost:4000/${activateToken[0].dataValues.activateToken}">Link</a></b>`
    };

return transporter.sendMail(emailData)
}

export default sendActivationEmail;