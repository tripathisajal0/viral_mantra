import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  setDoc, 
  doc, 
  updateDoc, 
  query, 
  where, 
  getDocs,
  serverTimestamp 
} from 'firebase/firestore';

/**
 * USERS COLLECTION LOGIC
 */

// User document is created in LoginPage.jsx during signup.

/**
 * CAMPAIGNS COLLECTION LOGIC
 */
export const createCampaign = async (brandId, campaignData) => {
  try {
    const docRef = await addDoc(collection(db, "campaigns"), {
      brandId,
      ...campaignData,
      status: 'active',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating campaign: ", error);
    throw error;
  }
};

/**
 * PARTICIPATIONS (SUBMISSIONS) COLLECTION LOGIC
 */
export const submitParticipation = async (campaignId, creatorId, videoUrl) => {
  try {
    const docRef = await addDoc(collection(db, "participations"), {
      campaignId,
      creatorId,
      videoUrl,
      verifiedViews: 0,
      estimatedPayout: 0,
      status: 'pending',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting participation: ", error);
    throw error;
  }
};

/**
 * TRANSACTIONS COLLECTION LOGIC
 */
export const createTransaction = async (userId, amount, type, status = 'pending') => {
  try {
    const docRef = await addDoc(collection(db, "transactions"), {
      userId,
      amount,
      type, // 'deposit', 'withdrawal', 'escrow'
      status,
      timestamp: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating transaction: ", error);
    throw error;
  }
};

/**
 * USER SUBCOLLECTIONS
 */
export const addSocialLink = async (userId, platform, handle) => {
  try {
    const linkRef = doc(db, "users", userId, "socialLinks", platform);
    await setDoc(linkRef, {
      platform,
      handle,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error adding social link: ", error);
    throw error;
  }
};

export const addPaymentMethod = async (userId, methodData) => {
  try {
    const methodRef = await addDoc(collection(db, "users", userId, "paymentMethods"), {
      ...methodData,
      createdAt: serverTimestamp()
    });
    return methodRef.id;
  } catch (error) {
    console.error("Error adding payment method: ", error);
    throw error;
  }
};
