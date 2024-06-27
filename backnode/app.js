import express from 'express';
import cors from 'cors';
import mainRouter from './src/router/mainRouter.js';
import path from 'path';
import morgan from 'morgan';
import errorHandler from './src/middleware/errorHandler.js';
import dotenv from 'dotenv';
import initializeSocket from './socket.js';
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
// import docs from './documentation/index.js'
import status from 'express-status-monitor'

const options = {
  definition:{
    openapi: '3.0.0',
    info: {
      title: 'Fund Raising Platform API',
      description:
        'Welcome to our Fund Raising Platform Backend Documentation. This guide offers a quick overview of the essential backend features that power our blogging platform, facilitating seamless integration for developers.<br><br>Our platform provides a secure authentication process, enabling users to register and log in using their email or social media credentials.<br><br>Leverage our robust text editor API to effortlessly create and store blogs.<br><br> This API supports rich content including text, images, and videos.The backend seamlessly manages media uploads, ensuring the safe storage and retrieval of images.<br><br>[Readme](https://readme.com)<br>[Github](https://github.com/mervixdev/expressServer)',
      version: '0.1.9',
    },
    servers:[
      {
        url:'http://localhost:8000'
      }
    ]
  },
  apis:['./app.js']
}

dotenv.config();

const app = express();

app.use(express.json());

app.use(status())
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // replace with your frontend URL
  // methods: ['GET', 'POST'],
  // allowedHeaders: ['Content-Type'],
  // credentials: true,
}));
const docs = swaggerJSDoc(options);

app.use('/documentation', swaggerUi.serve, swaggerUi.setup(docs))
/**
 * @swagger
 * /:
 *  get:
 *      summary: This api is used to check
 *      description: This is description of the api  
 *      responses:
 *         200:
 *            description: To test Get method
 */

/**
 * @swagger
 * /user:
 *   post:
 *    Summary: Returns a user list 
 *    description: this is user list description
 *    parameters:
 *          - in: query
 *    responses:
 *        '200':
 *           description:to test post method
 */

/** 
 * @swagger
 * /user:
 *  put:
 *   summary: Update user by ID
 *   description: Updates an existing user
 *   parameters:
 *     - name: userId
 *       in: path
 *       required: true
 *       type: string
 *       description: The ID of the user to update
 *     - in: body
 *       name: user
 *       description: The user data to update
 *       schema:
 *         $ref: '#/definitions/User'
 *   responses:
 *     200:
 *       description: User updated successfully
 *       schema:
 *         $ref: '#/definitions/User'
 *     404:
 *       description: User not found
 */

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

