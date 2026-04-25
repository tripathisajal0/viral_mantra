import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './config/firebase'; // Initialize Firebase Admin
import userRoutes from './routes/userRoutes';


dotenv.config();

import { db } from './config/firebase';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Viral Mantra API is running...');
});

// Test Firebase Route
app.get('/api/test-firebase', async (req: Request, res: Response) => {
  console.log('Testing Firebase connection (Listing Collections)...');
  try {
    const collections = await db.listCollections();
    const collectionIds = collections.map(col => col.id);
    
    console.log('Successfully reached Firestore!');
    res.json({
      message: 'Firebase is connected! 🔥',
      collections: collectionIds
    });
  } catch (error: any) {
    console.error('Firebase test failed! Details below:');
    console.error('Code:', error.code);
    console.error('Message:', error.message);
    
    res.status(500).json({ 
      error: 'Firebase connection failed', 
      code: error.code,
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
