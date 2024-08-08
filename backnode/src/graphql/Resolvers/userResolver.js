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
        const { username, email, password, image } = data;
        const user = new User({ username, email, password, image });
        user.slug = slugify(user.username, { lower: true });
      
        try {
          await user.save();  // Save user to the database
          return user;
        } catch (error) {
          console.error('Error saving user:', error);
          throw new Error('Failed to save user');
        }
      }
    }
};
