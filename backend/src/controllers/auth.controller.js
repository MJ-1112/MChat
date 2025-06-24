import cloudinary from "../lib/cloudinary.js";
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
            return res.status(401).json({message:'Fill all fields'});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(402).json({message:'User not found , please register first',success:false});
        }
        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword){
            return res.status(403).json({message:'Invalid Credentials',
                success:false,
            });
            
        }
        generateToken(user._id,res);
        return res.status(201).json({message:'Login Succesfull',success:true})
    }
    catch(error)
    {
        res.status(400).json({message:error});

    }
};

export const Logout = async (req,res) =>{
    try{
       res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: "strict",  // ⬅ must match what you used in res.cookie()
    secure: false,       // ⬅ also must match (true only in HTTPS)
    path: "/",           // ⬅ good to include for safety
  });
  
        res.status(203).json({message:'Logged out successfully',success:true});

    }
    catch(error){
        res.status(400).json({message:error});

    }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { profilePic, userId } = req.body;

    if (!profilePic || !userId) {
      return res.status(400).json({ message: 'Profile picture and userId are required.' });
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: 'profile_pics',
    });

    // Update user profilePic in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).select('-password'); // ✅ correct way to exclude password

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error('❌ Error in UpdateProfile:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const Check =  (req,res)=>{
    try{

        res.status(201).json({success:true,user:req.user});
    }

    catch(error){
        res.status(401).json({message:error});

    }
}

export const Profile = async (req,res)=>{
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
        
    } catch (error) {
        res.status(401).json(error)
        
    }
}

