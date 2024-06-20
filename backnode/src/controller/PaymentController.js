import stripe from 'stripe';



import dotenv from 'dotenv'
import Handler from "../logger/ResponseHandler.js"

const secretKey = process.env.SECRET_STRIPE_KEY;
const stripeInstance = new stripe(secretKey);
const responseInstance = new Handler();

dotenv.config();



class PaymentController{
    async pay(req,res){
        try{

            const paymentData= req.body
            console.log(paymentData.postData.name,'payment data');
            // console.log(paymentData[0].name,'payment data');
            console.log(paymentData,'payment data');

            const userId = req.user.userId
            console.log(userId)

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
                  unit_amount: 1000, 
                },
                quantity: 1,
              }],
              // unit_amount: 0,
              mode:"payment",
              success_url: `${process.env.FRONTEND_URL}/payment-success`,
              cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
            //   cancel_url:"http://localhost:3000/cancel",
            })
            //  console.log(session,'session stripe');
            return responseInstance.responseHandler(res,200,'payment', session.id)
            
        }
        catch(err){
            console.log(err);
        }
    }
}

export default PaymentController;