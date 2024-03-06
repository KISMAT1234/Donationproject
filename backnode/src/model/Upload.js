import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const uploadSchema = new mongoose.Schema({
    name: { type: String },
    address:{type: String},
    age :{type:Number},
    description:{type:String},
 
},{
versionKey: false,
});


export default mongoose.model("Upload", uploadSchema);
