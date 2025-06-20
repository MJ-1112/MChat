import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt"

export const Signup = async (req, res) => {
    const { FullName, email, password } = req.body;
    try {
        if (!FullName || !email || !password) {
            return res.status(401).json({ message: 'All fields not filled' });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists' ,success:false});
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const newuser = new User({FullName,email,password:hashedpassword});
        if(newuser){
            generateToken(newuser._id, res);
            await newuser.save();
            return res.status(200).json({ message: 'Signup successful',success:true });
        }

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
}

export const Login = async (req,res) =>{
    const  {email,password} = req.body;
    try{
        if(!email || !password){
            res.status(401).json({message:'Fill all fields'});
        }
        const user = await User.findOne({email});
        if(!user){
            res.status(402).json({message:'User not found , please register first',success:false});
        }
        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword){
            res.status(403).json({message:'Invalid Credentials',
                success:false,
            });
            
        }
        generateToken(user._id,res);
        res.status(201).json({message:'Login Succesfull',success:true})
    }
    catch(error)
    {
        res.status(400).json({message:error});

    }
};

export const Logout = async (req,res) =>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(203).json({message:'Logged out successfully',success:true});

    }
    catch(error){
        res.status(400).json({message:error});

    }
};