import mongoose from 'mongoose';

const followSchema = new mongoose.Schema({
    follower:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    following:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }    
})

export default mongoose.model("Follow", followSchema);

