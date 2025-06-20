import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    FullName:{
        type:String,
        required:true,
        
    },
    password:{
        type:String,
        required:true,
        
    },
    profilepic:{
        type:String,
        default:"",
        
    },
},
{timestamps:true});

const User = mongoose.model('users',UserSchema);

export default User;