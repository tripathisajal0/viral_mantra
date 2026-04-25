import express from 'express';
import { registerUser, getUserProfile } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// All user routes are protected by the 'protect' middleware
router.post('/register', protect, registerUser);
router.get('/profile', protect, getUserProfile);

export default router;
