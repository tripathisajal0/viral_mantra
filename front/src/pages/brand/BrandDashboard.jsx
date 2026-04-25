import React from 'react';
import Sidebar from '../../components/Sidebar';
import TopBar from '../../components/TopBar';
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
  Star,
  Megaphone
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const BrandDashboard = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = React.useState([]);
  const [notifications, setNotifications] = React.useState([]);
  const [stats, setStats] = React.useState({
    totalReach: '0',
    avgCpm: '$0.00',
    participation: '0',
    roi: '0x'
  });

  React.useEffect(() => {
    if (!user) return;

    // Fetch campaigns for this brand in real-time
    const qCampaigns = query(collection(db, "brand"), where("brandId", "==", user.uid));
    const unsubscribeCampaigns = onSnapshot(qCampaigns, (querySnapshot) => {
      const campaignsData = [];
      let totalBudgetSum = 0;
      let totalReachSum = 0;
      let totalCpmSum = 0;
      let count = 0;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        campaignsData.push({ id: doc.id, ...data });
        totalBudgetSum += parseFloat(data.budget) || 0;
        totalReachSum += parseInt(data.currentViews) || 0;
        totalCpmSum += parseFloat(data.cpm) || 0;
        count++;
      });
      
      setCampaigns(campaignsData);
      setStats(prev => ({
        ...prev,
        totalReach: totalReachSum.toLocaleString(),
        avgCpm: count > 0 ? `₹${(totalCpmSum / count).toFixed(2)}` : '₹0.00',
        totalBudget: totalBudgetSum
      }));
    });

    // Fetch total approved creators across all campaigns
    const qApproved = query(collection(db, "applications"), where("brandId", "==", user.uid), where("status", "==", "approved"));
    const unsubscribeApproved = onSnapshot(qApproved, (querySnapshot) => {
      setStats(prev => ({ ...prev, participation: querySnapshot.size.toString() }));
    });

    // Fetch pending applications for this brand in real-time
    const qApps = query(collection(db, "applications"), where("brandId", "==", user.uid), where("status", "==", "pending"));
    const unsubscribeApps = onSnapshot(qApps, (querySnapshot) => {
      const appsData = [];
      querySnapshot.forEach((doc) => {
        appsData.push({ id: doc.id, ...doc.data() });
      });
      setNotifications(appsData);
    });

    return () => {
      unsubscribeCampaigns();
      unsubscribeApproved();
      unsubscribeApps();
    };
  }, [user]);

  return (
    <div className="space-y-8">
      <div className="max-w-container-max mx-auto space-y-8">
          {/* Header Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card p-6 rounded-xl flex items-center justify-between shadow-xl shadow-indigo-500/5">
              <div className="flex items-center gap-6">
                <div>
                  <h1 className="text-h3 text-on-surface font-bold">{profile?.name || 'Loading...'}</h1>
                  <p className="text-body-md text-on-surface-variant">Active Premium Partner</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="px-4 py-2 bg-primary/5 rounded-lg border border-primary/10">
                  <span className="text-caption text-on-surface-variant block font-bold">Active Campaigns</span>
                  <span className="text-label-bold text-on-surface font-bold">{campaigns.length}</span>
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => navigate('/brand/wallet')}
              className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-xl shadow-2xl relative overflow-hidden cursor-pointer group hover:scale-[1.02] transition-all"
            >
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <span className="text-caption opacity-70">VM Points (Wallet)</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={16} />
                  </div>
                </div>
                <h2 className="text-h2 font-bold mt-1">{profile?.walletBalance?.toLocaleString() || '0'} pts</h2>
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-grow h-2 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-400" style={{ width: profile?.walletBalance > 0 ? '100%' : '0%' }}></div>
                  </div>
                  <span className="text-caption font-bold">Wallet</span>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full"></div>
            </div>
          </section>

          {/* Metrics Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Reach", value: stats.totalReach, trend: "0%", trendIcon: TrendingUp, color: "primary", subtitle: "Awaiting data" },
              { label: "Avg. CPM", value: stats.avgCpm, trend: "$0.00", trendIcon: TrendingDown, color: "secondary", subtitle: "N/A" },
              { label: "Creator Participation", value: stats.participation, trend: "No active", trendIcon: Users, color: "on-tertiary-fixed-variant", avatars: false },
              { label: "ROI Score", value: stats.roi, trend: "N/A", trendIcon: Zap, color: "on-tertiary-container", subtitle: "Benchmark: 0x" }
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
                    <div className="w-6 h-6 rounded-full bg-surface-container-high text-[10px] flex items-center justify-center border-2 border-white font-bold">+0</div>
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
                  {campaigns.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-outline">
                        <BarChart3 size={32} />
                      </div>
                      <p className="text-on-surface-variant font-medium">No campaigns launched yet.</p>
                      <button 
                        onClick={() => navigate('/brand/launch')}
                        className="mt-4 text-primary font-bold hover:underline"
                      >
                        Launch your first campaign
                      </button>
                    </div>
                  ) : (
                    campaigns.map((campaign, i) => (
                      <div 
                        key={i} 
                        onClick={() => navigate(`/brand/campaign/${campaign.id}`)}
                        className="px-6 py-5 hover:bg-white/40 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 flex items-center justify-center text-primary">
                            {campaign.assets?.brandLogo ? (
                              <img src={campaign.assets.brandLogo} alt={campaign.title} className="w-full h-full object-cover" />
                            ) : campaign.img ? (
                              <img src={campaign.img} alt={campaign.title} className="w-full h-full object-cover" />
                            ) : (
                              <Megaphone size={24} />
                            )}
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-bold text-on-surface">{campaign.title}</h4>
                            <p className="text-caption text-outline font-medium truncate max-w-md">
                              {campaign.description || 'No description provided'}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-bold text-on-surface">₹{campaign.spend?.toLocaleString() || '0.00'}</div>
                            <div className="text-caption text-outline">Total Spend</div>
                            {campaign.maxPayout > 0 && (
                              <div className="text-[10px] bg-tertiary/10 text-tertiary px-2 py-0.5 rounded mt-1 font-bold">
                                ₹{campaign.maxPayout?.toLocaleString()} per creator cap
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-caption font-bold mb-1">
                            <span className="text-on-surface-variant">Campaign Budget Progress</span>
                            <span className="text-on-surface">{campaign.progress || 0}% of ₹{campaign.budget?.toLocaleString() || '0'} total</span>
                          </div>
                          <div className="h-2 bg-surface-container-high rounded-full overflow-hidden">
                            <div className={cn("h-full", campaign.color || "bg-primary")} style={{ width: `${campaign.progress || 0}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Side Column: Approvals & Tips */}
            <div className="flex flex-col gap-6">
              <div className="glass-card rounded-2xl overflow-hidden shadow-lg">
                <div className="px-6 py-5 border-b border-outline/5 flex items-center justify-between bg-surface-container-low/50">
                  <h3 className="text-body-lg font-bold text-on-surface">Approval Queue</h3>
                  <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{notifications.length} New</span>
                </div>
                <div className="p-4 space-y-4">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-on-surface-variant text-sm font-medium">
                      Queue is empty.
                    </div>
                  ) : (
                    notifications.map((notif, i) => (
                      <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-primary/5 transition-all group border border-transparent hover:border-primary/10">
                        <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden ring-2 ring-white bg-slate-100 flex items-center justify-center">
                          {notif.creatorPhoto ? (
                            <img src={notif.creatorPhoto} alt="user" className="w-full h-full object-cover" />
                          ) : (
                            <Users size={20} className="text-outline" />
                          )}
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-bold text-on-surface">{notif.creatorName}</p>
                          <p className="text-[12px] text-on-surface-variant leading-tight mt-0.5">Applied for {notif.campaignTitle}</p>
                          <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={(e) => { e.stopPropagation(); navigate(`/brand/campaign/${notif.campaignId}`); }}
                              className="bg-primary text-white text-[11px] px-3 py-1 rounded-md font-bold"
                            >
                              Review
                            </button>
                            <button className="text-on-surface-variant text-[11px] px-3 py-1 border border-outline/20 rounded-md font-bold">Dismiss</button>
                          </div>
                        </div>
                        <div className="text-[10px] text-outline font-bold">
                          {notif.createdAt?.toDate ? new Date(notif.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </div>
        </div>
    </div>
  );
};

export default BrandDashboard;
