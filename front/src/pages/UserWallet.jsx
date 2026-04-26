import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  ChevronRight, 
  TrendingUp, 
  ShieldCheck,
  CreditCard,
  Banknote,
  Download,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const UserWallet = () => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState('transactions');

  // Dummy transactions for preview
  const transactions = [
    { id: 1, type: 'credit', title: 'Being Human Campaign Payout', amount: 4500, date: 'Oct 24, 2024', status: 'completed' },
    { id: 2, type: 'debit', title: 'Withdrawal to Bank (ICICI)', amount: 2000, date: 'Oct 22, 2024', status: 'completed' },
    { id: 3, type: 'credit', title: 'MamaEarth Bonus', amount: 500, date: 'Oct 20, 2024', status: 'completed' },
    { id: 4, type: 'credit', title: 'Referral Reward', amount: 100, date: 'Oct 18, 2024', status: 'pending' },
  ];

  return (
    <div className="space-y-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Header */}
          <section>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Your <span className="text-indigo-600">Wallet</span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Manage your earnings, withdrawals, and transaction history.</p>
          </section>

          {/* Balance Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Main Balance Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-md border border-white/20">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Verified Wallet</span>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
                    <Wallet size={20} />
                  </div>
                </div>

                <div>
                  <p className="text-indigo-100 text-xs font-bold uppercase tracking-wider mb-1">Total Balance</p>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight">₹{profile?.walletBalance?.toLocaleString() || '0.00'}</h2>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                    <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-widest mb-1">Lifetime Earnings</p>
                    <p className="text-xl font-bold">₹12,450</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
                    <p className="text-indigo-100 text-[10px] font-bold uppercase tracking-widest mb-1">24h Earnings</p>
                    <p className="text-xl font-bold">₹850</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Withdrawal Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 border border-indigo-100 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                  <Banknote size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Available to Withdraw</h3>
                  <p className="text-slate-400 text-xs mt-1">Funds ready to be transferred to your bank.</p>
                </div>
                <p className="text-3xl font-black text-slate-800">₹{profile?.walletBalance?.toLocaleString() || '0.00'}</p>
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 group mt-6">
                Withdraw Funds
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Transactions Section */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 bg-white p-1 rounded-2xl border border-indigo-50 shadow-sm w-fit">
                <button 
                  onClick={() => setActiveTab('transactions')}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'transactions' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-indigo-50'}`}
                >
                  Transactions
                </button>
                <button 
                  onClick={() => setActiveTab('campaigns')}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeTab === 'campaigns' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:bg-indigo-50'}`}
                >
                  Campaigns
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="p-3 bg-white rounded-xl border border-indigo-100 text-slate-500 hover:text-indigo-600 transition-colors shadow-sm">
                  <Filter size={18} />
                </button>
                <button className="flex items-center gap-2 bg-white px-4 py-3 rounded-xl border border-indigo-100 text-slate-500 font-bold text-sm hover:text-indigo-600 transition-colors shadow-sm">
                  <Download size={18} />
                  Export
                </button>
              </div>
            </div>

            {/* Transactions List */}
            <div className="bg-white rounded-3xl border border-indigo-100 shadow-sm overflow-hidden">
              <div className="divide-y divide-indigo-50">
                {transactions.map((tx) => (
                  <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-indigo-50/30 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {tx.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm md:text-base group-hover:text-indigo-600 transition-colors">{tx.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                            <Clock size={10} />
                            {tx.date}
                          </span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${tx.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-black text-lg ${tx.type === 'credit' ? 'text-green-600' : 'text-slate-800'}`}>
                        {tx.type === 'credit' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                      </p>
                      <button className="text-[10px] font-bold text-indigo-400 hover:text-indigo-600 flex items-center gap-1 mt-1 justify-end ml-auto">
                        Details
                        <ChevronRight size={10} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-slate-50 border-t border-indigo-50 flex items-center justify-center">
                <button className="text-indigo-600 font-bold text-sm hover:underline flex items-center gap-2">
                  View Full Transaction History
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </section>

        </div>
    </div>
  );
};

export default UserWallet;
