import express from 'express'
import { Check, Login, Logout, Signup, UpdateProfile } from '../controllers/auth.controller.js';
import { ProtectRoute } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/login',Login);
router.post('/signup',Signup);
router.post('/logout',Logout); 
router.put('/update-profile',ProtectRoute,UpdateProfile);
router.get('/check',ProtectRoute,Check);

export default router;