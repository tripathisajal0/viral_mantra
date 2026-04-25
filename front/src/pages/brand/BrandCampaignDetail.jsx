import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  TrendingUp, 
  Users, 
  Zap, 
  BarChart3, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Eye,
  ArrowUpRight,
  ShieldCheck,
  Megaphone,
  Download,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { db } from '../../firebase';
import { doc, onSnapshot, collection, query, where, updateDoc, increment } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';

const BrandCampaignDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // 1. Listen to Campaign Details
    const campaignRef = doc(db, "brand", id);
    const unsubscribeCampaign = onSnapshot(campaignRef, (docSnap) => {
      if (docSnap.exists()) {
        setCampaign({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.error("Campaign not found");
      }
      setLoading(false);
    });

    // 2. Listen to Applications for this campaign
    const q = query(collection(db, "applications"), where("campaignId", "==", id));
    const unsubscribeApps = onSnapshot(q, (querySnapshot) => {
      const appsData = [];
      querySnapshot.forEach((doc) => {
        appsData.push({ id: doc.id, ...doc.data() });
      });
      setApplications(appsData);
    });

    return () => {
      unsubscribeCampaign();
      unsubscribeApps();
    };
  }, [id]);

  const handleApprove = async (appId) => {
    try {
      const appRef = doc(db, "applications", appId);
      await updateDoc(appRef, {
        status: 'approved',
        approvedAt: new Date()
      });
      // Logic for adding to campaign participants could be handled here or by background function
    } catch (error) {
      console.error("Approval error:", error);
    }
  };

  const handleReject = async (appId) => {
    try {
      const appRef = doc(db, "applications", appId);
      await updateDoc(appRef, {
        status: 'rejected',
        rejectedAt: new Date()
      });
    } catch (error) {
      console.error("Rejection error:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="text-center py-20">
        <h2 className="text-h2 font-bold text-on-surface">Campaign Not Found</h2>
        <button onClick={() => navigate('/brand')} className="mt-4 text-primary font-bold hover:underline">Return to Dashboard</button>
      </div>
    );
  }

  const pendingApps = applications.filter(app => app.status === 'pending');
  const approvedCreators = applications.filter(app => app.status === 'approved');

  return (
    <div className="space-y-8">
      {/* Header & Breadcrumbs */}
      <div className="max-w-container-max mx-auto">
        <button 
          onClick={() => navigate('/brand')}
          className="flex items-center gap-2 text-outline hover:text-primary transition-colors mb-6 font-bold text-sm"
        >
          <ChevronLeft size={16} />
          Back to Dashboard
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-white shadow-xl flex items-center justify-center overflow-hidden p-2 border border-outline-variant/30">
              {campaign.assets?.brandLogo ? (
                <img src={campaign.assets.brandLogo} alt="Logo" className="w-full h-full object-contain" />
              ) : (
                <Megaphone size={40} className="text-primary" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {campaign.status || 'Active'}
                </span>
                <span className="text-outline text-caption font-bold">•</span>
                <span className="text-outline text-caption font-bold">Launched {campaign.createdAt?.toDate ? new Date(campaign.createdAt.toDate()).toLocaleDateString() : 'Recently'}</span>
              </div>
              <h1 className="text-h1 font-bold text-on-surface">{campaign.title}</h1>
              <p className="text-body-md text-on-surface-variant max-w-2xl">{campaign.description}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white border border-outline-variant rounded-full font-label-bold text-on-surface hover:bg-slate-50 transition-all flex items-center gap-2">
              <BarChart3 size={18} />
              Export Data
            </button>
          </div>
        </div>

        {/* Real-time Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Views", value: campaign.currentViews?.toLocaleString() || '0', icon: Eye, color: "primary", trend: "+12%" },
            { label: "Total Spend", value: `₹${campaign.spend?.toLocaleString() || '0'}`, icon: Zap, color: "secondary", trend: "0%" },
            { label: "Creator Count", value: approvedCreators.length, icon: Users, color: "tertiary", trend: "Active" },
            { label: "Avg. CPM", value: `₹${campaign.cpm || '0'}`, icon: BarChart3, color: "on-tertiary-fixed-variant", trend: "Target" }
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="glass-card p-6 rounded-2xl border-b-4 border-transparent hover:border-primary transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", `bg-${stat.color}/10 text-${stat.color}`)}>
                  <stat.icon size={20} />
                </div>
                <span className="text-[10px] font-bold text-green-500 flex items-center gap-1">
                  <ArrowUpRight size={12} /> {stat.trend}
                </span>
              </div>
              <div className="text-h3 font-bold text-on-surface">{stat.value}</div>
              <p className="text-caption text-outline font-bold uppercase tracking-wider mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Approval Queue & Approved Creators */}
          <div className="lg:col-span-2 space-y-8">
            {/* Approval Queue */}
            <div className="glass-card rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30">
              <div className="px-6 py-5 border-b border-outline/5 flex items-center justify-between bg-surface-container-low/50">
                <h3 className="text-body-lg font-bold text-on-surface flex items-center gap-2">
                  <Clock className="text-primary" size={20} />
                  Pending Approvals
                </h3>
                <span className="bg-primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                  {pendingApps.length} New Requests
                </span>
              </div>
              <div className="divide-y divide-outline/5">
                {pendingApps.length === 0 ? (
                  <div className="p-12 text-center text-on-surface-variant font-medium">
                    No pending applications at the moment.
                  </div>
                ) : (
                  pendingApps.map((app) => (
                    <div key={app.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
                          <img src={app.creatorPhoto || `https://i.pravatar.cc/150?u=${app.creatorId}`} alt="Creator" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">{app.creatorName}</p>
                          <div className="flex items-center gap-3 text-[11px] text-outline font-bold uppercase tracking-tighter mt-0.5">
                            <span className="flex items-center gap-1 text-primary"><Users size={10} /> {app.followers || '1k+'}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-tertiary"><TrendingUp size={10} /> {app.engagement || '4.2%'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => handleReject(app.id)}
                          className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-outline hover:text-error hover:border-error transition-all"
                        >
                          <XCircle size={20} />
                        </button>
                        <button 
                          onClick={() => handleApprove(app.id)}
                          className="px-6 py-2 bg-primary text-white rounded-full font-label-bold shadow-md hover:shadow-lg transition-all"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Approved Creators List */}
            <div className="glass-card rounded-2xl overflow-hidden shadow-lg border border-outline-variant/30">
              <div className="px-6 py-5 border-b border-outline/5 bg-surface-container-low/50">
                <h3 className="text-body-lg font-bold text-on-surface flex items-center gap-2">
                  <ShieldCheck className="text-green-500" size={20} />
                  Active Creators
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                {approvedCreators.length === 0 ? (
                  <div className="col-span-full py-8 text-center text-on-surface-variant font-medium">
                    No creators approved yet.
                  </div>
                ) : (
                  approvedCreators.map((app) => (
                    <div key={app.id} className="p-4 rounded-xl border border-outline-variant/50 hover:border-primary/30 transition-all flex items-center gap-4 bg-white shadow-sm">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
                        <img src={app.creatorPhoto || `https://i.pravatar.cc/150?u=${app.creatorId}`} alt="Creator" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-bold text-on-surface truncate">{app.creatorName}</p>
                        <p className="text-[10px] text-green-500 font-bold uppercase">₹{app.earnings?.toLocaleString() || '0'} Earned</p>
                      </div>
                      <button className="text-outline hover:text-primary transition-colors">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Side Column: Campaign Details & Assets */}
          <div className="space-y-8">
            <div className="glass-card rounded-2xl p-6 shadow-lg border border-outline-variant/30">
              <h3 className="font-bold text-on-surface mb-6 flex items-center gap-2">
                <BarChart3 className="text-primary" size={20} />
                Campaign Summary
              </h3>
              <div className="space-y-6">
                <div className="space-y-1">
                  <div className="flex justify-between text-caption font-bold">
                    <span className="text-outline">Budget Progress</span>
                    <span className="text-on-surface">{campaign.progress || 0}%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-primary transition-all duration-500" style={{ width: `${campaign.progress || 0}%` }}></div>
                  </div>
                  <p className="text-[10px] text-outline font-medium text-right mt-1">₹{campaign.spend?.toLocaleString() || 0} of ₹{campaign.budget?.toLocaleString()}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-outline font-bold uppercase">Target CPM</p>
                    <p className="font-bold text-on-surface mt-0.5">₹{campaign.cpm}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-[10px] text-outline font-bold uppercase">Creator Cap</p>
                    <p className="font-bold text-on-surface mt-0.5">₹{campaign.maxPayout?.toLocaleString()}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-outline-variant/30">
                  <h4 className="text-[10px] text-outline font-bold uppercase mb-3">Guidelines</h4>
                  {campaign.assets?.guidelines ? (
                    <a 
                      href={campaign.assets.guidelines} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between p-3 bg-primary/5 rounded-xl border border-primary/10 group hover:bg-primary/10 transition-all"
                    >
                      <div className="flex items-center gap-3 text-primary">
                        <Download size={20} />
                        <span className="text-sm font-bold truncate max-w-[150px]">
                          {campaign.assets.guidelinesName || 'Download PDF'}
                        </span>
                      </div>
                      <ArrowUpRight size={16} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <p className="text-caption text-outline italic">No guidelines uploaded.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-xl shadow-indigo-200 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              <h3 className="font-bold text-lg mb-2 relative z-10">AI Insights</h3>
              <p className="text-sm text-indigo-100 leading-relaxed mb-4 relative z-10">
                Your campaign is performing 24% better than similar brands in the {campaign.category} niche. 
              </p>
              <div className="flex items-center gap-2 relative z-10">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md">
                  <TrendingUp size={16} />
                </div>
                <span className="text-xs font-bold">Projected to reach target in 8 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandCampaignDetail;
