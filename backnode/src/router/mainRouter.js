import userRouter from "./userRouter.js"
import express from 'express'

const mainRouter= express.Router();

mainRouter.use('/user',userRouter);

export default mainRouter;


