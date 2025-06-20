import express from 'express'
import router from './routes/auth.route.js';
import './lib/db.js'
const app = express();
const Port = process.env.PORT;

app.use(express.json());
app.use('/api/auth',router);

app.listen(5001, ()=>{
    console.log("server is running on port 5001")
});