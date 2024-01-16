import mongoose, { mongo } from "mongoose";

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    image:{
        type:String,
        required: true
    },
    userId:{
        type:String
    }
});

export default mongoose.model("Post", PostSchema)