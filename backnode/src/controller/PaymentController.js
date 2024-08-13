import stripe from 'stripe';
import dotenv from 'dotenv'
import Handler from "../logger/ResponseHandler.js"
import Payment from '../model/Payment.js';
import emailToken from '../helper/emailToken.js';
import User from '../model/Userprofile.js';

const secretKey = process.env.SECRET_STRIPE_KEY;
const stripeInstance = new stripe(secretKey);
const responseInstance = new Handler();

dotenv.config();
class PaymentController{
    async donationToFundraiser(req,res){
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
            // console.log(payment,'payment')
            
            if(!payment){
              return responseInstance.responseHandler(res,400,'Error while sending payment')
            }

            await payment.save(); 

            const donorDetails = await User.findById(userId)
            const email = donorDetails.email;

            let value = emailToken.token({
                email,
                userId,
                reason:'payment',
                title:'Payment Successfull',
                subject:'Thank you for your payment!',
                info:donorDetails,
                template:'paymentSuccess'
            })
         
          return responseInstance.responseHandler(res,200,'payment', session.id)
            
        }
        catch(err){
            console.log(err);
            return responseInstance.responseHandler(res,400,'Backend Sever error')
        }
    }
    
    async getPaymentHistoryByPost(req,res){
      try{
        const postId = req.params.id
        const payment = await Payment.find({postId: postId}).populate("donorId")
        // console.log(payment)
        if(!payment){
          return responseInstance.responseHandler(res,200,'there is no any payment in this post ')
        }
        return responseInstance.responseHandler(res,200,'payment fetch successfull',payment)
      }
      catch(err){
      console.log(err);
      return responseInstance.responseHandler(res,400,'Backend Sever error')

      }
    }

    async getPaymentHistoryByUserId(req,res){
      try{
        // console.log('request came in getPayment')
        const userId = req.user.userId
        const userPaymentList = await Payment.find({donorId: userId}).populate("postId")
        // console.log(userPaymentList ,'specific user payment')
        if(!userPaymentList){
          return responseInstance.responseHandler(res,200,'there is no any payment in this post ')
        }
        return responseInstance.responseHandler(res,200,'payment fetch successfull',userPaymentList )
        
      }catch(error){
        console.log(error)
        return responseInstance.responseHandler(res,400,'Backend Sever error')
      }
    }

    async getPaymentByHighestDonation(req,res){
      try{
        
        const maxPaymentByUser = await Payment.find().sort({ amount: -1 }).limit(5).populate("donorId")
        
        if(!maxPaymentByUser){
          return responseInstance.responseHandler(res,200,'there is no any payment in this post ')
        }

        return responseInstance.responseHandler(res,200,'payment fetch successfull',maxPaymentByUser )

      }
      catch(error){
        console.log(error)
        return responseInstance.responseHandler(res,400,'Backend Sever error')
      }
    }
}

export default PaymentController;