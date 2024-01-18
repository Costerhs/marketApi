import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    key:{
        type:Number,
        required:true
    }
});

export default mongoose.model("Category", CategorySchema)