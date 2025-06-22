import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async (req,res)=>{
    try {
        const loggedUserId = req.user._id;
        const filteredUsers = await User.find({_id: {$ne: loggedUserId}}).select("-password");

        res.status(201).json(filteredUsers);
        
    } catch (error) {
        res.status(401).json(error)
    }
}

export const getMessages = async (req,res )=>{
    try {
        const {id: userToChatId} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or:[
                {senderId: myId, recieverId:userToChatId},
                {senderId: userToChatId, recieverId:myId},
            ],
        })        
  res.status(200).json(messages);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
}

export const sendMessages = async (req,res)=>{
    try {
        const {text, image} = req.body;
        const {id: recieverId} = req.params;
        const senderId=req.user._id;
        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image:imageUrl,
        });

        await newMessage.save();

        res.status(201).json('Message sent or saved');

        
    } catch (error) {
        res.status(401).json(error);
        
    }
}