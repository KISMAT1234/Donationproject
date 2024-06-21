import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
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
export default mongoose.model("Message", messageSchema);