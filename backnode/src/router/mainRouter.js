import userRouter from "./userRouter"
import express from 'express'

const mainRouter= express.Router();

mainRouter.use('/user-profile',userRouter)


