import express from 'express'
import { Login, Logout, Signup, UpdateProfile } from '../controllers/auth.controller.js';
import { ProtectRoute } from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/login',Login);
router.post('/signup',Signup);
router.post('/logout',Logout); 
router.route('/update-profile',ProtectRoute,UpdateProfile);
export default router;