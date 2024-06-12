import mongoose from 'mongoose';
const notificationSchema = new mongoose.Schema({
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      type: {
        type: String,
        enum: ['profile_view', 'friend_request', 'message', 'like','comment','donation'],
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
})
export default mongoose.model("Notification", notificationSchema);
