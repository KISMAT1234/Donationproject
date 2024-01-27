import express from "express"
import dotenv from 'dotenv';

dotenv.config();

const exp= express();

exp.get('/',(req,res)=>{
    res.send("hello world");
})

const port= process.env.PORT 

const httpServer = process.env.SERVER


exp.listen(port,()=>{
    console.log(`Server running at port ${httpServer}:${port}`);
})


