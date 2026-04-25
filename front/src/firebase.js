import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// REPLACE THESE with your actual config from Firebase Console!
const firebaseConfig = {
  apiKey: "AIzaSyCbuti144CurPSqYNmP-3Dn7jeHMRwWU3Y",
  authDomain: "viralmantra.firebaseapp.com",
  projectId: "viralmantra",
  storageBucket: "viralmantra.firebasestorage.app",
  messagingSenderId: "476543900015",
  appId: "1:476543900015:web:1c741819e53ae24293b09a",
  measurementId: "G-T4W42E6N79"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "default");
export const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const logout = () => signOut(auth);

export default app;
