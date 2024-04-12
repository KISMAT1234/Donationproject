import express from 'express'
import UserController from "../controller/UserController.js"
import FileUpload from '../multerfile/Upload.js';
import authorize from "../middleware/Authorize.js"
import authenticate from "../middleware/Authenticate.js"

const userRouter = express.Router();

let fPInstance = new FileUpload();
let upload = fPInstance.custom_upload("uploads/users")

const routerInstance = new UserController();

userRouter.post('/',upload.single('image'), routerInstance.store)
// userRouter.get('/admin',restrictTo(["admin"]), routerInstance.getUser)
userRouter.get('/',authenticate,authorize(["user","admin"]), routerInstance.getAllUser)
// userRouter.get('/',authenticate,authorize(["admin"]), routerInstance.getAllUser)
userRouter.get('/:id/verify/:token',routerInstance.verifyEmail)

export default userRouter;
