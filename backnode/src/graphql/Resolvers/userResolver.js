import User from "../../model/Userprofile.js";
import Handler from "../../logger/ResponseHandler.js";
import slugify from "slugify";
const responseInstance = new Handler();

export default {
    Query: {
        users: async () => {
            try{
               const userData =  await User.find()
            //    return responseInstance.responseHandler(res,500,'data fetch successfull',userData)
               return userData

            }catch(err){
            console.log(err)
            // return responseInstance.responseHandler(res,500,'Backend server error')
        }
        }
    },

    Mutation: {
      Register: async (_, { data }) => {
        console.log(data,'data')
        const { username, email, password } = data;
        const user = new User({ username, email, password });
        user.slug = slugify(user.username, { lower: true });
        try {
          await user.save();  // Save user to the database
          const email = user.email
          const userId = user._id;
          if(user){
              let value = emailToken.token({
                  email,
                  userId,
                  reason:'verify',
                  title:'Verify Account',
                  subject:'Link to verify your account',
                  info:user,
                  template:'signupMessage'
              })
          }else{
              return responseInstance.responseHandler(res,501,'User not found')
          }
          return responseInstance.responseHandler(res,200,'Email sent to your account for verification')
        }
        catch(err){
             return res.status(500).json(err);
             next(err);
        }
      }
    }
};

    // async store(req,res,next){
    //     try{
    //         // const value = await signupValidate(req.body)
    //         let imageName="";
    //         if(req.file){
    //             imageName= req.file.filename;
    //         }
    //             const user = new User({...req.body, image:imageName}); 
    //             user.slug = slugify(user.username, { lower: true });
    //             console.log(user);
    //             await user.save();
    //             const email = user.email
    //             const userId = user._id;
    //             if(user){
    //                 let value = emailToken.token({
    //                     email,
    //                     userId,
    //                     reason:'verify',
    //                     title:'Verify Account',
    //                     subject:'Link to verify your account',
    //                     info:user,
    //                     template:'signupMessage'
    //                 })
    //             }else{
    //                 return responseInstance.responseHandler(res,501,'User not found')
    //             }
    //             return responseInstance.responseHandler(res,200,'Email sent to your account for verification')
    //         }
    //         catch(err){
    //              return res.status(500).json(err);
    //              next(err);
    //         }
    // }
