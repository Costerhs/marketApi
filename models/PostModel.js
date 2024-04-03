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
    images:{
        type:[String],
        required: true
    },
    userId:{
        type:String
    },
    category:{
        type:Number,
        required: true
    },
    description:{
        type:String
    },
    status:Boolean
});

export default mongoose.model("Post", PostSchema)