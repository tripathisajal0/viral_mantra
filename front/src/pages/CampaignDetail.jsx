import React from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
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
  Circle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const CampaignDetail = () => {
  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <TopBar />
      
      <main className="ml-64 pt-24 px-8 pb-12 min-h-screen">
        <div className="max-w-container-max mx-auto">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 mb-6 text-caption text-outline font-medium">
            <a className="hover:text-indigo-600 transition-colors" href="#">Campaigns</a>
            <ChevronRight size={14} />
            <span className="text-on-surface">Active Brief</span>
          </div>

          {/* Bento Layout Container */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column: Brief & Guidelines */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* Campaign Header Card */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card rounded-xl p-8 overflow-hidden relative shadow-lg"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">High Priority</span>
                      <span className="text-outline text-xs flex items-center gap-1 font-medium">
                        <Clock size={12} /> Ends in 4 days
                      </span>
                    </div>
                    <h1 className="text-h2 font-bold mb-2">Next-Gen Audio Experience</h1>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 overflow-hidden">
                        <img src="https://picsum.photos/seed/sonic/100/100" alt="logo" />
                      </div>
                      <span className="font-label-bold text-on-surface">SonicWave Labs</span>
                      <span className="text-outline">•</span>
                      <span className="text-outline text-body-md font-medium">Consumer Tech</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-outline mb-1 uppercase tracking-widest font-bold">Base Payout</p>
                    <p className="text-h3 font-bold text-indigo-600">$1,200.00</p>
                  </div>
                </div>

                <div className="space-y-6 relative z-10">
                  <div>
                    <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <FileText className="text-indigo-500" size={20} />
                      The Brief
                    </h3>
                    <p className="text-on-surface-variant text-body-md leading-relaxed">
                      We are launching our new 'ZenBuds Pro' and want creators to showcase the immersive noise-canceling capabilities in high-energy, urban environments. The goal is to demonstrate how SonicWave helps you find your "flow state" regardless of the chaos around you. 
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                    <div>
                      <h3 className="font-bold text-on-surface mb-4 flex items-center gap-2 text-tertiary">
                        <CheckCircle2 size={18} /> DOs
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "Film in 4K, 60fps vertical format.",
                          "Show the product unboxing clearly.",
                          "Mention the 'Flow-ANC' feature."
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant font-medium">
                            <Circle size={6} fill="currentColor" className="mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface mb-4 flex items-center gap-2 text-error">
                        <XCircle size={18} /> DONTs
                      </h3>
                      <ul className="space-y-3">
                        {[
                          "Use copyrighted music in the background.",
                          "Compare the product to competitors.",
                          "Use heavy filters that distort color."
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-on-surface-variant font-medium">
                            <Circle size={6} fill="currentColor" className="mt-1.5 shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Aesthetic Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card rounded-xl p-6 border-l-4 border-indigo-500 shadow-md">
                  <h4 className="font-bold text-on-surface mb-3 uppercase tracking-wider text-xs">Brand Aesthetic</h4>
                  <div className="flex gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 shadow-sm shadow-indigo-200"></div>
                    <div className="w-8 h-8 rounded-full bg-slate-900 shadow-sm shadow-slate-200"></div>
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200"></div>
                  </div>
                  <p className="text-caption text-on-surface-variant font-medium">Clean, futuristic, and high-contrast. Think sleek lines and urban tech.</p>
                </div>
                <div className="glass-card rounded-xl p-6 border-l-4 border-secondary shadow-md">
                  <h4 className="font-bold text-on-surface mb-3 uppercase tracking-wider text-xs">Target Audience</h4>
                  <p className="text-caption text-on-surface-variant mb-4 font-medium">18-34 year olds, urban dwellers, tech enthusiasts, and digital nomads.</p>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={cn(
                        "w-6 h-6 rounded-full border-2 border-white",
                        i === 1 ? "bg-indigo-200" : i === 2 ? "bg-purple-200" : "bg-slate-200"
                      )}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Submission & Utilities */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              {/* Earnings Calculator */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-indigo-900 text-white rounded-xl p-8 shadow-xl shadow-indigo-200 relative overflow-hidden"
              >
                <div className="absolute bottom-0 right-0 opacity-10 -mr-10 -mb-10">
                  <Calculator size={140} />
                </div>
                <h3 className="font-bold text-lg mb-6 relative z-10">Earnings Calculator</h3>
                <div className="space-y-4 relative z-10">
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-indigo-300 font-bold block mb-2">Target Views</label>
                    <div className="relative">
                      <input 
                        className="w-full bg-indigo-800/50 border-indigo-700/50 rounded-lg py-3 px-4 text-white focus:ring-2 focus:ring-indigo-400 outline-none" 
                        type="number" 
                        defaultValue="50000"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-indigo-300 text-xs font-bold uppercase">views</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-indigo-800/50">
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] text-indigo-300 uppercase font-bold tracking-widest mb-1">Est. Revenue</p>
                        <p className="text-h3 font-bold">$2,450.00</p>
                      </div>
                      <div className="bg-white/10 text-white font-bold px-2 py-1 rounded text-[10px] uppercase tracking-wider backdrop-blur-sm border border-white/10">
                        +12% Bonus
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Asset Downloads */}
              <div className="glass-card rounded-xl p-6 shadow-md">
                <h3 className="font-bold text-on-surface mb-4 flex items-center gap-2">
                  <FolderArchive className="text-indigo-500" size={20} />
                  Brand Assets
                </h3>
                <div className="space-y-3">
                  {[
                    { name: "ZenBuds Logo Pack", info: "PNG, SVG (12MB)", icon: ImageIcon },
                    { name: "Voiceover Script", info: "PDF (2MB)", icon: FileText }
                  ].map((asset, i) => (
                    <button key={i} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors border border-slate-100 group">
                      <div className="flex items-center gap-3">
                        <asset.icon className="text-outline group-hover:text-indigo-600 transition-colors" size={20} />
                        <div className="text-left">
                          <p className="text-sm font-bold text-on-surface">{asset.name}</p>
                          <p className="text-[10px] text-outline font-medium">{asset.info}</p>
                        </div>
                      </div>
                      <Download className="text-outline group-hover:text-indigo-600 transition-colors" size={16} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Submission Form */}
              <div className="glass-card rounded-xl p-8 border-t-4 border-indigo-600 shadow-lg">
                <h3 className="font-bold text-lg mb-6">Submit Your Video</h3>
                <form className="space-y-6">
                  <div>
                    <label className="text-[10px] font-bold text-outline block mb-2 uppercase tracking-widest">Video URL (TikTok/Instagram/YT)</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
                      <input 
                        className="w-full bg-white border border-slate-200 rounded-lg py-3 pl-10 pr-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm font-medium" 
                        placeholder="https://..." 
                        type="url"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-outline block mb-2 uppercase tracking-widest">Internal Notes (Optional)</label>
                    <textarea 
                      className="w-full bg-white border border-slate-200 rounded-lg py-3 px-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all text-sm font-medium" 
                      placeholder="Any context?" 
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg flex items-start gap-3 border border-slate-100">
                    <input className="mt-1 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500" id="terms" type="checkbox"/>
                    <label className="text-[10px] text-on-surface-variant leading-tight font-medium" htmlFor="terms">
                      I confirm that this video follows all the provided brand guidelines and Viral Mantra community standards.
                    </label>
                  </div>
                  <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2" type="submit">
                    <Send size={18} />
                    Submit for Review
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CampaignDetail;
