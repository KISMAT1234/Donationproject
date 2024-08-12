import { Queue, Worker } from 'bullmq';
import {client} from '../config/redis.js'; // Ensure this is ioredis
import { defaultQueueConfig } from '../config/bullMq.js';

export const emailQueueName = 'email-queue';

export const emailQueue = new Queue(emailQueueName, {
  connection: client,
  defaultJobOptions: defaultQueueConfig,
});

export const handler = new Worker(
  emailQueueName,
  async (job) => {
    console.log('Inside handler data', job.data);
    // Your email handling logic
  },
  { connection: client }
);


handler.on('completed', () => {
  console.log('Handler job completed');
});

handler.on('failed', (err) => {
  console.error('Handler job failed:', err);
});