import nodemailer from 'nodemailer';
import User from '../models/users';


const sendActivationEmail = async(email) => {

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, 
    auth: {
        user: "growthmarks@gmail.com", 
        pass: "mirriam565680!"
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