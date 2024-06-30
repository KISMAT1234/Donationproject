import stripe from 'stripe';



import dotenv from 'dotenv'
import Handler from "../logger/ResponseHandler.js"
import Payment from '../model/Payment.js';

const secretKey = process.env.SECRET_STRIPE_KEY;
const stripeInstance = new stripe(secretKey);
const responseInstance = new Handler();

dotenv.config();



class PaymentController{
    async pay(req,res){
        try{

            const paymentData= req.body
            // console.log(paymentData,'payment data');
          

            const userId = req.user.userId
            // console.log(userId)

            const paymentInfo = {
              donorId: userId,
              postId: paymentData.postData._id,
              amount: paymentData.amount,
              currency: 'Npr',
            }

            const session = await stripeInstance.checkout.sessions.create({
              payment_method_types:["card"],
              submit_type:'pay',
              mode:'payment',
              customer_email:paymentData.postData.userId.email,
              line_items: [{
                price_data: {
                  currency: "usd",
                  product_data: {
                    name: paymentData.postData.name,
                    // images:'Image', 
                    // metadata:{
                    //   postId: paymentData.postId
                    // },
                  },
                  unit_amount: paymentData.amount, 
                },
                quantity: 1,
              }],
              // unit_amount: 0,
              mode:"payment",
              success_url: `${process.env.FRONTEND_URL}/Mainpage/payment-success`,
              cancel_url: `${process.env.FRONTEND_URL}/Mainpage/payment-cancel`,
            //   cancel_url:"http://localhost:3000/cancel",
            })
            //  console.log(session,'session stripe');

            const payment = new Payment({...paymentInfo});
            console.log(payment,'payment')
            await payment.save(); 

            return responseInstance.responseHandler(res,200,'payment', session.id)
            
        }
        catch(err){
            console.log(err);
            return responseInstance.responseHandler(res,400,'Backend Sever error')
        }
    }
    
    async getPaymentHistory(req,res){
      try{
        console.log('request came in getPayment')
        const postId = req.params.id
        const payment = await Payment.find({postId: postId}).populate("donorId")
        console.log(payment)
        if(!payment){
          return responseInstance.responseHandler(res,200,'there is no any payment in this post ')
        }
        return responseInstance.responseHandler(res,200,'payment fetch successfull',payment)
      }
      catch(err){
      console.log(err);
      }
    }
}

export default PaymentController;