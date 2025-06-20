import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';

export const ProtectRoute = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            res.status(401).json({message:'Unautharised-No Token Found'});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            res.status(401).json({message:'Unautharised-Invalid Token'});
        }
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            res.status(401).json({message:'User Not found'});

        }

        req.user = user;

        next();
        
    } catch (error) {
        res.status(401).json({message:error});
        
    }

}