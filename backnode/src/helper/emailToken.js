import sendEmail from "./sendEmail.js";

class emailToken{
    static token({email, subject,info}){
    //   console.log(email, subject,info);
      const token = info.generateToken();
    //   console.log(token)
      sendEmail({to:email,subject:subject,token})
    }
}
export default emailToken;