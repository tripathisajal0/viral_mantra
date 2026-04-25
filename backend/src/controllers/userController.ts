import { Response } from 'express';
import { db } from '../config/firebase';
import { AuthRequest } from '../middleware/authMiddleware';
import { UserProfile } from '../models/userModel';

// @desc    Register a new user profile in Firestore
// @route   POST /api/users/register
// @access  Private (Needs Firebase Token)
export const registerUser = async (req: AuthRequest, res: Response) => {
  try {
    const { role, name } = req.body; // 'name' comes from our Frontend form
    const { uid, email } = req.user;

    const userRef = db.collection('users').doc(uid);
    const doc = await userRef.get();

    if (doc.exists) {
      return res.status(400).json({ message: 'User already registered' });
    }

    const newUser: any = {
      uid,
      name: name || 'New User',
      email: email || '',
      role: role || 'creator',
      walletBalance: 0,
      trustScore: 100,
      totalViews: 0,
      activeCampaigns: 0,
      verificationStatus: 'pending',
      createdAt: new Date().toISOString()
    };

    await userRef.set(newUser);
    console.log(`User ${uid} registered successfully! ✅`);

    res.status(201).json(newUser);
  } catch (error: any) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userRef = db.collection('users').doc(req.user.uid);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(doc.data());
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
