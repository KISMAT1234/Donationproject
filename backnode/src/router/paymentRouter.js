import express from 'express'
import PaymentController from "../controller/PaymentController.js"
import authenticate from "../middleware/Authenticate.js"



const paymentRouter = express.Router();


const paymentInstance = new PaymentController();

paymentRouter.post('/',authenticate, paymentInstance.donationToFundraiser)
paymentRouter.get('/:id', paymentInstance.getPaymentHistoryByPost)
paymentRouter.get('/', paymentInstance.getPaymentHistoryByUserId)

export default paymentRouter;