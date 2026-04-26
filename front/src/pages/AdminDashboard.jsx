import React from 'react';
import { 
  TrendingUp, 
  ShieldAlert, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Calendar, 
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  CreditCard,
  History,
  Lock,
  Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const AdminDashboard = () => {
  return (
    <div className="space-y-8 max-w-[1600px]">
        {/* Dashboard Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-h2 text-on-surface font-bold">The Nerve Center</h1>
            <p className="text-on-surface-variant text-body-md">Platform integrity and financial oversight dashboard.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-outline-variant text-on-surface font-label-bold rounded-lg hover:bg-surface-container-low transition-colors">
              <Calendar size={18} />
              Last 24 Hours
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-label-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
              <Download size={18} />
              Export Report
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Global Stats (Revenue) */}
          <div className="col-span-12 lg:col-span-8 glass-card p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs font-label-bold text-outline uppercase tracking-wider">Total Platform Revenue</p>
                <h2 className="text-h2 font-bold text-on-surface">$1,284,500.00</h2>
                <span className="text-tertiary font-label-bold text-sm flex items-center gap-1 mt-1">
                  <TrendingUp size={16} />
                  +12.5% from last month
                </span>
              </div>
              <div className="flex gap-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase">Revenue</span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase">Volume</span>
              </div>
            </div>
            
            <div className="h-64 relative bg-slate-50/50 rounded-lg overflow-hidden p-4">
              {/* Fake Chart Lines */}
              <div className="absolute inset-x-4 bottom-4 top-4 flex items-end justify-between">
                {[30, 45, 40, 65, 60, 80, 90, 75, 85, 95].map((h, i) => (
                  <div key={i} className="w-[8%] bg-primary/10 rounded-t-sm relative transition-all" style={{ height: `${h}%` }}>
                    <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-primary/40 to-primary/5 rounded-t-sm"></div>
                  </div>
                ))}
              </div>
              <svg className="absolute inset-0 w-full h-full p-4 pointer-events-none" preserveAspectRatio="none">
                <path d="M 0 150 Q 50 120, 100 130 T 200 100 T 300 80 T 400 40 T 500 20" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
              </svg>
            </div>
          </div>

          {/* Fraud Alerts & Growth */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-6 rounded-xl border-l-4 border-error shadow-sm flex-1">
              <div className="flex justify-between items-center mb-4">
                <span className="p-2 bg-error/10 text-error rounded-lg"><ShieldAlert size={20} /></span>
                <span className="text-error font-bold text-[10px] uppercase tracking-wider">Critical</span>
              </div>
              <p className="text-xs font-label-bold text-outline uppercase tracking-wider">Fraud Alerts</p>
              <h2 className="text-h3 font-bold text-on-surface">24 Active Threats</h2>
              <p className="text-sm text-on-surface-variant mt-2">Potential bot swarm detected in 'Summer Vibes' campaign.</p>
              <button className="mt-4 w-full py-2 bg-error text-white font-bold rounded-lg hover:opacity-90 transition-opacity text-sm">
                Review All Alerts
              </button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="glass-card p-6 rounded-xl border-l-4 border-tertiary shadow-sm flex-1">
              <div className="flex justify-between items-center mb-4">
                <span className="p-2 bg-tertiary/10 text-tertiary rounded-lg"><Users size={20} /></span>
                <span className="text-tertiary font-bold text-[10px] uppercase tracking-wider">+18% Growth</span>
              </div>
              <p className="text-xs font-label-bold text-outline uppercase tracking-wider">Platform Growth</p>
              <h2 className="text-h3 font-bold text-on-surface">12.4k New Creators</h2>
              <p className="text-sm text-on-surface-variant mt-2">Highest registration peak in the last 72 hours.</p>
            </motion.div>
          </div>

          {/* Moderation Queue */}
          <div className="col-span-12 lg:col-span-6 glass-card rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-h3 font-bold text-on-surface">Moderation Queue</h3>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">42 Pending</span>
            </div>
            <div className="divide-y divide-outline-variant">
              {[
                { type: "Campaign", title: "Cyber Glow Up", sub: "Creator: @neon_spark | 2m ago", img: "https://picsum.photos/seed/1/100/100" },
                { type: "Identity", title: "Identity Verification", sub: "User: Sarah J. | 15m ago", img: "https://picsum.photos/seed/2/100/100" },
                { type: "Campaign", title: "Urban Fitness", sub: "Creator: @fit_alex | 45m ago", img: "https://picsum.photos/seed/3/100/100" }
              ].map((item, i) => (
                <div key={i} className="p-4 flex items-center gap-4 hover:bg-surface-container-low transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-slate-200 overflow-hidden shrink-0">
                    <img src={item.img} alt="preview" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-on-surface text-sm">{item.type}: {item.title}</p>
                    <p className="text-xs text-on-surface-variant">{item.sub}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-error hover:bg-error/10 rounded-lg transition-colors"><XCircle size={20} /></button>
                    <button className="p-2 text-tertiary hover:bg-tertiary/10 rounded-lg transition-colors"><CheckCircle2 size={20} /></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-surface-container-low text-center">
              <a className="text-primary font-bold text-sm hover:underline" href="#">View Full Queue</a>
            </div>
          </div>

          {/* Suspicious Activity Table */}
          <div className="col-span-12 lg:col-span-6 glass-card rounded-xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h3 className="text-h3 font-bold text-on-surface">Suspicious Activity</h3>
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-error"></span>
                <span className="w-2 h-2 rounded-full bg-error opacity-50"></span>
                <span className="w-2 h-2 rounded-full bg-error opacity-20"></span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-surface-container-low text-outline text-[10px] uppercase tracking-widest">
                  <tr>
                    <th className="px-6 py-3 font-bold">Creator/Campaign</th>
                    <th className="px-6 py-3 font-bold">Authenticity</th>
                    <th className="px-6 py-3 font-bold">Status</th>
                    <th className="px-6 py-3 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {[
                    { name: "Bot_Traffic_X", reason: "Rapid surge", score: 12, status: "Flagged", color: "error" },
                    { name: "King_Crypto_Ads", reason: "Misleading", score: 34, status: "Reviewing", color: "secondary" },
                    { name: "Meta_Vibe_Agency", reason: "Payment anomaly", score: 45, status: "Reviewing", color: "secondary" }
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-surface-container-low transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-primary font-bold text-xs uppercase">
                            {row.name[0]}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-on-surface">{row.name}</p>
                            <p className="text-[10px] text-outline font-medium">{row.reason}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-outline-variant/30 rounded-full overflow-hidden">
                            <div className={cn("h-full", `bg-${row.color}`)} style={{ width: `${row.score}%` }}></div>
                          </div>
                          <span className={cn("text-[10px] font-bold", `text-${row.color}`)}>{row.score}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-black uppercase",
                          row.status === "Flagged" ? "bg-error/10 text-error" : "bg-secondary/10 text-secondary"
                        )}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-primary hover:text-indigo-700 font-bold text-xs">Investigate</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Withdrawal Queue */}
          <div className="col-span-12 glass-card rounded-xl shadow-sm p-6 mb-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-h3 font-bold text-on-surface">Withdrawal Queue</h3>
                <p className="text-sm text-on-surface-variant">Global payout management and approval system.</p>
              </div>
              <div className="flex gap-4">
                <div className="text-right">
                  <p className="text-[10px] font-bold text-outline uppercase">Pending Total</p>
                  <p className="text-xl font-bold text-on-surface">$42,910.00</p>
                </div>
                <button className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:opacity-90 transition-all shadow-lg shadow-primary/20 text-sm">
                  Batch Process All
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Bank Transfer", count: 12, amount: "$18,400", icon: ShieldCheck, color: "primary" },
                { name: "PayPal Payout", count: 28, amount: "$12,110", icon: Wallet, color: "secondary" },
                { name: "Crypto Wallet", count: 8, amount: "$12,400", icon: Lock, color: "tertiary" }
              ].map((p, i) => (
                <div key={i} className="p-4 rounded-xl bg-surface-container-low border border-outline-variant flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary">
                        <p.icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{p.name}</p>
                        <p className="text-xs text-outline">{p.count} Requests</p>
                      </div>
                    </div>
                    <span className={cn("font-bold text-sm", `text-${p.color}`)}>{p.amount}</span>
                  </div>
                  <button className={cn(
                    "w-full py-2 border text-[10px] font-bold rounded uppercase tracking-widest transition-colors",
                    `border-${p.color} text-${p.color} hover:bg-${p.color}/5`
                  )}>
                    Release Funds
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
    </div>
  );
};

export default AdminDashboard;
