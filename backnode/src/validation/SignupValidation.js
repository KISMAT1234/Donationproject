import {z} from "zod"
// import Handler from "../logger/ResponseHandler.js"
// const responseInstance = new Handler();

// const validate = (schema) => async(req, res, next) => {
//     try{
//         const parseBody = await schema.parseAsync(req.body)
//         req.body = parseBody;
//         next()
//     }catch(err){
//         console.log(err);
//         return responseInstance.responseHandler(res,500,'data fetch success',user)
//     }

// }

export const usernameValidation  = z
   .string()
   .min(2, "username must be at least 2 characters")
   .max(10, "username must be at least 10 characters")
   .regex(/^[a-zA-Z0-9]+$/, "username must contain only letters and numbers")


const signupSchema  = z.object({
    username: usernameValidation,
    email: z.string().email({message: "Invalid email address"}),
    password: z.string().min(2, "password must be at least 2 characters"),
    confirmPassword: z.string().max(8, "password must be at least 8 characters"),
})

// const validateSignup = validate(signupSchema);

export default signupSchema;
