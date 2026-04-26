export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'creator' | 'brand' | 'admin';
  walletBalance: number;
  trustScore: number;
  campaignsLaunched: number;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  photoURL?: string;
  socialLinks?: {
    youtube?: string;
    instagram?: string;
  };
  campaigns: string[]; // Store campaign IDs for both creators (joined/requested) and brands (created)
}
