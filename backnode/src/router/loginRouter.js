import express from 'express';
import LoginController from "../controller/LoginController.js"
import authenticate from "../middleware/Authenticate.js"



const loginRouter = express.Router();
const loginInstance = new LoginController();


loginRouter.post("/",loginInstance.login)
loginRouter.get("/token",authenticate,loginInstance.tokenCheck)
loginRouter.post("/forgot",loginInstance.forgotPassword)

export default loginRouter;