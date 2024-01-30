import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email:{type: String,required:true},
    password :{type:String,required:true},
    // gender:{
    //     type:String,
    //     enum:["Male","Female"],
    //     required:true
    // },
    // image:{type:String}

});
export default mongoose.model("User", userSchema);


