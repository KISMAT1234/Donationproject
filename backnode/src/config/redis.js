// import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

// const client = new Redis({
//     port: process.env.REDISS_PORT || 6379, // Redis port
//     host: process.env.REDISS_HOST || 'localhost', // Redis host
//     password: process.env.REDISS_SERVER_PASSWORD, // Redis password
// });

// client.on('connect', () => {
//     console.log('Connected to Redis server');
// });

// client.on('error', (err) => {
//     console.error('Redis error:', err);
// });

// export default client;

export const client = {
    host: process.env.REDISS_HOST,
    port: process.env.REDISS_PORT,
    password: process.env.REDISS_SERVER_PASSWORD, // Redis password
  };
