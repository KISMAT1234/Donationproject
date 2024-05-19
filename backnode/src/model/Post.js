import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const uploadSchema = new mongoose.Schema({
    name: { type: String },
    address:{type: String},
    age :{type:Number},
    phone:{type:Number},
    gender:{type:String},
    startDate:{type:String},
    endDate:{type:String},
    category:{type:String},
    topic:{type:String},
    description:{type:String},
    image:{type:String},
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"User"},
    comments:{type: mongoose.Schema.Types.ObjectId, ref:"Comment"},
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
},
{
versionKey: false,
});

uploadSchema.methods.toJSON = function () {
    let obj = this.toObject();
    // console.log(obj);
    // console.log(obj.image);
    if (obj.image) {
        obj.image = process.env.BASE_URL + "/uploads/posts/" + obj.image;
    }else{
        obj.image = process.env.BASE_URL + "/uploads/icons/user.jpg";
    }
    delete obj.password;
    return obj;
}

export default mongoose.model("Post", uploadSchema);
