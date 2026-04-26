// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import './config/firebase'; // Initialize Firebase Admin
// import userRoutes from './routes/userRoutes';


// dotenv.config();

// import { db } from './config/firebase';

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// // Routes
// import viewsRoutes from './routes/viewsRoutes';
// app.use('/api/users', userRoutes);
// app.use('/api/views', viewsRoutes);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Viral Mantra API is running...');
// });

// // Test Firebase Route
// app.get('/api/test-firebase', async (req: Request, res: Response) => {
//   console.log('Testing Firebase connection...');

//   const { initialized } = require('./config/firebase');

//   if (!initialized) {
//     return res.status(500).json({
//       error: 'Firebase not initialized',
//       message: 'Please provide serviceAccountKey.json in the backend directory.'
//     });
//   }

//   try {
//     const collections = await db.listCollections();
//     const collectionIds = collections.map(col => col.id);

//     console.log('Successfully reached Firestore!');
//     res.json({
//       message: 'Firebase is connected! 🔥',
//       collections: collectionIds
//     });
//   } catch (error: any) {
//     console.error('Firebase test failed!');
//     res.status(500).json({
//       error: 'Firebase connection failed',
//       details: error.message
//     });
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port http://localhost:${PORT}`);
// });


import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { CollectionReference } from 'firebase-admin/firestore';

import './config/firebase'; // Initialize Firebase Admin
import { db } from './config/firebase';

import userRoutes from './routes/userRoutes';
import viewsRoutes from './routes/viewsRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/views', viewsRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Viral Mantra API is running...');
});

// Test Firebase Route
app.get('/api/test-firebase', async (req: Request, res: Response) => {
  console.log('Testing Firebase connection...');

  const { initialized } = require('./config/firebase');

  if (!initialized) {
    return res.status(500).json({
      error: 'Firebase not initialized',
      message: 'Please provide serviceAccountKey.json in the backend directory.',
    });
  }

  try {
    const collections = await db.listCollections();

    const collectionIds = collections.map(
      (col: CollectionReference) => col.id
    );

    console.log('Successfully reached Firestore!');

    return res.json({
      message: 'Firebase is connected! 🔥',
      collections: collectionIds,
    });
  } catch (error: any) {
    console.error('Firebase test failed!');

    return res.status(500).json({
      error: 'Firebase connection failed',
      details: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});