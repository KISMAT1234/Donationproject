import express from "express"
import dotenv from 'dotenv'
import cors from  'cors'
import mainRouter from './src/router/mainRouter.js'
import Database from './src/connection/databaseconn.js'
import path from "path"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config();

const exp= express();

exp.use(express.json())

exp.use(cors());



exp.use(express.urlencoded({ extended: true }));


exp.use(express.static(path.join(__dirname, 'public')));


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


