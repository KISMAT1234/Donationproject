import { Queue, Worker } from 'bullmq';
import {client} from '../config/redis.js'; // Ensure this is ioredis
import { defaultQueueConfig } from '../config/bullMq.js';
import emailToken from './emailToken.js';

export const emailQueueName = 'email-queue';

export const emailQueue = new Queue(emailQueueName, {
  connection: client,
  defaultJobOptions: defaultQueueConfig,
});

export const handler = new Worker(
  emailQueueName,
  async (job) => {
    
    const data = job.data;
    data?.map( (user) => {
      const email = user.email
      const userId = user._id;
      if(user){
          let value = emailToken.token({
              email,
              userId,
              reason:'verify',
              title:'Verify Account',
              subject:'Link to verify your account',
              info:user,
              template:'signupMessage'
          })
      }else{
          return responseInstance.responseHandler(res,501,'User not found')
      }
    });
  },
  { connection: client }
);


handler.on('completed', () => {
  console.log('Handler job completed');
});

handler.on('failed', (err) => {
  console.error('Handler job failed:', err);
});