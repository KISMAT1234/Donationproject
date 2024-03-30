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
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

