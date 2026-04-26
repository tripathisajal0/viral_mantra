import React from 'react';
import {
  Building2,
  Settings,
  Edit3,
  Megaphone,
  BarChart2,
  IndianRupee,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Mail,
  Smartphone,
  Globe,
  Users,
  Zap,
  Star,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const BrandProfile = () => {
  const { profile } = useAuth();

  const stats = [
    { label: 'Campaigns Launched', value: profile?.campaignsLaunched ?? '0', icon: Megaphone, color: 'text-violet-600', bg: 'bg-violet-50' },
    { label: 'Total Creators', value: profile?.totalCreators ?? '0', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Total Views', value: profile?.totalViews ?? '0', icon: BarChart2, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'Avg. ROI', value: profile?.avgROI ?? '—', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  // Placeholder active campaigns
  const activeCampaigns = [
    { name: 'Summer Launch 2025', status: 'Active', creators: 12, spend: '₹48,000' },
    { name: 'Brand Awareness Drive', status: 'Under Review', creators: 5, spend: '₹15,000' },
  ];

  return (
    <div className="space-y-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Profile Header Card */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[32px] p-6 md:p-10 border border-violet-100 shadow-sm relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10">
              {/* Brand Logo / Avatar */}
              <div className="relative group">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-[40px] overflow-hidden border-4 border-white shadow-xl bg-violet-50 flex items-center justify-center">
                  {profile?.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={profile?.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                    />
                  ) : (
                    <Building2 size={56} className="text-violet-400" strokeWidth={1.5} />
                  )}
                </div>
                <button className="absolute bottom-2 right-2 p-2.5 bg-violet-600 text-white rounded-2xl shadow-lg hover:bg-violet-700 transition-colors border-4 border-white">
                  <Edit3 size={18} />
                </button>
              </div>

              <div className="text-center md:text-left space-y-2">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-800">
                    {profile?.name || 'Your Brand'}
                  </h1>
                  <CheckCircle2 size={24} className="text-violet-500 fill-violet-50" />
                </div>
                <p className="text-violet-600 font-bold flex items-center justify-center md:justify-start gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1">
                    <Building2 size={14} />
                    {profile?.company || 'Brand Account'}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-slate-400 font-medium">
                    Joined {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString() : 'October 2024'}
                  </span>
                </p>

                <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
                  <button className="px-6 py-2.5 bg-violet-600 text-white font-bold rounded-xl shadow-lg shadow-violet-100 hover:bg-violet-700 transition-all flex items-center gap-2">
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                  <button className="p-2.5 bg-white border border-violet-100 text-slate-400 hover:text-violet-600 rounded-xl transition-all shadow-sm">
                    <Settings size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Brand Tier Badge */}
            <div className="bg-gradient-to-br from-slate-50 to-violet-50/30 p-6 rounded-3xl border border-violet-100 w-full lg:w-72 flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl shadow-inner flex items-center justify-center text-violet-500">
                <Star size={32} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Brand Tier</p>
                <p className="text-xl font-black text-slate-800 tracking-tight">Growth Partner</p>
                <div className="mt-2 w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 w-1/2" />
                </div>
                <p className="text-[10px] text-slate-400 mt-1 font-bold">50% to Elite Status</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-3xl border border-violet-100 shadow-sm flex flex-col items-center justify-center text-center space-y-2 group hover:border-violet-300 transition-colors"
            >
              <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <p className="text-2xl font-black text-slate-800">{stat.value}</p>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column – Company Details */}
          <div className="lg:col-span-1 space-y-8">
            <section className="bg-white rounded-3xl p-8 border border-violet-100 shadow-sm space-y-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Building2 size={18} className="text-violet-600" />
                Company Details
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Business Email</p>
                    <p className="text-slate-700 font-bold">{profile?.email || 'brand@viralmantra.com'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Contact Number</p>
                    <p className="text-slate-700 font-bold">{profile?.phone || '+91 98765 43210'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
                    <Globe size={18} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Website</p>
                    <p className="text-slate-700 font-bold">{profile?.website || 'www.yourbrand.com'}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Brand Verification */}
            <section className="bg-gradient-to-br from-white to-violet-50/30 rounded-3xl p-8 border border-violet-100 shadow-sm relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-violet-500/5 rounded-full blur-xl group-hover:bg-violet-500/10 transition-colors" />
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-violet-500 border border-violet-50">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Brand Verification</h3>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">
                    Verify your brand to unlock premium creator access and higher campaign budgets.
                  </p>
                </div>
                <button className="w-full py-3 bg-white border border-violet-100 text-violet-600 font-bold rounded-xl text-sm hover:bg-violet-50 transition-colors flex items-center justify-center gap-2">
                  Complete Verification
                  <ChevronRight size={16} />
                </button>
              </div>
            </section>
          </div>

          {/* Right Column – Spend & Campaigns */}
          <div className="lg:col-span-2 space-y-8">
            {/* Spend Overview */}
            <div className="bg-white rounded-3xl p-8 border border-violet-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <IndianRupee size={18} className="text-violet-600" />
                  Campaign Spend Overview
                </h3>
                <button className="text-violet-600 font-bold text-xs hover:underline flex items-center gap-1">
                  View Report
                  <ExternalLink size={12} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Total Budget Used</p>
                    <h4 className="text-4xl font-black text-slate-800">
                      ₹{profile?.totalSpend?.toLocaleString() || '0.00'}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
                    <TrendingUp size={14} />
                    +18% from last month
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">This Month</p>
                    <p className="text-xl font-bold text-slate-700">₹24,000</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Available</p>
                    <p className="text-xl font-bold text-slate-700">
                      ₹{profile?.walletBalance?.toLocaleString() || '0.00'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Campaigns */}
            <div className="bg-white rounded-3xl p-8 border border-violet-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Zap size={18} className="text-violet-600" />
                  Active Campaigns
                </h3>
                <Link
                  to="/brand/launch"
                  className="text-violet-600 font-bold text-xs hover:underline flex items-center gap-1"
                >
                  Launch New
                  <ExternalLink size={12} />
                </Link>
              </div>

              <div className="space-y-4">
                {activeCampaigns.map((campaign, i) => (
                  <div
                    key={i}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:border-violet-200 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
                        <Megaphone size={20} className="text-violet-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-sm">{campaign.name}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                          {campaign.status} • {campaign.creators} Creators • {campaign.spend}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-violet-600 transition-colors" />
                  </div>
                ))}
                <div className="p-8 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-xs text-slate-400">Your launched campaigns will appear here.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BrandProfile;
