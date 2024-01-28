import userRouter from "./userRouter.js"
import express from 'express'

const mainRouter= express.Router();

mainRouter.use('/user-profile',userRouter)

export default mainRouter;


