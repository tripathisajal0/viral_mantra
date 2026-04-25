import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  BarChart3, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  Zap,
  Star
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

const BrandDashboard = () => {
  const { profile } = useAuth();
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <TopBar />
      
      <main className="ml-64 pt-20 px-8 pb-12">
        <div className="max-w-container-max mx-auto space-y-8">
          {/* Header Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card p-6 rounded-xl flex items-center justify-between shadow-xl shadow-indigo-500/5">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden">
                  <img 
                    alt="Brand Logo" 
                    className="w-10 h-10 rounded-lg object-cover" 
                    src="https://images.unsplash.com/photo-1542491595-62e924f7380b?q=80&w=2070&auto=format&fit=crop" 
                  />
                </div>
                <div>
                  <h1 className="text-h3 text-on-surface font-bold">{profile?.name || 'Global Sports Inc.'}</h1>
                  <p className="text-body-md text-on-surface-variant">Active Premium Partner since 2024</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-tertiary/10 rounded-lg border border-tertiary/20">
                  <span className="text-caption text-tertiary block font-bold">Account Health</span>
                  <span className="text-label-bold text-tertiary font-bold">98% Excellent</span>
                </div>
                <div className="px-4 py-2 bg-primary/5 rounded-lg border border-primary/10">
                  <span className="text-caption text-on-surface-variant block font-bold">Active Campaigns</span>
                  <span className="text-label-bold text-on-surface font-bold">14</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-xl shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-caption opacity-70">Total Available Budget</span>
                <h2 className="text-h2 font-bold mt-1">₹{profile?.walletBalance?.toLocaleString() || '0.00'}</h2>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-grow h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-400" style={{ width: '68%' }}></div>
                  </div>
                  <span className="text-caption font-bold">68%</span>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full"></div>
            </div>
          </section>

          {/* Metrics Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Reach", value: "42.8M", trend: "+12%", trendIcon: TrendingUp, color: "primary", subtitle: "Across all platforms" },
              { label: "Avg. CPM", value: "$3.24", trend: "-$0.45", trendIcon: TrendingDown, color: "secondary", subtitle: "Optimized efficiency" },
              { label: "Creator Participation", value: "1,248", trend: "Active", trendIcon: Users, color: "on-tertiary-fixed-variant", avatars: true },
              { label: "ROI Score", value: "8.4x", trend: "High Performance", trendIcon: Zap, color: "on-tertiary-container", subtitle: "Benchmark: 4.2x" }
            ].map((metric, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className={cn("glass-card p-5 rounded-xl border-l-4", `border-${metric.color}`)}>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-on-surface-variant text-caption font-bold uppercase tracking-wider">{metric.label}</span>
                  <span className={cn(
                    "text-caption font-bold px-2 py-0.5 rounded flex items-center gap-1",
                    metric.color === "primary" ? "bg-tertiary/10 text-tertiary" : "bg-surface-container text-on-surface"
                  )}>
                    <metric.trendIcon size={12} /> {metric.trend}
                  </span>
                </div>
                <div className="text-h3 font-bold text-on-surface">{metric.value}</div>
                {metric.avatars ? (
                  <div className="flex -space-x-2 mt-2">
                    {[1, 2, 3].map(j => (
                      <img key={j} className="w-6 h-6 rounded-full border-2 border-white" src={`https://i.pravatar.cc/100?img=${j+20}`} alt="avatar" />
                    ))}
                    <div className="w-6 h-6 rounded-full bg-surface-container-high text-[10px] flex items-center justify-center border-2 border-white font-bold">+1.2k</div>
                  </div>
                ) : (
                  <p className="text-caption text-outline mt-1">{metric.subtitle}</p>
                )}
              </motion.div>
            ))}
          </section>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Live Campaign Tracking */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card rounded-2xl overflow-hidden shadow-lg border border-white/40">
                <div className="px-6 py-5 border-b border-outline/5 flex items-center justify-between">
                  <h3 className="text-body-lg font-bold text-on-surface">Live Campaign Tracking</h3>
                  <button className="text-primary text-sm font-bold hover:underline">View All</button>
                </div>
                <div className="divide-y divide-outline/5">
                  {[
                    { name: "Summer Velocity '24", info: "Influencer-led launch • 428 Creators", spend: "$142,500.00", progress: 85, cap: "$168k", color: "bg-primary" },
                    { name: "Echo Wearables Global", info: "Affiliate Program • 820 Creators", spend: "$68,200.00", progress: 34, cap: "$200k", color: "bg-secondary" },
                    { name: "Studio Audio Refresh", info: "Product Seed • 50 KOLs", spend: "$12,900.00", progress: 92, cap: "$14k", color: "bg-tertiary" }
                  ].map((campaign, i) => (
                    <div key={i} className="px-6 py-5 hover:bg-white/40 transition-colors">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0">
                          <img src={`https://picsum.photos/seed/${i+50}/100/100`} alt="campaign" />
                        </div>
                        <div className="flex-grow">
                          <h4 className="font-bold text-on-surface">{campaign.name}</h4>
                          <p className="text-caption text-outline font-medium">{campaign.info}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="font-bold text-on-surface">{campaign.spend}</div>
                          <div className="text-caption text-outline">Total Spend</div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-caption font-bold mb-1">
                          <span className="text-on-surface-variant">Spend Progress</span>
                          <span className="text-on-surface">{campaign.progress}% of {campaign.cap} cap</span>
                        </div>
                        <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                          <div className={cn("h-full", campaign.color)} style={{ width: `${campaign.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Side Column: Approvals & Tips */}
            <div className="flex flex-col gap-6">
              <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
                <div className="px-6 py-5 border-b border-outline/5 flex items-center justify-between bg-surface-container-low/50">
                  <h3 className="text-body-lg font-bold text-on-surface">Approval Queue</h3>
                  <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">12 New</span>
                </div>
                <div className="p-4 space-y-4">
                  {[
                    { name: "Alex Rivera", action: "Uploaded draft for review", time: "2m ago" },
                    { name: "Sarah Chen", action: "Applied to campaign", time: "15m ago" }
                  ].map((notif, i) => (
                    <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-primary/5 transition-all group border border-transparent hover:border-primary/10">
                      <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden ring-2 ring-white">
                        <img src={`https://i.pravatar.cc/100?img=${i+30}`} alt="user" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-sm font-bold text-on-surface">{notif.name}</p>
                        <p className="text-[12px] text-on-surface-variant leading-tight mt-0.5">{notif.action}</p>
                        <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="bg-primary text-white text-[11px] px-3 py-1 rounded-md font-bold">Review</button>
                          <button className="text-on-surface-variant text-[11px] px-3 py-1 border border-outline/20 rounded-md font-bold">Dismiss</button>
                        </div>
                      </div>
                      <div className="text-[10px] text-outline font-bold">{notif.time}</div>
                    </div>
                  ))}
                  <div className="flex items-start gap-4 p-3 rounded-xl bg-secondary/5">
                    <div className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center bg-secondary/10 text-secondary">
                      <Star size={20} />
                    </div>
                    <div className="flex-grow">
                      <p className="text-sm font-bold text-on-surface">Platform Update</p>
                      <p className="text-[12px] text-on-surface-variant leading-tight mt-0.5">ROI Analytics v2.0 is now live.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-tertiary/5 p-6 rounded-2xl border border-tertiary/20">
                <div className="flex items-center gap-2 text-tertiary mb-3">
                  <TrendingUp size={20} />
                  <span className="font-bold">ROI Optimization Tip</span>
                </div>
                <p className="text-sm text-on-tertiary-fixed-variant mb-4">
                  Video content on TikTok is currently yielding <strong className="font-bold">4.2x higher conversion</strong> than static posts.
                </p>
                <button className="w-full bg-white text-tertiary py-2 rounded-lg font-bold text-sm shadow-sm border border-tertiary/10 hover:bg-tertiary/5 transition-all">
                  Adjust Campaign Focus
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrandDashboard;
