import mongoose from 'mongoose';

const followSchema = new mongoose.Schema({
    follower:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    following:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    isFollow:{
       type:Boolean,
       default:false
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

export default mongoose.model("Follow", followSchema);

