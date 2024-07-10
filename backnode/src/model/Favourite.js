import mongoose from 'mongoose';

const favouriteSchema = new mongoose.Schema({
    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    createdAt: { type: Date, default: Date.now }
})

const Favourite = mongoose.model('Favourite', favouriteSchema);
export default Favourite;