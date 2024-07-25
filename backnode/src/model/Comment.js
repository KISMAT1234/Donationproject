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
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dislikeBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    likeIcon:{
      type:Boolean,
      default:false
    },
    disLikeIcon:{
      type:Boolean,
      default:false
    },
    // createdAt: {
    //     type: String,
    //     default: () => {
    //       const date = new Date();
    //       const monthNames = [
    //         'January', 'February', 'March',
    //         'April', 'May', 'June', 'July',
    //         'August', 'September', 'October',
    //         'November', 'December'
    //       ];
    //       const day = date.getDate();
    //       const monthIndex = date.getMonth();
    //       const year = date.getFullYear();
    //       return `${monthNames[monthIndex]} ${day}, ${year}`;
    //     }
    //   }
  },
  {
    timestamps: true
  });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

