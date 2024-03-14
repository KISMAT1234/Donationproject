import express from 'express'
import UserController from "../controller/UserController.js"
import FileUpload from '../multerfile/Upload.js';


const userRouter = express.Router();

let fPInstance = new FileUpload();
let upload = fPInstance.custom_upload("uploads/users")

const routerInstance = new UserController();

userRouter.post('/',upload.single('image'), routerInstance.store)
userRouter.get('/', routerInstance.getUser)

export default userRouter;
