import express from 'express'
import { Check, Login, Logout, Profile, Signup, UpdateProfile } from '../controllers/auth.controller.js';
import { ProtectRoute } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/login',Login);
router.post('/signup',Signup);
router.post('/logout',Logout); 
router.put('/update-profile',UpdateProfile);
router.get('/check',ProtectRoute,Check);
router.get('/profile',ProtectRoute,Profile);

export default router;