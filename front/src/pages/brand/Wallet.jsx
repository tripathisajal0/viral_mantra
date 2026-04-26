import React, { useState } from 'react';
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  History, 
  CreditCard, 
  Zap, 
  ShieldCheck,
  ChevronRight,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { doc, updateDoc, increment, addDoc, collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { cn } from '../../lib/utils';
import { db } from '../../firebase';

const Wallet = () => {
  const { profile, user } = useAuth();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  React.useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "transactions"), 
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const txs = [];
      querySnapshot.forEach((doc) => {
        txs.push({ id: doc.id, ...doc.data() });
      });
      setTransactions(txs);
    });

    return () => unsubscribe();
  }, [user]);

  const handlePurchase = async () => {
    if (!amount || parseFloat(amount) <= 0) return alert("Please enter a valid amount");
    
    setLoading(true);
    // Simulate Razorpay Payment
    setTimeout(async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          walletBalance: increment(parseFloat(amount))
        });
        
        // Record Transaction
        await addDoc(collection(db, "transactions"), {
          userId: user.uid,
          type: 'Wallet Topup',
          detail: 'Razorpay Payment',
          amount: parseFloat(amount),
          status: 'Credited',
          createdAt: new Date()
        });

        alert(`Successfully added ${amount} VM Points!`);
        setAmount('');
      } catch (error) {
        console.error("Wallet update error:", error);
        alert("Failed to update wallet");
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div className="max-w-[1000px] mx-auto">
        <header className="mb-8">
          <h1 className="text-h1 font-bold text-on-surface">VM Points Wallet</h1>
          <p className="text-body-md text-on-surface-variant">Purchase and manage your Viral Mantra advertising credits.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Wallet Card */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-indigo-900 via-slate-900 to-black p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-xl border border-white/10">
                    <WalletIcon size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-bold mb-1">Current Balance</p>
                    <h2 className="text-4xl font-bold font-mono tracking-tight">
                      {profile?.walletBalance?.toLocaleString() || '0'} <span className="text-indigo-400 text-lg">pts</span>
                    </h2>
                  </div>
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-caption opacity-60 font-bold uppercase tracking-wider mb-2">Linked Account</p>
                    <p className="font-bold text-sm">{profile?.name || 'Loading...'}</p>
                    <p className="text-[10px] opacity-40 font-mono mt-1 tracking-widest">{user?.uid?.slice(0, 16)}...</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-10 h-6 bg-white/10 rounded border border-white/5"></div>
                    <div className="w-10 h-6 bg-white/10 rounded border border-white/5"></div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
            </motion.div>

            {/* Quick Actions / Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-6 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center mb-4">
                  <Zap size={20} />
                </div>
                <h4 className="font-bold text-on-surface mb-1">Instant Credit</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Purchased points are instantly available for campaign launches.</p>
              </div>
              <div className="glass-card p-6 rounded-2xl">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center mb-4">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="font-bold text-on-surface mb-1">Secure Payments</h4>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">Transactions are encrypted and processed via Razorpay gateway.</p>
              </div>
            </div>
          </div>

          {/* Top up Section */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-3xl p-8 border border-white/40 shadow-xl h-full flex flex-col">
              <h3 className="text-xl font-bold text-on-surface mb-2">Purchase VM Points</h3>
              <p className="text-caption text-on-surface-variant mb-8">Conversion rate: 1 INR = 1 VM Point</p>
              
              <div className="space-y-6 flex-grow">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-outline uppercase tracking-widest">Enter Amount (INR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-outline font-bold text-lg">₹</span>
                    <input 
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full bg-white border-2 border-outline-variant focus:border-primary rounded-2xl py-4 pl-10 pr-4 text-xl font-bold outline-none transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[500, 1000, 5000].map(val => (
                    <button 
                      key={val}
                      onClick={() => setAmount(val.toString())}
                      className="py-2 rounded-xl border border-outline-variant text-xs font-bold hover:border-primary hover:text-primary transition-all bg-white"
                    >
                      +₹{val.toLocaleString()}
                    </button>
                  ))}
                </div>

                <div className="pt-6 border-t border-outline-variant/30 mt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-outline">You will receive</span>
                    <span className="text-lg font-bold text-on-surface">{amount || '0'} VM Points</span>
                  </div>
                  <button 
                    disabled={loading || !amount}
                    onClick={handlePurchase}
                    className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <CreditCard size={20} />
                        Purchase Points
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History Mockup */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-on-surface flex items-center gap-2">
              <History size={20} className="text-primary" />
              Recent Transactions
            </h3>
            <button className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
              View Statement <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="glass-card rounded-2xl overflow-hidden divide-y divide-outline-variant/10">
            {transactions.length === 0 ? (
              <div className="p-12 text-center text-on-surface-variant font-medium">
                No transactions yet.
              </div>
            ) : (
              transactions.map((tx, i) => (
                <div key={tx.id || i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      tx.amount > 0 ? "bg-green-50 text-green-600" : "bg-slate-50 text-on-surface-variant"
                    )}>
                      {tx.amount > 0 ? <Plus size={18} /> : <ArrowUpRight size={18} />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">{tx.type}</p>
                      <p className="text-[11px] text-outline">
                        {tx.detail} • {tx.createdAt?.toDate ? new Date(tx.createdAt.toDate()).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'Processing...'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("font-bold text-sm", tx.amount > 0 ? "text-green-600" : "text-on-surface")}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} pts
                    </p>
                    <p className="text-[10px] text-outline font-bold uppercase">{tx.status}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
