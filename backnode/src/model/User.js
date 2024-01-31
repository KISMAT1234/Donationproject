import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email:{type: String,required:true},
    password :{type:String,required:true},
    // gender:{
    //     type:String,
    //     enum:["Male","Female"],
    //     required:true
    // },
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

// comparing  the incoming password with the hashed one in our database
userSchema.methods.comparePassword = async function(password){
    try{
        const isMatch = await bcrypt.compare(password, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

// removing only password  on toJSON method so it will not be visible when we send the response of a particular user
userSchema.methods.toJSON = function () {
    let obj = this.toObject();
    console.log(obj);
    if (obj.image) {
        obj.image = process.env.BASE_URL + "/uploads/users/" + obj.image;
    }
    else{
        obj.image = process.env.BASE_URL + "/uploads/icons/user.jpg";
    }
    delete obj.password;
    return obj;
}

userSchema.methods.generateToken = function(){
    let obj = {
        id: this._id,
        name: this.name,
        // role: this.role,
    }
    const token = jwt.sign(obj, process.env.JWT_SECRET);
    console.log(token);
    return token;
}






export default mongoose.model("User", userSchema);


