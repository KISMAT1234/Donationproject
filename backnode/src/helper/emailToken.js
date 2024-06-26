import sendEmail from "./sendEmail.js";
import Token from "../model/Token.js";


class emailToken{
    static async token({email,userId,reason,title, subject,info,template}){
          // console.log(email,userId, subject,info)
        // const userId  = user._id;
        // console.log(userId,'userid value')
        const token = await info.generateToken();
        // console.log(token, 'token value')
        
        const emailToken = await new Token({
          userId:userId._id,
          token:token
        }).save()

        // console.log(emailToken,'email token')
         await sendEmail({to:email,userId,title,reason:reason,subject:subject,token,template})
    }
}
export default emailToken;