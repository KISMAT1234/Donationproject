import express from "express"
import dotenv from 'dotenv'
import cors from  'cors'
import mainRouter from './src/router/mainRouter.js'
import Database from './src/connection/databaseconn.js'
import path from "path"


dotenv.config();

const exp= express();

exp.use(express.json())

exp.use(cors());



exp.use(express.urlencoded({ extended: true }));

// exp.use("/",(req,res)=>res.send("hello"));
exp.use("/",express.static(path.join(import .meta.url,"../public")));


exp.use(mainRouter);

// const staticPath = path.resolve("/public")
// const mypath = path.join(import .meta.url,'../public')
// console.log(import .meta.url,mypath,'this is url')
// exp.use("/",express.static(mypath))




// exp.get('/',(req,res)=>{
//     res.send("hello world");
// })


Database();


const port= process.env.PORT 

const httpServer = process.env.SERVER


exp.listen(port,()=>{
    console.log(`Server running at port ${httpServer}:${port}`);
})


