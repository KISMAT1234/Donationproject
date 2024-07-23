import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import { userApi } from './user.js';

// Swagger definition
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API documentation for the application',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
    ],
  apis: ['../src/routes/*.js'],
};

// Merge user and product API specs
const swaggerSpec = {
  ...swaggerDefinition,
  paths: {
    ...userApi.paths,
  },
};

export const setupSwagger = (app) => {
  // Serve Swagger API documentation
  app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

