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
})
export default mongoose.model("Notification", notificationSchema);
