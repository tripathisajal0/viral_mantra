import * as admin from 'firebase-admin';
import dotenv from 'dotenv';
import path from 'path';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config();

let serviceAccount;
let initialized = false;

try {
  // 1. Try to load from environment variable (JSON string)
  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
  } else {
    // 2. Try to load from file
    const serviceAccountPath = path.resolve(process.cwd(), process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 'serviceAccountKey.json');
    serviceAccount = require(serviceAccountPath);
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log(`Firebase Admin initialized for project: ${serviceAccount.project_id} ✅`);
  initialized = true;
} catch (error: any) {
  console.error('❌ Firebase Admin initialization failed!');
  if (error.code === 'MODULE_NOT_FOUND') {
    console.error('---------------------------------------------------------');
    console.error('MISSING FIREBASE CREDENTIALS:');
    console.error('1. Go to Firebase Console > Project Settings > Service Accounts');
    console.error('2. Click "Generate new private key" and download the JSON file.');
    console.error(`3. Rename it to "serviceAccountKey.json" and place it in: ${process.cwd()}`);
    console.error('OR');
    console.error('4. Set the FIREBASE_SERVICE_ACCOUNT_JSON env variable in your .env file.');
    console.error('---------------------------------------------------------');
  } else {
    console.error('Error details:', error.message);
  }
}

// Export auth and db safely (null if not initialized to prevent server crash on startup)
export const auth = initialized ? admin.auth() : null as any;
export const db = initialized ? getFirestore('default') : null as any;

export { initialized };
export default admin;
