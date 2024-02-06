import mongoose from "mongoose";
import slugify from "slugify";

const uploadSchema = new mongoose.Schema({
    // category_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Category",
    //     required: true,
    // },
    slug:{
        type: String,
        required: true,
        unique: true,
    },
    username:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        requires:true
    },
    quantity:{
     type: Number
    },
    description:{
        type: String,
    },
    image:{
        type: String,
    },

       
   

},{
    versionKey: false,
});

uploadSchema.pre("save", async function(next){
    if(this.isModified("title")){
        this.slug = slugify(this.title, {lower: true});
    }
    next();
    
});

export default mongoose.model("Upload", uploadSchema);