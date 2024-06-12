import dotenv from 'dotenv';
import { app, io } from './app.js';
import Database from './src/connection/databaseconn.js'

dotenv.config();
Database();

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

io.listen(server); // Bind Socket.io to the same HTTP server as Express

console.log(`Socket.io server running on port ${port}`);


