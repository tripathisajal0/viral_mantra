import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Eye,
  MessageSquare,
  CheckCircle2,
  Camera,
  Share2,
  Music2,
  ChevronRight,
  ChevronLeft,
  Pencil,
  LayoutGrid,
  Users,
  Wallet,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { db, isFirebaseReady } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const PLATFORM_ICONS = {
  'Instagram Reels': <Camera size={12} className="text-indigo-600" />,
  'YT Shorts': <Music2 size={12} className="text-indigo-600" />,
  'TikTok': <Share2 size={12} className="text-indigo-600" />,
};

const CreatorDashboard = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (!isFirebaseReady) {
      setLoading(false);
      return;
    }

    setLoading(true);
    console.log('[Dashboard] Fetching real-time data from "brand" collection...');
    
    // Listen to 'brand' collection (singular)
    const unsub = onSnapshot(collection(db, 'brand'), (snap) => {
      const live = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      console.log('[Dashboard] Successfully fetched', live.length, 'campaigns:', live);
      setCampaigns(live);
      setLoading(false);
    }, (err) => {
      console.error('[Dashboard] Firestore fetch error:', err.code, err.message);
      setFetchError(err.message);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const displayCampaigns = campaigns;

  return (
    <div className="space-y-6 md:space-y-8">

          {/* Welcome Header */}
          <section>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Welcome Back,{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {profile?.name || 'Creator'}
              </span>
            </h1>
            <p className="text-slate-500 text-sm mt-1">Here's what's happening with your campaigns today.</p>
          </section>

          {/* Profile & Earnings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Profile Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-indigo-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8 text-center sm:text-left">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-indigo-50 shadow-lg">
                  <img
                    src={profile?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop"}
                    className="w-full h-full object-cover"
                    alt="Profile"
                  />
                </div>
                <div className="pt-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                    <h2 className="text-xl font-bold">{profile?.name || 'Creator'}</h2>
                    <Pencil size={14} className="text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors" />
                  </div>
                  <p className="text-slate-400 text-xs font-medium">
                    Member since {profile?.createdAt
                      ? new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                      : 'March 2026'}
                  </p>
                  <div className="mt-2 inline-flex items-center gap-2 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                    <CheckCircle2 size={12} className="text-indigo-500" />
                    <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider">Verified Creator</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Users, label: 'Followers', value: profile?.followers?.toLocaleString() || '—' },
                  { icon: Music2, label: 'Platforms', value: profile?.platforms?.length || '0' },
                  { icon: Camera, label: 'Campaigns', value: profile?.campaigns?.length || '0' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-indigo-50 p-3 md:p-4 rounded-xl border border-indigo-100 text-center">
                    <div className="flex items-center justify-center gap-1 text-indigo-500 mb-1">
                      <Icon size={12} />
                      <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest truncate">{label}</span>
                    </div>
                    <p className="text-base md:text-xl font-bold text-slate-800">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings Card */}
            <div className="bg-gradient-to-br from-indigo-900 to-indigo-700 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between shadow-xl shadow-indigo-300">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <div className="flex items-center gap-2 text-indigo-300 mb-3">
                      <Wallet size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Wallet Balance</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter">
                      ₹{profile?.walletBalance?.toLocaleString() || '0.00'}
                    </h3>
                    <p className="mt-3 text-indigo-300 text-xs font-bold flex items-center gap-2">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full" />
                      Pending{' '}
                      <span className="text-white">₹{profile?.pendingEarnings?.toLocaleString() || '0.00'}</span>
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate('/my-campaigns')}
                    className="w-full sm:w-auto bg-white text-indigo-700 px-5 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition-all"
                  >
                    <LayoutGrid size={16} />
                    My Campaigns
                  </button>
                </div>
              </div>
              <div className="relative z-10 mt-8">
                <div className="h-1.5 w-full bg-indigo-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-400 to-purple-400 w-0" />
                </div>
                <div className="flex justify-between mt-2 text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
                  <span>Daily Goal</span>
                  <span>0% Achieved</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              {
                title: 'Total Views',
                value: profile?.totalViews?.toLocaleString() || '0',
                stats: [
                  { icon: Eye, color: 'indigo', label: 'Total' },
                  { icon: Camera, color: 'orange', label: 'IG Reels' },
                  { icon: Music2, color: 'red', label: 'YT Shorts' },
                ]
              },
              {
                title: 'Submissions',
                value: (campaigns.filter(c => c.requests?.some(r => r.creatorId === profile?.uid)).length).toString(),
                stats: [
                  { 
                    icon: CheckCircle2, 
                    color: 'indigo', 
                    label: 'Approved',
                    count: campaigns.filter(c => c.requests?.some(r => r.creatorId === profile?.uid && r.status === 'approved')).length 
                  },
                  { 
                    icon: MessageSquare, 
                    color: 'yellow', 
                    label: 'Pending',
                    count: campaigns.filter(c => c.requests?.some(r => r.creatorId === profile?.uid && r.status === 'pending')).length
                  },
                  { 
                    icon: Share2, 
                    color: 'purple', 
                    label: 'Rejected',
                    count: campaigns.filter(c => c.requests?.some(r => r.creatorId === profile?.uid && r.status === 'rejected')).length
                  },
                ]
              }
            ].map(({ title, value, stats }) => (
              <div key={title} className="bg-white rounded-2xl p-6 md:p-8 border border-indigo-100 shadow-sm">
                <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3">{title}</p>
                <h4 className="text-4xl md:text-5xl font-black mb-6 text-slate-800">{value}</h4>
                <div className="grid grid-cols-3 gap-2">
                  {stats.map(({ icon: Icon, color, label, count }) => (
                    <div key={label} className={`flex flex-col items-center justify-center gap-1 bg-${color}-50 border border-${color}-100 py-3 rounded-xl`}>
                      <div className="flex items-center gap-1.5">
                        <Icon size={12} className={`text-${color}-500`} />
                        <span className="text-[10px] md:text-xs font-bold text-slate-700">{label}</span>
                      </div>
                      {count !== undefined && <span className="text-sm font-black text-slate-800">{count}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Active Campaigns */}
          <section className="space-y-4 md:space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl md:text-2xl font-bold">Active Campaigns</h2>
                {!loading && (
                  <p className="text-slate-400 text-xs mt-0.5">{campaigns.length} campaign{campaigns.length !== 1 ? 's' : ''} available</p>
                )}
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-white rounded-xl border border-indigo-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-sm">
                  <ChevronLeft size={18} />
                </button>
                <button className="p-2 bg-white rounded-xl border border-indigo-100 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors shadow-sm">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="text-indigo-500 animate-spin" />
              </div>
            )}

            {/* Empty */}
            {!loading && displayCampaigns.length === 0 && (
              <div className="bg-white rounded-2xl border border-indigo-100 p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <LayoutGrid size={28} className="text-indigo-400" />
                </div>
                <h3 className="font-bold text-slate-700 mb-1">No active campaigns yet</h3>
                <p className="text-slate-400 text-sm">Check back soon — brands will post campaigns here.</p>
              </div>
            )}
                    {/* Campaign Cards */}
            {!loading && displayCampaigns.length > 0 && (
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
                {displayCampaigns.map((campaign) => (
                  <motion.div
                    key={campaign.id}
                    whileHover={{ y: -6 }}
                    onClick={() => navigate(`/campaign/${campaign.id}`)}
                    className="bg-white rounded-2xl overflow-hidden border border-indigo-100 shadow-sm group cursor-pointer hover:shadow-md hover:shadow-indigo-100 transition-shadow"
                  >
                    {/* Thumbnail / Brand Logo */}
                    <div className="h-40 md:h-48 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
                      {campaign.assets?.brandLogo ? (
                        <img
                          src={campaign.assets.brandLogo}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          alt={campaign.title}
                        />
                      ) : (
                        <div className="text-4xl font-black text-indigo-200 select-none">
                          {campaign.title?.[0] || '?'}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Platform icons */}
                      <div className="absolute top-3 right-3 flex gap-1.5">
                        {(campaign.platforms || []).map((p, i) => (
                          <div key={i} className="w-7 h-7 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center border border-indigo-100 shadow-sm">
                            {PLATFORM_ICONS[p] || <Share2 size={12} className="text-indigo-600" />}
                          </div>
                        ))}
                      </div>

                      {/* CPM badge */}
                      {campaign.cpm && (
                        <div className="absolute bottom-3 left-3 bg-indigo-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-lg">
                          ₹{campaign.cpm} CPM
                        </div>
                      )}
                    </div>

                    <div className="p-4 bg-white">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{campaign.brandName || 'Brand'}</span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {campaign.title}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1 capitalize">{campaign.category || 'General'}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

    </div>
  );
};

export default CreatorDashboard;
