import express from 'express'
import UserController from "../controller/UserController.js"
import FileUpload from '../config/Upload.js';
// import authorize from "../middleware/Authorize.js"
import authenticate from "../middleware/Authenticate.js"
// import signupSchema from "../validation/SignupValidation.js"
// import validate from '../validation/middleware.js';


const userRouter = express.Router();

let fPInstance = new FileUpload();
let upload = fPInstance.custom_upload("uploads/users")

const routerInstance = new UserController();

// userRouter.post('/',validate(signupSchema),upload.single('image'), routerInstance.store)
// userRouter.post('/',upload.single('image'), routerInstance.store)
// userRouter.get('/admin',restrictTo(["admin"]), routerInstance.getUser)
userRouter.get('/',routerInstance.getAllUser)
userRouter.get('/:id',authenticate, routerInstance.getOneUser)
userRouter.patch('/:slug', routerInstance.UpdateUserProfile)
// userRouter.get('/',authenticate,authorize(["admin"]), routerInstance.getAllUser)
userRouter.get('/:id/verify/:token',routerInstance.verifyEmail)
userRouter.post('/:id/forgot/:token',routerInstance.forgotPassword)
userRouter.patch('/',authenticate,routerInstance.changePassword)

export default userRouter;
