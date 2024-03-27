import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const authenticate = async (req,res,next) => {
    try{
    let token = req.headers.authorization;
    if(token){
      token = token.split(' ')[1];
    }
    // console.log(token,'token came')


  if(token){
    let tokenCheck = await jwt.verify(token, 
        process.env. JWT_SECRET,
        
    function (err, decode) {
        if (err) {
          console.log("not verified");
          return res.status(500).json(err);
        }
        // console.log(decode, 'decode info')
        let {id, role} = decode
        const userId = id
        const userRole = role
        // const {a,b,c}=req.body;
        req.user = {...req.user, userId, userRole};
        console.log(req.user.userId,'auth id');
        next()
    }
        )
  }
}catch(err){
    console.log(err)
}  

}

export default authenticate;