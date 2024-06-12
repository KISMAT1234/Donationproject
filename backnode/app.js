import express from 'express';
import cors from 'cors';
import mainRouter from './src/router/mainRouter.js';
import path from 'path';
import morgan from 'morgan';
import errorHandler from './src/middleware/errorHandler.js';
import dotenv from 'dotenv';
import initializeSocket from './socket.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Use import.meta.url to get the module's URL and extract the directory path
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static(path.join(__dirname, 'public')));

// Your other middleware and routes here
app.use(mainRouter);

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

const io = initializeSocket(app); // Initialize Socket.io after Express app

export { app, io };

