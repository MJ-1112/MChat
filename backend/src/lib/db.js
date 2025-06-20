import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config(); 

const mongoose_url = process.env.MONGO_URL;
mongoose.connect(mongoose_url)
.then(()=>{
    console.log('MongoDB Connected');
}).catch((error)=>{
    console.error('MongoDB error: ',error);
    
});