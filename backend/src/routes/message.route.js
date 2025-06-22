import express from 'express';
import { ProtectRoute } from '../middlewares/auth.middleware.js';
import { getMessages, getUsersForSidebar, sendMessages } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/users',ProtectRoute,getUsersForSidebar);
router.get('/:id',ProtectRoute, getMessages);
router.get('/send/:id',ProtectRoute, sendMessages);

export default router;