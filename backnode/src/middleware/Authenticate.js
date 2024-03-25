import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const authenticate = async (req,res,next) => {
    try{
    let token = req.headers.authorization;
    token = token.split(' ')[1];
    // console.log(token)

  if(token){
    let tokenCheck = await jwt.verify(token, 
        process.env. JWT_SECRET,
        
        function (err, decode) {
            if (err) {
              console.log("not verified");
              return responseHandler(res, 401, "validation token invalid");
            }
            // console.log(decode, 'decode info')
            let {id, role} = decode
            const userId = id
            const userRole = role
            req.body = {...req.body, userId, userRole};
            // console.log(req.body.userRole);
            next()
        }
        )
  }
}catch(err){
    console.log(err)
}  

}

export default authenticate;