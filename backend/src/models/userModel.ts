export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'creator' | 'brand' | 'admin';
  walletBalance: number;
  trustScore: number;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  createdAt: string;
  photoURL?: string;
  socialLinks?: {
    youtube?: string;
    instagram?: string;
  };
}
