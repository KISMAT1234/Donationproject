import express from 'express';
import cors from 'cors';
import mainRouter from './src/router/mainRouter.js';
import path from 'path';
import morgan from 'morgan';
import errorHandler from './src/middleware/errorHandler.js';
import helmet from 'helmet'
import dotenv from 'dotenv';
import initializeSocket from './socket.js';
// import swaggerJSDoc from 'swagger-jsdoc'
// import swaggerUi from 'swagger-ui-express'
// import docs from './documentation/index.js'
// import swaggerSpecs from './documentation/index.js';
import status from 'express-status-monitor'
import {ApolloServer} from '@apollo/server'
import {expressMiddleware} from '@apollo/server/express4'
import rootSchema from "./src/graphql/Schemas/index.js"
import rootResolver  from './src/graphql/Resolvers/index.js'
import { setupSwagger } from './documentation/index.js';
import sanitizeHtmlInput from './src/middleware/sanitize.js';




dotenv.config();

const app = express();

app.use(express.json());

app.use(helmet());

app.use(status())

app.use(sanitizeHtmlInput)

// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // replace with your frontend URL
}));

setupSwagger(app);

app.use(express.urlencoded({ extended: true }));

// Use import.meta.url to get the module's URL and extract the directory path
const __dirname = path.dirname(new URL(import.meta.url).pathname);

app.use(express.static(path.join(__dirname, 'public')));

// Your other middleware and routes here
app.use(mainRouter);



//Graphql Server
const graphServer = new ApolloServer({
  typeDefs: rootSchema,
  resolvers: rootResolver 
});
await graphServer.start()
app.use("/graphql", expressMiddleware(graphServer))


app.get('/', (req, res) => {
  res.send('Hello world');
});

app.use((err, req, res, next) => {
  errorHandler(err, req, res, next);
});

const io = initializeSocket(app); // Initialize Socket.io after Express app

export { app, io };

