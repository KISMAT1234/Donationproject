import express from 'express'
import UserController from "../controller/UserController.js"
import FileUpload from "../multerfile/Upload.js";

const userRouter = express.Router();


const fpInstance = new FileUpload()
let upload = fpInstance.custom_upload("uploads/users")

const routerInstance = new UserController();

userRouter.get('/',routerInstance.index)
userRouter.post('/', upload.single('image'), routerInstance.store)
userRouter.get('/loginuser', routerInstance.loginuser);




export default userRouter;
