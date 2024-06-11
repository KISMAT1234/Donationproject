import express from "express"
import cors from  'cors'
import mainRouter from './src/router/mainRouter.js'
import path from "path"
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import morgan from 'morgan';
import errorHandler from './src/middleware/errorHandler.js'
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const exp= express();
const httpServer = createServer(exp);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


exp.use(express.json())

exp.use(cors());

// exp.use(morgan('tiny'));

exp.use(express.urlencoded({ extended: true }));


exp.use(express.static(path.join(__dirname, 'public')));


exp.use(mainRouter);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

exp.set('io', io);

exp.get('/',(req,res)=>{
    res.send("hello world");
})

exp.use((err, req, res, next) => {
    errorHandler(err, req, res, next)
  })

export default exp;







  

