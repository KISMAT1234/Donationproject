import dotenv from 'dotenv';
import { app, io } from './app.js';
import Database from './src/connection/databaseconn.js'

dotenv.config();
Database();

const port = process.env.PORT || 8000;



const server = app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});

io.attach(server); 

export const add = (a,b) => {
  return a + b
}

// module.exports = { add }




