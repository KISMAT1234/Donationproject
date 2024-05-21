import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    postId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Upload'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comment: String,
    like:{
        type:Number,
        default:0
    },
    dislike:{
        type:Number,
        default:0
    },
    
    createdAt: {
        type: String,
        default: () => {
          const date = new Date();
          const monthNames = [
            'January', 'February', 'March',
            'April', 'May', 'June', 'July',
            'August', 'September', 'October',
            'November', 'December'
          ];
          const day = date.getDate();
          const monthIndex = date.getMonth();
          const year = date.getFullYear();
          return `${monthNames[monthIndex]} ${day}, ${year}`;
        }
      }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

