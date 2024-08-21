import { Server } from 'socket.io';
import { createServer } from 'http';
import User from './src/model/Userprofile.js';
import Post from './src/model/Post.js';
import Notification from "./src/model/Notification.js";
import dotenv from 'dotenv';


dotenv.config();


const initializeSocket = (app) => {
   
  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin:"http://localhost:5173", // Replace with your frontend URL
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    
    console.log('A user connected');
    // io.emit("notification",'testing connection')
    socket.on('notification', async ({postId,userId})=>{
      // console.log(userId,'sender user id')
      
      const post = await Post.findById(postId)
      // console.log(post,'user post')

      const user = await User.findById(userId)
      // console.log(post.userId._id,'before toString id')
      const postUserId = post.userId._id.toString()
      // console.log(postUserId,'after toString id')

      if (postUserId !== userId) {
         const notification = new Notification({
             sender: userId,
             receiver: postUserId,
             type: 'comment',
             message: `${user.username} commented on your post`,
             postId:postId
         });
        //  console.log(notification,'notification to send user and save')
         await notification.save();
   
         io.to(postUserId).emit('notification', notification);
        // console.log(postId,'post id')
        // io.emit('notification',postId)
      }
    })


    socket.on('message',(messageInfo)=>{
      // const receiverSocketId = users[messageInfo.receiverId];
      const receiverId = messageInfo.receiverId
      const message = messageInfo.message
      console.log(receiverId,'id receiver')
      console.log(message,'message')
      
      //  io.to(receiverId).emit('message',message); 
      io.emit('message',messageInfo);
    })
    
  
    // socket.on('disconnect', () => {
    //   console.log('User disconnected');
    // });
  });

  return io;
};

export default initializeSocket;


