import mongoose, { mongo } from "mongoose";

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    }
});

export default mongoose.model("Post", PostSchema)