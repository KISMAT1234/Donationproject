import express from 'express'
import userRouter from "./userRouter.js"
import postRouter from "./postRouter.js"
import loginRouter from "./loginRouter.js"
import cmtRouter from "./commentRouter.js";
import followRouter from './followRouter.js';
import paymentRouter from './paymentRouter.js';
import searchRouter from './searchRouter.js';
import categoryRouter from './categoryRouter.js';
import notificationRouter from './notificationRouter.js';
import messageRouter from './messageRouter.js';
import favouriteRouter from './favouriteRouter.js';

const mainRouter= express.Router();

mainRouter.use('/user',userRouter);
mainRouter.use('/upload',postRouter);
mainRouter.use('/login',loginRouter);
mainRouter.use('/comment',cmtRouter);
mainRouter.use('/follow',followRouter);
mainRouter.use('/donate',paymentRouter);
mainRouter.use('/search',searchRouter);
mainRouter.use('/category',categoryRouter);
mainRouter.use('/notification',notificationRouter);
mainRouter.use('/message',messageRouter);
mainRouter.use('/favourite',favouriteRouter);



export default mainRouter;


