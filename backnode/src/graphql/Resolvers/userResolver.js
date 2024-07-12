import User from "../../model/Userprofile.js";
import Handler from "../../logger/ResponseHandler.js";
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
};
