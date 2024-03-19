import express from 'express';
import LoginController from "../controller/LoginController.js"

const loginRouter = express.Router();
const loginInstance = new LoginController();


loginRouter.post("/",loginInstance.login)
loginRouter.get("/token",loginInstance.tokenCheck)

export default loginRouter;