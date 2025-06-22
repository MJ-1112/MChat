import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    recieverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        
    },
    text:{
        type:String,
        
        
    },
    Image:{
        type:String,
        
        
    },
},
{timestamps:true});

const Message = mongoose.model('messages',MessageSchema);

export default Message;