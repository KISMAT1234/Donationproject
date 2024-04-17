import express from "express"
import dotenv from 'dotenv'
import cors from  'cors'
import mainRouter from './src/router/mainRouter.js'
import Database from './src/connection/databaseconn.js'
import path from "path"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import winston, {format} from "winston";
import morgan from 'morgan';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);




dotenv.config();

const exp= express();

exp.use(express.json())

exp.use(cors());

// exp.use(morgan('tiny'));

exp.use(express.urlencoded({ extended: true }));


exp.use(express.static(path.join(__dirname, 'public')));


exp.use(mainRouter);

exp.get('/',(req,res)=>{
    res.send("hello world");
})

// exp.use((err, req, res, next) => {
//     errorHandler(err, req, res, next)
//   })

Database();


const port= process.env.PORT 

const httpServer = process.env.SERVER


exp.listen(port,()=>{
    console.log(`Server running at port ${httpServer}:${port}`);
})

// const {printf, timestamp, combine, colorize, errors, json} = format;

// const myFormat = printf(({ level, message, stack, timestamp }) => {
//     return `${timestamp}  ${level}: ${stack || message}`;
// });

// const Loglevels = {
//     error: 0,
//     warn: 1,
//     info: 2,
//     http: 3,
//     verbose: 4,
//     debug: 5,
//     silly: 6,
//   }



// let logger
// console.log(process.env.NODE_ENV,'env')
// if (process.env.NODE_ENV == 'production') {

//    logger = winston.createLogger({
//     level:Loglevels,     
//     format: combine(
//         colorize(),
//         timestamp({format: "yyyy-MM-dd HH:mm:ss"}),
//         errors({stack: true}),
//         json(),
//         // myFormat
//     ),   // Text format for logging       
//     transports:[
//         new winston.transports.File({
//             filename:"log/error_log.txt",
//             level:"error",
//         })
//     ]
// });
// }else{
//      logger = winston.createLogger({
//         label: Loglevels,
//         transports: [new winston.transports.Console()],
//         format: winston.format.simple(),
//       })
// }

// logger.error("error from logger");
// logger.warn("warning message");

// // export default logger
// // Check if NODE_ENV is set to "development"
// if (process.env.NODE_ENV === 'development') {
//     console.log('Running in development mode');
//   } else if (process.env.NODE_ENV === 'production') {
//     console.log('Running in production mode');
//   } else if (process.env.NODE_ENV === 'test') {
//     console.log('Running in test mode');
//   } else {
//     console.log('Environment mode not set or unknown');
//   }
  

