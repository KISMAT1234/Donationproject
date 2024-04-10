import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config();


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

async function sendEmail({to, subject, token}){
    // console.log(to, subject, token,'sendemail token')
    let mailDetails = {
        from : "lifecoding23@gmail.com",
        to: to,
        subject: subject,
        title: 'Activat your account',
        text:`please click the link below ${process.env.BASE_URL}/activateemail/${token}`,
    
    }

    const info = await transporter.sendMail(mailDetails)
    console.log(info);
}

export default sendEmail;
