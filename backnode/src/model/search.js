import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema({
    search:{type:String}
})

export default mongoose.model("Search",searchSchema);