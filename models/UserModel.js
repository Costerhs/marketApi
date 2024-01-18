import mongoose, { mongo } from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    passwordHash:{
        type: String,
        required:true
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    avatar:String,
    phone_number: Number,
});

export default mongoose.model("User", UserSchema)