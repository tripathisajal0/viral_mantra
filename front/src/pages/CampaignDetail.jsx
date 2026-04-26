import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  FileText,
  CheckCircle2,
  XCircle,
  Download,
  Calculator,
  Image as ImageIcon,
  FolderArchive,
  Link as LinkIcon,
  Send,
  Clock,
  Users,
  MapPin,
  Tag,
  BarChart2,
  Camera,
  Music2,
  Share2,
  Loader2,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { db, isFirebaseReady } from '../firebase';
import { doc, onSnapshot, updateDoc, arrayUnion, collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';

const PLATFORM_ICONS = {
  'Instagram Reels': <Camera size={14} className="text-pink-500" />,
  'YT Shorts': <Music2 size={14} className="text-red-500" />,
  'TikTok': <Share2 size={14} className="text-slate-800" />,
};

const InfoRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center shrink-0 border border-indigo-100">
      <Icon size={14} className="text-indigo-500" />
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-semibold text-slate-800 mt-0.5">{value || '—'}</p>
    </div>
  </div>
);

const CampaignDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { profile } = useAuth();
  const [videoUrl, setVideoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [targetViews, setTargetViews] = useState(50000);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);



  useEffect(() => {
    if (!isFirebaseReady) {
      setError('Firebase not configured.');
      setLoading(false);
      return;
    }
    const unsub = onSnapshot(doc(db, 'brand', id), (snap) => {
      if (snap.exists()) {
        console.log('[Detail] Found campaign:', snap.id, snap.data());
        setCampaign({ id: snap.id, ...snap.data() });
        setLoading(false);
      } else {
        console.warn('[Detail] Campaign document not found:', id);
        setError('Campaign not found.');
        setLoading(false);
      }
    }, (err) => {
      console.error('[Detail] Firestore error:', err);
      setError(err.message);
      setLoading(false);
    });
    return () => unsub();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoUrl || !agreed) return;

    setSubmitting(true);
    try {
      const campaignRef = doc(db, 'brand', id);

      const submissionData = {
        userId: profile?.uid || 'anonymous',
        creatorId: profile?.uid || 'anonymous', // For teammate compatibility
        creatorName: profile?.name || 'Anonymous User',
        creatorPhoto: profile?.avatar || '',
        campaignId: id,
        campaignTitle: campaign?.title || 'Unknown Campaign',
        brandId: campaign?.brandId || 'unknown',
        videoUrl: videoUrl,
        notes: notes,
        timestamp: new Date().toISOString(),
        createdAt: new Date(), // For teammate ordering
        status: 'pending'
      };

      // 1. Update Campaign document (Array approach)
      await updateDoc(campaignRef, {
        requests: arrayUnion(submissionData)
      });

      // 2. Add to Applications collection (Collection approach for teammate)
      await addDoc(collection(db, 'applications'), submissionData);

      setSubmitted(true);
      setVideoUrl('');
      setNotes('');
      setAgreed(false);
    } catch (err) {
      console.error('[Detail] Submission failed:', err);
      setError('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const estimatedRevenue = campaign?.cpm
    ? ((targetViews / 1000) * campaign.cpm).toFixed(2)
    : '0.00';

  const daysLeft = campaign?.startDate
    ? Math.max(0, Math.ceil((new Date(campaign.startDate) - new Date()) / 86400000))
    : null;

  /* ---------- Loading / Error ---------- */
  if (loading) return (
    <div className="min-h-screen bg-[#EEF0FB] flex items-center justify-center">
      <Loader2 size={36} className="text-indigo-500 animate-spin" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-[#EEF0FB] flex flex-col items-center justify-center gap-4">
      <AlertCircle size={40} className="text-red-400" />
      <p className="text-slate-600 font-semibold">{error}</p>
      <button onClick={() => navigate('/creator')} className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:opacity-90 transition-opacity">
        Back to Dashboard
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-xs text-slate-400 font-medium">
            <button onClick={() => navigate('/creator')} className="flex items-center gap-1 hover:text-indigo-600 transition-colors">
              <ArrowLeft size={13} /> Campaigns
            </button>
            <ChevronRight size={13} />
            <span className="text-slate-700 font-semibold">{campaign.title}</span>
          </div>

          <div className="grid grid-cols-12 gap-6">

            {/* ── LEFT COLUMN ── */}
            <div className="col-span-12 lg:col-span-8 space-y-6">

              {/* Campaign Header */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 md:p-8 border border-indigo-100 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-56 h-56 bg-indigo-500/5 rounded-full -mr-20 -mt-20 blur-3xl" />

                {/* Brand logo + meta */}
                <div className="flex flex-col sm:flex-row items-start gap-5 mb-6 relative z-10">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-indigo-100 shadow-sm bg-indigo-50 flex items-center justify-center shrink-0">
                    {campaign.assets?.brandLogo ? (
                      <img src={campaign.assets.brandLogo} alt="Brand Logo" className="w-full h-full object-cover"
                        onError={(e) => { e.target.style.display = 'none'; }} />
                    ) : (
                      <ImageIcon size={24} className="text-indigo-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      {campaign.status === 'active' && (
                        <span className="bg-green-100 text-green-700 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                          Active
                        </span>
                      )}
                      {campaign.category && (
                        <span className="bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-indigo-100">
                          {campaign.category}
                        </span>
                      )}
                      {daysLeft !== null && (
                        <span className="text-slate-400 text-xs flex items-center gap-1 font-medium">
                          <Clock size={11} /> Starts in {daysLeft} days
                        </span>
                      )}
                    </div>
                    <h1 className="text-2xl md:text-3xl font-black tracking-tight mb-1">{campaign.title}</h1>
                    <p className="text-slate-500 text-sm leading-relaxed">{campaign.description}</p>
                  </div>
                </div>

                {/* Quick stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
                  {[
                    { label: 'CPM Rate', value: campaign.cpm ? `₹${campaign.cpm}` : '—', highlight: true },
                    { label: 'Budget', value: campaign.budget ? `₹${Number(campaign.budget).toLocaleString()}` : '—', highlight: false },
                    { label: 'Target Views', value: campaign.targetViews ? Number(campaign.targetViews).toLocaleString() : '—', highlight: false },
                    { label: 'Min. Followers', value: campaign.minFollowers ? Number(campaign.minFollowers).toLocaleString() : '—', highlight: false },
                  ].map(({ label, value, highlight }) => (
                    <div key={label} className={`p-3 rounded-xl border text-center ${highlight ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-indigo-50 border-indigo-100'}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${highlight ? 'text-indigo-200' : 'text-slate-400'}`}>{label}</p>
                      <p className={`text-lg font-black ${highlight ? 'text-white' : 'text-slate-800'}`}>{value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Campaign Details */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-indigo-100 shadow-sm">
                <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
                  <FileText className="text-indigo-500" size={18} />
                  Campaign Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InfoRow icon={Tag} label="Age Group" value={campaign.ageGroup} />
                  <InfoRow icon={MapPin} label="Location" value={campaign.location} />
                  <InfoRow icon={Clock} label="Start Date" value={campaign.startDate} />
                  <InfoRow icon={Users} label="Min. Followers" value={campaign.minFollowers?.toLocaleString()} />
                  <InfoRow icon={BarChart2} label="Current Views" value={Number(campaign.currentViews || 0).toLocaleString()} />
                  <InfoRow icon={BarChart2} label="Target Views" value={Number(campaign.targetViews || 0).toLocaleString()} />
                </div>

                {/* Platforms */}
                {campaign.platforms?.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Accepted Platforms</p>
                    <div className="flex flex-wrap gap-2">
                      {campaign.platforms.map((p, i) => (
                        <span key={i} className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700">
                          {PLATFORM_ICONS[p] || <Share2 size={14} className="text-slate-400" />}
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Guidelines */}
              {campaign.assets?.guidelines && (
                <div className="bg-white rounded-2xl p-6 md:p-8 border border-indigo-100 shadow-sm">
                  <h3 className="font-bold text-lg mb-5 flex items-center gap-2">
                    <CheckCircle2 className="text-indigo-500" size={18} />
                    Content Guidelines
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-xl border border-green-100">
                      <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-3 flex items-center gap-1">
                        <CheckCircle2 size={11} /> DOs
                      </p>
                      <ul className="space-y-2 text-sm text-slate-600">
                        {(campaign.assets.guidelinesName
                          ? [`Download the guidelines PDF: ${campaign.assets.guidelinesName}`]
                          : ['Follow brand voice and tone.', 'Keep content authentic.', 'Tag the brand in posts.']
                        ).map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 rounded-xl border border-red-100">
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-3 flex items-center gap-1">
                        <XCircle size={11} /> DON'Ts
                      </p>
                      <ul className="space-y-2 text-sm text-slate-600">
                        {['Use copyrighted background music.', 'Compare with competitors.', 'Use heavy distorting filters.'].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="col-span-12 lg:col-span-4 space-y-6">

              {/* Earnings Calculator */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-indigo-900 to-indigo-700 text-white rounded-2xl p-6 shadow-xl shadow-indigo-200 relative overflow-hidden"
              >
                <div className="absolute bottom-0 right-0 opacity-10 -mr-8 -mb-8">
                  <Calculator size={100} />
                </div>
                <h3 className="font-bold text-base mb-5 relative z-10">Earnings Calculator</h3>
                <div className="space-y-4 relative z-10">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-indigo-300 font-bold block mb-2">
                      Target Views
                    </label>
                    <input
                      className="w-full bg-indigo-800/50 border border-indigo-700/50 rounded-lg py-2.5 px-3 text-white focus:ring-2 focus:ring-indigo-400 outline-none text-sm"
                      type="number"
                      value={targetViews}
                      onChange={(e) => setTargetViews(Number(e.target.value))}
                      min={0}
                    />
                  </div>
                  <div className="pt-4 border-t border-indigo-800/50">
                    <p className="text-[10px] text-indigo-300 uppercase font-bold tracking-widest mb-1">Est. Revenue</p>
                    <p className="text-3xl font-black">₹{Number(estimatedRevenue).toLocaleString()}</p>
                    <p className="text-indigo-400 text-xs mt-1">Based on ₹{campaign.cpm || 0}/1K views</p>
                  </div>
                </div>
              </motion.div>

              {/* Brand Assets */}
              {(campaign.assets?.guidelines || campaign.assets?.brandLogo) && (
                <div className="bg-white rounded-2xl p-6 border border-indigo-100 shadow-sm">
                  <h3 className="font-bold text-base mb-4 flex items-center gap-2">
                    <FolderArchive className="text-indigo-500" size={18} />
                    Brand Assets
                  </h3>
                  <div className="space-y-2">
                    {campaign.assets.guidelines && (
                      <a
                        href={campaign.assets.guidelines}
                        download={campaign.assets.guidelinesName || 'guidelines.pdf'}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100 group"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="text-slate-400 group-hover:text-indigo-600 transition-colors" size={18} />
                          <div className="text-left">
                            <p className="text-sm font-bold text-slate-700">{campaign.assets.guidelinesName || 'Guidelines'}</p>
                            <p className="text-[10px] text-slate-400">PDF Document</p>
                          </div>
                        </div>
                        <Download className="text-slate-400 group-hover:text-indigo-600 transition-colors" size={16} />
                      </a>
                    )}
                    {campaign.assets.brandLogo && (
                      <a
                        href={campaign.assets.brandLogo}
                        download="brand-logo.jpg"
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100 group"
                      >
                        <div className="flex items-center gap-3">
                          <ImageIcon className="text-slate-400 group-hover:text-indigo-600 transition-colors" size={18} />
                          <div className="text-left">
                            <p className="text-sm font-bold text-slate-700">Brand Logo</p>
                            <p className="text-[10px] text-slate-400">Image File</p>
                          </div>
                        </div>
                        <Download className="text-slate-400 group-hover:text-indigo-600 transition-colors" size={16} />
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Submission Form */}
              <div className="bg-white rounded-2xl p-6 border-t-4 border-indigo-600 border border-indigo-100 shadow-sm">
                <h3 className="font-bold text-base mb-2">Submit Your Video</h3>
                <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-5">Final Step for Review</p>
                
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center space-y-4"
                  >
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 size={32} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Application Sent!</h4>
                      <p className="text-sm text-slate-500 mt-1">The brand will review your video shortly. Keep an eye on your dashboard.</p>
                    </div>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="text-indigo-600 font-bold text-xs hover:underline"
                    >
                      Submit another video?
                    </button>
                  </motion.div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-2 uppercase tracking-widest">
                        Video URL
                      </label>
                      <div className="relative">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                        <input
                          required
                          className="w-full bg-white border border-slate-200 rounded-xl py-2.5 pl-9 pr-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm font-medium"
                          placeholder="https://..."
                          type="url"
                          value={videoUrl}
                          onChange={e => setVideoUrl(e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 block mb-2 uppercase tracking-widest">
                        Notes (Optional)
                      </label>
                      <textarea
                        className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm font-medium resize-none"
                        placeholder="Any context for the brand?"
                        rows={3}
                        value={notes}
                        onChange={e => setNotes(e.target.value)}
                      />
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl flex items-start gap-3 border border-slate-100">
                      <input
                        className="mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                        id="terms"
                        type="checkbox"
                        checked={agreed}
                        onChange={e => setAgreed(e.target.checked)}
                      />
                      <label className="text-[10px] text-slate-500 leading-tight font-medium cursor-pointer" htmlFor="terms">
                        I confirm this video follows all brand guidelines and Viral Mantra community standards.
                      </label>
                    </div>
                    <button
                      type="submit"
                      disabled={submitting || !videoUrl || !agreed}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0"
                    >
                      {submitting ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <Send size={16} />
                      )}
                      {submitting ? 'Submitting...' : 'Submit for Review'}
                    </button>
                  </form>
                )}
              </div>

            </div>
          </div>
        </div>
    </div>
  );
};

export default CampaignDetail;
