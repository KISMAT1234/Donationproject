import express from "express"
import dotenv from 'dotenv'
import cors from  'cors'
import mainRouter from './src/router/mainRouter.js'
import Database from './src/connection/databaseconn.js'


dotenv.config();

const exp= express();

exp.use(express.json())

exp.use(cors());

exp.use(mainRouter);




exp.get('/',(req,res)=>{
    res.send("hello world");
})

Database();


const port= process.env.PORT 

const httpServer = process.env.SERVER


exp.listen(port,()=>{
    console.log(`Server running at port ${httpServer}:${port}`);
})


