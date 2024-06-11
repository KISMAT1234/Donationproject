import mongoose from 'mongoose';
const notificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      type: {
        type: String,
        enum: ['profile_view', 'friend_request', 'message', 'like','comment','donation'],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      isRead: {
        type: Boolean,
        default: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})
export default mongoose.model("Notification", notificationSchema);
