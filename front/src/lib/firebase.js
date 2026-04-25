import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

let app;
let auth;
let db;
let analytics;

const isConfigValid = !!firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your_api_key_here';

if (isConfigValid) {
  try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
    console.log("Firebase (lib) initialized successfully ✅");
  } catch (error) {
    console.error("Firebase (lib) initialization failed:", error);
  }
} else {
  console.warn("⚠️ Firebase configuration is missing or invalid in src/lib/firebase.js.");
  auth = { currentUser: null, onAuthStateChanged: () => () => {} };
  db = {};
  analytics = null;
}

export { auth, db, analytics };

export default app;
