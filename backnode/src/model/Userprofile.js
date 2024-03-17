import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
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

userSchema.methods.comparePassword = async function(password){
    try{
        
        const isPass = await bcrypt.compare(password, this.password);
        console.log(isPass);
        return isPass;
    }catch(err){
        throw err;
    }
}

userSchema.methods.generateToken = function () {
    let userData = {
        id: this._id,
        name: this.name,
    }

    const getToken = jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
    console.log(getToken);
    return getToken;
}


export default mongoose.model("User", userSchema);


