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

            const info = req.body
            // console.log(info,'info result');

            const session = await stripeInstance.checkout.sessions.create({
              payment_method_types:["card"],
              mode:'payment',
              line_items:[{
                price_data: {
                  currency: "usd",
                  product_data: {
                    name:"hari"
                  },
                  unit_amount: 2000,
                },
                quantity: 1,
              }],
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