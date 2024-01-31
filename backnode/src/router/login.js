import express from 'express';
import LoginController from "../controller/LoginController.js";

const loginRouter = express.Router();
const loginInstance = new LoginController();

loginRouter.post('/', loginInstance.login);
// loginRouter.get('/tokenmatch', loginInstance.tokenMatch);



// loginRouter.post("/rest-password", loginInstance.resetPassword);
// loginRouter.post("/reset-confirm", loginInstance.resetConfirm);


export default loginRouter;