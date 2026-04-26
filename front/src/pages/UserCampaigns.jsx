import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Camera,
  Share2,
  Music2,
  LayoutGrid,
  Loader2,
  ArrowLeft,
  Search,
  Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { db, isFirebaseReady } from '../firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const PLATFORM_ICONS = {
  'Instagram Reels': <Camera size={12} className="text-indigo-600" />,
  'YT Shorts': <Music2 size={12} className="text-indigo-600" />,
  'TikTok': <Share2 size={12} className="text-indigo-600" />,
};

const UserCampaigns = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    if (!profile?.campaigns || profile.campaigns.length === 0) {
      setCampaigns([]);
      setLoading(false);
      return;
    }

    // Support both ID strings and full campaign objects
    const formattedCampaigns = profile.campaigns.map(c => 
      typeof c === 'string' ? { id: c, title: c } : { id: c.campaignId, ...c }
    );
    
    setCampaigns(formattedCampaigns);
    setLoading(false);
  }, [profile?.campaigns]);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button 
            onClick={() => navigate('/creator')}
            className="flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-colors mb-2 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </button>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-800">
            My <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Campaigns</span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage and track all campaigns you've participated in.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search campaigns..." 
              className="w-full bg-white border border-indigo-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
            />
          </div>
          <button className="p-2.5 bg-white border border-indigo-100 text-slate-500 rounded-xl hover:text-indigo-600 transition-colors shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </section>

      {/* Main Content */}
      <section>
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 size={32} className="text-indigo-500 animate-spin" />
          </div>
        ) : campaigns.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-indigo-100 p-16 text-center shadow-sm"
          >
            <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <LayoutGrid size={32} className="text-indigo-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-2">No campaigns yet</h2>
            <p className="text-slate-500 max-w-sm mx-auto mb-8">
              You haven't joined any campaigns yet. Browse active campaigns on the dashboard to get started!
            </p>
            <button 
              onClick={() => navigate('/creator')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg shadow-indigo-200 hover:scale-105 transition-all"
            >
              Browse Campaigns
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {campaigns.map((campaign) => (
              <motion.div
                key={campaign.id}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/campaign/${campaign.id}`)}
                className="bg-white rounded-2xl overflow-hidden border border-indigo-100 shadow-sm group cursor-pointer hover:shadow-md hover:shadow-indigo-100 transition-all"
              >
                {/* Thumbnail / Brand Logo */}
                <div className="h-44 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
                  {campaign.assets?.brandLogo ? (
                    <img
                      src={campaign.assets.brandLogo}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={campaign.title}
                    />
                  ) : (
                    <div className="text-5xl font-black text-indigo-200 select-none">
                      {campaign.title?.[0] || '?'}
                    </div>
                  )}
                  
                  {/* Status Overlay */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-indigo-100 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] font-black text-slate-700 uppercase tracking-wider">Joined</span>
                  </div>

                  {/* Platform icons */}
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    {(campaign.platforms || []).map((p, i) => (
                      <div key={i} className="w-8 h-8 bg-white/95 backdrop-blur-sm rounded-lg flex items-center justify-center border border-indigo-100 shadow-sm">
                        {PLATFORM_ICONS[p] || <Share2 size={12} className="text-indigo-600" />}
                      </div>
                    ))}
                  </div>

                  {/* CPM badge */}
                  {campaign.cpm && (
                    <div className="absolute bottom-3 right-3 bg-indigo-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md shadow-lg">
                      ₹{campaign.cpm} CPM
                    </div>
                  )}
                </div>

                <div className="p-5 bg-white">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{campaign.category || 'General'}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                    {campaign.title}
                  </h3>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                        {campaign.totalViews !== undefined ? 'Current Views' : 'Target Views'}
                      </span>
                      <span className="text-sm font-bold text-slate-700">
                        {campaign.totalViews !== undefined 
                          ? Number(campaign.totalViews || 0).toLocaleString() 
                          : Number(campaign.targetViews || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Est. Payout</span>
                      <span className="text-sm font-black text-indigo-600">
                        ₹{campaign.estimatedRevenue !== undefined 
                          ? Number(campaign.estimatedRevenue || 0).toLocaleString() 
                          : ((campaign.targetViews || 0) / 1000 * (campaign.cpm || 0)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserCampaigns;
