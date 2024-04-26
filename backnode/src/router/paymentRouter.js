import express from 'express'
import PaymentController from "../controller/PaymentController.js"
import authenticate from "../middleware/Authenticate.js"



const paymentRouter = express.Router();


const paymentInstance = new PaymentController();

paymentRouter.post('/', paymentInstance.pay)

export default paymentRouter;