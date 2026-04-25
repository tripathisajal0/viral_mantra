import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { TrendingUp, Eye, Rocket, CreditCard, ListFilter, Bookmark, PlusCircle, Video, Camera, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const CreatorDashboard = () => {
  const { profile } = useAuth();
  return (
    <div className="space-y-8">
      <div className="max-w-container-max mx-auto space-y-8">
          {/* Header Section */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-4 py-4">
            <div>
              <h2 className="text-h2 text-on-surface font-bold">Welcome back, {profile?.name || 'Creator'}!</h2>
              <p className="text-body-lg text-outline">Manage your campaigns and track your performance.</p>
            </div>
            <div className="flex items-center gap-2 bg-tertiary-fixed text-on-tertiary-fixed px-4 py-2 rounded-lg font-label-bold shadow-sm">
              <TrendingUp size={16} />
              <span>Performance up 14% vs last month</span>
            </div>
          </section>

          {/* Metric Bento Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-xl flex flex-col justify-between shadow-lg shadow-indigo-500/5">
              <div className="flex justify-between items-start">
                <span className="p-2 bg-primary/10 text-primary rounded-lg"><Eye size={20} /></span>
                <span className="text-on-tertiary-fixed-variant text-caption font-bold">+8.2%</span>
              </div>
              <div className="mt-4">
                <p className="text-outline font-label-bold text-caption uppercase tracking-wider">Total Views</p>
                <h3 className="text-h3 font-bold">{profile?.totalViews?.toLocaleString() || '0'}</h3>
              </div>
              <div className="mt-2 h-1 bg-surface-container rounded-full overflow-hidden">
                <div className="h-full bg-primary w-2/3"></div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-xl flex flex-col justify-between shadow-lg shadow-indigo-500/5">
              <div className="flex justify-between items-start">
                <span className="p-2 bg-secondary/10 text-secondary rounded-lg"><Rocket size={20} /></span>
                <span className="text-on-tertiary-fixed-variant text-caption font-bold">Active</span>
              </div>
              <div className="mt-4">
                <p className="text-outline font-label-bold text-caption uppercase tracking-wider">Active Campaigns</p>
                <h3 className="text-h3 font-bold">{profile?.activeCampaigns || '0'}</h3>
              </div>
              <div className="flex -space-x-2 mt-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="brand" />
                  </div>
                ))}
                <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-[10px] font-bold">+9</div>
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="glass-card p-6 rounded-xl flex flex-col justify-between shadow-lg shadow-indigo-500/5 lg:col-span-2">
              <div className="flex justify-between items-start">
                <span className="p-2 bg-tertiary/10 text-tertiary rounded-lg"><CreditCard size={20} /></span>
                <button className="text-primary font-label-bold text-caption hover:underline">Withdraw</button>
              </div>
              <div className="flex items-end justify-between mt-4">
                <div>
                  <p className="text-outline font-label-bold text-caption uppercase tracking-wider">Wallet Balance</p>
                  <h3 className="text-h3 font-bold text-on-surface">₹{profile?.walletBalance?.toLocaleString() || '0.00'}</h3>
                </div>
                <div className="flex gap-1 items-end h-12">
                  <div className="w-3 bg-tertiary/20 rounded-t-sm h-1/2"></div>
                  <div className="w-3 bg-tertiary/20 rounded-t-sm h-3/4"></div>
                  <div className="w-3 bg-tertiary/20 rounded-t-sm h-2/3"></div>
                  <div className="w-3 bg-tertiary/40 rounded-t-sm h-5/6"></div>
                  <div className="w-3 bg-tertiary rounded-t-sm h-full shadow-[0_0_10px_rgba(52,80,0,0.3)]"></div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Active Campaigns Table */}
            <div className="xl:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-h3 font-bold flex items-center gap-2">
                  <ListFilter className="text-primary" size={24} />
                  Active Campaigns
                </h3>
                <button className="text-primary font-label-bold text-body-md hover:underline">View All</button>
              </div>
              <div className="glass-card rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low border-b border-white/20">
                    <tr>
                      <th className="p-4 font-label-bold text-caption text-outline uppercase tracking-wider">Campaign</th>
                      <th className="p-4 font-label-bold text-caption text-outline uppercase tracking-wider">Status</th>
                      <th className="p-4 font-label-bold text-caption text-outline uppercase tracking-wider">Progress</th>
                      <th className="p-4 font-label-bold text-caption text-outline uppercase tracking-wider">Views</th>
                      <th className="p-4 font-label-bold text-caption text-outline uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { name: "Neo-Summer 24", brand: "Nike", status: "Live", progress: 75, views: "840K" },
                      { name: "Origin Launch", brand: "Adobe", status: "Reviewing", progress: 20, views: "--" },
                      { name: "Ultimate Refresh", brand: "Sprite", status: "Live", progress: 92, views: "1.2M" }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-white/50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center font-bold text-primary">
                              {row.brand[0]}
                            </div>
                            <div>
                              <p className="font-label-bold text-body-md">{row.name}</p>
                              <p className="text-caption text-outline">{row.brand}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-caption font-bold",
                            row.status === "Live" ? "bg-tertiary-fixed text-on-tertiary-fixed" : "bg-surface-container text-primary"
                          )}>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-surface-container rounded-full min-w-[60px]">
                              <div className="h-full bg-primary rounded-full" style={{ width: `${row.progress}%` }}></div>
                            </div>
                            <span className="text-caption font-bold">{row.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4 font-label-bold">{row.views}</td>
                        <td className="p-4 text-right">
                          <button className="text-primary hover:text-indigo-700 font-bold text-caption">Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommended Feed */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-h3 font-bold">Discovery</h3>
                <span className="p-2 bg-surface-container-high text-primary rounded-full cursor-pointer"><ListFilter size={16} /></span>
              </div>
              <div className="space-y-4">
                <motion.div whileHover={{ scale: 1.02 }} className="glass-card group p-4 rounded-xl transition-all border-l-4 border-l-primary">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-1 bg-surface-container-highest text-primary rounded text-[10px] font-black uppercase">High Demand</span>
                    <Bookmark size={16} className="text-outline group-hover:text-primary cursor-pointer" />
                  </div>
                  <h4 className="font-label-bold text-body-md mb-1">Urban Tech Gear Series</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-slate-800"></div>
                    <span className="text-caption font-medium text-on-surface-variant">Razer x ViralMantra</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 bg-surface-container/30 p-2 rounded-lg">
                    <div>
                      <p className="text-[10px] text-outline font-bold">CPM</p>
                      <p className="text-body-md font-black text-primary">$45.00</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-outline font-bold">PLATFORMS</p>
                      <div className="flex gap-1 mt-1">
                        <Video size={12} />
                        <Camera size={12} />
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 bg-primary text-white font-label-bold text-caption rounded-lg hover:opacity-90 transition-opacity">
                    Apply Now
                  </button>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }} className="glass-card group p-4 rounded-xl transition-all border-l-4 border-l-secondary">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-1 bg-secondary-fixed text-secondary rounded text-[10px] font-black uppercase">Lifestyle</span>
                    <Bookmark size={16} className="text-outline group-hover:text-secondary cursor-pointer" />
                  </div>
                  <h4 className="font-label-bold text-body-md mb-1">Organic Glow Wellness</h4>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-5 h-5 rounded-full bg-pink-100 flex items-center justify-center text-[10px] font-bold text-pink-600">S</div>
                    <span className="text-caption font-medium text-on-surface-variant">Sephora Official</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 bg-surface-container/30 p-2 rounded-lg">
                    <div>
                      <p className="text-[10px] text-outline font-bold">CPM</p>
                      <p className="text-body-md font-black text-secondary">$32.50</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-outline font-bold">PLATFORMS</p>
                      <div className="flex gap-1 mt-1">
                        <Play size={12} />
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 border border-secondary text-secondary font-label-bold text-caption rounded-lg hover:bg-secondary/5 transition-colors">
                    Apply Now
                  </button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom Growth Visualization */}
          <section className="glass-card p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-h3 font-bold">Audience Growth</h3>
                <p className="text-outline text-caption">Engagement metrics across all connected social channels</p>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-surface-container text-on-surface text-caption font-bold rounded-full">Last 7d</button>
                <button className="px-3 py-1 text-outline text-caption font-bold rounded-full hover:bg-surface-container transition-colors">Last 30d</button>
              </div>
            </div>
            <div className="h-64 relative">
              <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
                {[40, 55, 45, 70, 60, 85, 75].map((h, i) => (
                  <div key={i} className="w-[10%] bg-primary/10 rounded-t-lg relative group transition-all" style={{ height: `${h}%` }}>
                    <div className={cn(
                      "absolute bottom-0 w-full h-full rounded-t-lg transition-all",
                      i === 5 ? "bg-primary shadow-[0_0_20px_rgba(79,70,229,0.2)]" : "bg-gradient-to-t from-primary/40 to-primary/0"
                    )}></div>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-on-surface text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {Math.round(h * 0.3 + 10)}k
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 border-b border-l border-slate-100 pointer-events-none">
                <div className="absolute top-1/4 w-full border-t border-slate-50 border-dashed"></div>
                <div className="absolute top-2/4 w-full border-t border-slate-50 border-dashed"></div>
                <div className="absolute top-3/4 w-full border-t border-slate-50 border-dashed"></div>
              </div>
            </div>
            <div className="flex justify-between mt-4 px-4 text-[10px] font-bold text-outline uppercase">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <span key={day} className={i === 5 ? "text-primary" : ""}>{day}</span>
              ))}
            </div>
          </section>
        </div>

      {/* FAB */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="flex items-center gap-2 bg-gradient-to-tr from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-full shadow-2xl shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all">
          <PlusCircle size={24} />
          <span className="font-label-bold text-label-bold">New Post</span>
        </button>
      </div>
    </div>
  );
};

export default CreatorDashboard;
