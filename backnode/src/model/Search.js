import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema({
    search:{type:String},
    userId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Search",searchSchema);