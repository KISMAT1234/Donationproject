import userRouter from "./userRouter.js"
import uploadRouter from "./uploadRouter.js"
import express from 'express'

const mainRouter= express.Router();

mainRouter.use('/user',userRouter);
mainRouter.use('/upload',uploadRouter);

export default mainRouter;


