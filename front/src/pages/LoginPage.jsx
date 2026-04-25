import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth } from '../firebase';
import { db } from '../firebase'; // Note: if db is not in firebase.js, I should add it
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { LogIn, UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, profile } = useAuth();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [extraField, setExtraField] = useState(''); // Company for brand, Instagram for creator
  const [selectedRole, setSelectedRole] = useState(location.state?.role || 'creator');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (user && profile) {
      navigate(profile.role === 'brand' ? '/brand' : '/creator');
    }
  }, [user, profile, navigate]);

  // Clear error message when switching between Login and Sign Up
  React.useEffect(() => {
    setError('');
  }, [isLogin]);

  const handleAuth = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        console.log("Attempting Login...");
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        console.log("Attempting Sign Up...");
        await createUserWithEmailAndPassword(auth, email, password);
        console.log("Sign Up success, registering in backend with name:", fullName);
        await register(selectedRole, fullName);
      }

      console.log("Auth success! Profile will load and navigate...");
    } catch (err) {
      console.error("FULL AUTH ERROR:", err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found') {
        setError("User not present. You need to create an account below!");
        setIsLogin(false); // Automatically move them to Sign Up
      } else {
        setError(err.response?.data?.message || err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        setError("User not present. You need to create an account below!");
        setIsLogin(false); // Automatically move them to Sign Up
        await auth.signOut();
        return;
      }

      // Existing user found
      console.log("Google Auth success! Profile will load and navigate...");
    } catch (err) {
      console.error("GOOGLE ERROR:", err);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">Viral Mantra</h1>
          <p className="text-on-surface-variant font-medium">
            {isLogin ? `Welcome back!` : `Join the elite marketplace`}
          </p>
        </div>

        {!isLogin && (
          <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
            <button 
              onClick={() => setSelectedRole('creator')}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all",
                selectedRole === 'creator' ? "bg-white shadow-sm text-indigo-600" : "text-slate-500"
              )}
            >
              Creator
            </button>
            <button 
              onClick={() => setSelectedRole('brand')}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-xs font-bold transition-all",
                selectedRole === 'brand' ? "bg-white shadow-sm text-purple-600" : "text-slate-500"
              )}
            >
              Brand
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-xl text-error text-xs font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                <input
                  className="w-full bg-white border border-outline-variant rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all text-sm font-medium"
                  placeholder="Full Name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <ArrowRight className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
                <input
                  className="w-full bg-white border border-outline-variant rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all text-sm font-medium"
                  placeholder={selectedRole === 'brand' ? "Company Name" : "Instagram @handle"}
                  type="text"
                  value={extraField}
                  onChange={(e) => setExtraField(e.target.value)}
                  required
                />
              </div>
            </>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input
              className="w-full bg-white border border-outline-variant rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all text-sm font-medium"
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline" size={18} />
            <input
              className="w-full bg-white border border-outline-variant rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all text-sm font-medium"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(
              "w-full text-white py-4 rounded-2xl font-bold shadow-xl transition-all flex items-center justify-center gap-2",
              selectedRole === 'brand' 
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 shadow-purple-500/20" 
                : "bg-gradient-to-r from-indigo-600 to-purple-600 shadow-indigo-500/20",
              loading ? "opacity-70" : "hover:scale-[1.02] active:scale-95"
            )}
          >
            {loading ? "Processing..." : (isLogin ? "Sign In" : "Create Account")}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant"></div></div>
            <div className="relative flex justify-center text-xs uppercase font-bold text-outline">
              <span className="bg-white px-4">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white border border-outline-variant py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
            <span className="text-sm">Google Account</span>
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-on-surface-variant font-medium">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="ml-2 text-primary font-bold hover:underline"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
