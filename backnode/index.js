import Database from './src/connection/databaseconn.js'
import dotenv from 'dotenv'
import exp from "./app.js"



dotenv.config();


Database();


const port= process.env.PORT 

const httpServer = process.env.SERVER

exp.listen(port,()=>{
    console.log(`Server running at port ${httpServer}:${port}`);
})