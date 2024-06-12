// // const Notification = require('../models/Notification');
// // const User = require('../models/User');
// // const Post = require('../models/Post');
// import { Server } from 'socket.io';


// const socketIoSetup = (server) => {
//     console.log('came to socketIoSetup')
//     const io = new Server(server, {
//         cors: {
//           origin: process.env.FRONTEND_URL,
//         },
//       });
//       io.on('connection', (socket) => {
//         console.log('A user connected');

//     // socket.on('comment', async ({ postId }) => {
//     //     try {
//     //         const commenterUser = await User.findById(commenterId);
//     //         const postOwnerUser = await User.findById(postOwnerId);

//     //         const newNotification = new Notification({
//     //             user: postOwnerId,
//     //             viewer: commenterId,
//     //             message: `${commenterUser.name} commented on your post`,
//     //             type: 'comment'
//     //         });

//     //         await newNotification.save();

//     //         io.to(postOwnerUser.socketId).emit('newNotification', newNotification);
//     //     } catch (error) {
//     //         console.error(error);
//     //     }
//     // });
    
//     socket.on('disconnect', () => {
//         console.log('A user disconnected');
//     });
// })
// }
// export default socketIoSetup;


class NotificationController {
    async getNotification(req, res) {
        try{

        }
        catch(err){
            console.log(err)
        }
    }
}
export default NotificationController;