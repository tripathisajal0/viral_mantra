import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

// Using absolute path to make sure we find the file
const serviceAccountPath = path.resolve(process.cwd(), process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 'serviceAccountKey.json');

// Load the service account JSON to get the project ID
const serviceAccount = require(serviceAccountPath);

import { getFirestore } from 'firebase-admin/firestore';

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log(`Firebase Admin initialized for project: ${serviceAccount.project_id} ✅`);
} catch (error) {
  console.error('Firebase Admin initialization failed:', error);
}

export const auth = admin.auth();
// Using the correct syntax for custom database IDs
export const db = getFirestore('default'); 

export default admin;
