import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    summary:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    cover:{
        type:String,
        required:true
    },
    author:{
        type:Schema.Types.ObjectId, ref:'User'
    }
},{
    timestamps:true
})

export default mongoose.model('Post',postSchema)