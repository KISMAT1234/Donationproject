import dotenv from 'dotenv';
import { app, io } from './app.js';
import Database from './src/connection/databaseconn.js'
import mongoose from'mongoose';

dotenv.config();
Database();

const port = process.env.PORT || 8000;



const server = app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

io.attach(server); 

process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  });
});







// export const add = (a,b) => {
//   return a + b
// }

// module.exports = { add }




