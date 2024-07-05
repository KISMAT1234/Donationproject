import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema({
    search:{type:String},
    userId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'User'
    }  // userId of user who made search
})

export default mongoose.model("Search",searchSchema);