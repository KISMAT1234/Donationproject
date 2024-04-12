import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import hbs from "nodemailer-express-handlebars"
import path from "path"


dotenv.config();
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);


const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_APP_PASSCODE,
    },
  });

  const hbsOptions = {
      viewEngine:{
        defaultLayout:false,
        partialsDir: path.resolve(__dirname,'../views'),
      },
      viewPath: path.resolve(__dirname,'../views'),

  }

  transporter.use('compile',hbs(hbsOptions))

async function sendEmail({to, subject, token, userId}){
    // console.log(to, subject, token,'sendemail token')
    let mailDetails = {
        from : "lifecoding23@gmail.com",
        to: to,
        subject: subject,
        template:'signupMessage',
        context:{
          title:'signup message',
          text:'Congratulation for register account',
          link:`${process.env.FRONTEND_URL}/users/${userId}/verify/${token}`,
        }
    
    }

    const info = await transporter.sendMail(mailDetails)
    // console.log(info);
}

export default sendEmail;
