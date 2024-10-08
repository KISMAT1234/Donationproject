import mongoose from 'mongoose';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
    username: { type: String},
    email:{type: String},
    password :{type:String,default:"loginfromoauth"},
    // image:{type:String,default:""},
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    slug:{
        type:String,
        required:true,
        unique: true 
    },
    profileViews: { type: Number, default: 0 },
    followers:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
    following:[{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
    isVerified:{type:Boolean, default:false},
},{
versionKey: false,
});

// hashing  the password before saving it to database

userSchema.pre("save", async function (next){
    try{
        // this.slug = slugify(this.username, { lower: true });

        if(this.isModified("password")){
            const hashedPassword = await bcrypt.hash(this.password, 10);
            console.log(hashedPassword)
            this.password = hashedPassword;
        }
        next();
    }catch(err){
        next(err);
    }
});

userSchema.methods.toJSON = function () {
    let obj = this.toObject();
    // console.log(obj,'object value')
    if (obj.image) {
        obj.image = process.env.BASE_URL + "/uploads/users/" + obj.image;
    }else{
        obj.image = process.env.BASE_URL + "/uploads/icons/user.jpg";
    }
    delete obj.password;
    // console.log(obj,'obj after localhost')
    return obj;
}

userSchema.methods.comparePassword = async function(password){
    try{
        // console.log(password,'compare password')
        const isPass = await bcrypt.compare(password, this.password);
        // console.log(isPass);
        return isPass;
    }catch(err){
        throw err;
    }
}

userSchema.methods.generateToken = function () {
    // console.log('came here')
    let userData = {
        id: this._id,
        role: this.role,
    }

    const getToken = jwt.sign(userData, process.env.JWT_SECRET,{ expiresIn: process.env.JWT_TIMEOUT })
    // console.log(getToken);
    return getToken;
}


export default mongoose.model("User", userSchema);


