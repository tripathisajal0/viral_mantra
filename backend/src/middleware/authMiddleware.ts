import { Request, Response, NextFunction } from 'express';
import { auth, initialized } from '../config/firebase';

// This extends the Express Request type to include the user object
export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  // If Firebase Admin wasn't initialized (missing credentials), tell the client
  if (!initialized) {
    res.status(503).json({ message: 'Server not configured: Firebase Admin not initialized. Check serviceAccountKey.json.' });
    return;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Not authorized, no token' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify token with Firebase Admin
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Auth Middleware Error:', error);
    res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
