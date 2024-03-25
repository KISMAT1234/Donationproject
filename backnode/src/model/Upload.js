import mongoose from 'mongoose';
// import {Schema} from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const uploadSchema = new mongoose.Schema({
    name: { type: String },
    address:{type: String},
    age :{type:Number},
    description:{type:String},
    image:{type:String},
    uploadId: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
},{
versionKey: false,
});

uploadSchema.methods.toJSON = function () {
    let obj = this.toObject();
    if (obj.image) {
        obj.image = process.env.BASE_URL + "/uploads/posts/" + obj.image;
    }else{
        obj.image = process.env.BASE_URL + "/uploads/icons/user.jpg";
    }
    delete obj.password;
    return obj;
}

export default mongoose.model("Upload", uploadSchema);
