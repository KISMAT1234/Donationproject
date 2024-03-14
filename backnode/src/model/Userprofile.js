import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
    username: { type: String },
    email:{type: String},
    password :{type:String},
    image:{type:String}
},{
versionKey: false,
});

// hashing  the password before saving it to database

userSchema.pre("save", async function(next){
    try{
        if(this.isModified("password")){
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
        }
        next();
    }catch(err){
        next(err);
    }
});

userSchema.methods.toJSON = function () {
    let obj = this.toObject();
    if (obj.image) {
        obj.image = process.env.BASE_URL + "/uploads/users/" + obj.image;
    }else{
        obj.image = process.env.BASE_URL + "/uploads/icons/user.jpg";
    }
    delete obj.password;
    return obj;
}
export default mongoose.model("User", userSchema);


