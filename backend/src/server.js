import express from 'express'
import authrouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import './lib/db.js'
import msgrouter from './routes/message.route.js';
import cors from 'cors'
const app = express();
const Port = process.env.PORT;
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5174', // replace with your frontend URL
  credentials: true, // required for cookies
}));  

app.use(express.json());
app.use('/api/auth',authrouter);
app.use('/api/message',msgrouter)

app.listen(5001, ()=>{
    console.log("server is running on port 5001")
});