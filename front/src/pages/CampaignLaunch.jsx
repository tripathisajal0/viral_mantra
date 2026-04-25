import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import {
  CheckCircle2,
  ArrowRight,
  Video,
  Play,
  Zap,
  Info,
  Layout,
  Target,
  Wallet,
  CloudUpload,
  ChevronRight,
  Save
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

const CampaignLaunch = () => {
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, name: 'Basics', icon: Layout },
    { id: 2, name: 'Targeting', icon: Target },
    { id: 3, name: 'Budget', icon: Wallet },
    { id: 4, name: 'Assets', icon: CloudUpload },
  ];

  return (
    <div className="min-h-screen bg-[#EEF0FB]">
      <Sidebar />
      <TopBar />

      <main className="lg:ml-64 pt-20 min-h-screen">
        <div className="max-w-[1000px] mx-auto p-10">
          {/* Stepper */}
          <div className="mb-12 flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-[2px] bg-surface-container-highest -translate-y-1/2 -z-10"></div>
            {steps.map((s) => (
              <div key={s.id} className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold ring-4 ring-white transition-all",
                  step >= s.id ? "bg-primary text-white" : "bg-surface-container-highest text-outline"
                )}>
                  {s.id}
                </div>
                <span className={cn(
                  "font-label-bold text-caption transition-colors",
                  step >= s.id ? "text-primary" : "text-outline"
                )}>
                  {s.name}
                </span>
              </div>
            ))}
          </div>

          {/* Form Content */}
          <div className="grid grid-cols-12 gap-8">
            {/* Main Form Section */}
            <div className="col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-3xl p-8 shadow-xl shadow-indigo-500/5"
              >
                <header className="mb-8">
                  <h2 className="text-h2 text-on-surface mb-2 font-bold">Campaign Basics</h2>
                  <p className="text-body-md text-outline">Define the core identity of your creative campaign.</p>
                </header>

                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="font-label-bold text-on-surface-variant block">Campaign Title</label>
                    <input
                      className="w-full bg-white border border-outline-variant rounded-xl p-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                      placeholder="e.g. Summer Glow Skincare Launch 2024"
                      type="text"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-label-bold text-on-surface-variant block">Brief Description</label>
                    <textarea
                      className="w-full bg-white border border-outline-variant rounded-xl p-4 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                      placeholder="Tell creators about your brand and what you hope to achieve..."
                      rows="4"
                    ></textarea>
                  </div>

                  <div className="space-y-4">
                    <label className="font-label-bold text-on-surface-variant block">Platform Selection</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { name: 'Instagram Reels', icon: Video, active: true },
                        { name: 'TikTok', icon: Play, active: false },
                        { name: 'YT Shorts', icon: Zap, active: false },
                      ].map((p) => (
                        <button
                          key={p.name}
                          className={cn(
                            "border-2 p-4 rounded-2xl flex flex-col items-center gap-2 group transition-all",
                            p.active
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-outline-variant hover:border-primary/50 text-outline hover:text-primary"
                          )}
                          type="button"
                        >
                          <p.icon size={30} />
                          <span className="font-label-bold text-caption">{p.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 flex items-center justify-between border-t border-outline-variant/30">
                    <button className="px-6 py-3 font-label-bold text-outline hover:text-on-surface transition-colors flex items-center gap-2" type="button">
                      <Save size={18} />
                      Save Draft
                    </button>
                    <button
                      className="bg-primary text-white px-10 py-3 rounded-full font-label-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
                      type="button"
                      onClick={() => setStep(2)}
                    >
                      Next: Targeting
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Context Sidebar */}
            <div className="col-span-4 space-y-6">
              <div className="glass-card rounded-3xl p-6 border-indigo-100 bg-gradient-to-br from-white to-surface-container-low">
                <div className="w-12 h-12 bg-tertiary-fixed rounded-2xl flex items-center justify-center mb-4 text-tertiary">
                  <Info size={24} />
                </div>
                <h3 className="text-h3 font-bold text-on-surface mb-2">Pro Tip</h3>
                <p className="text-caption text-on-surface-variant leading-relaxed">
                  Campaigns with specific platform choices receive 40% more creator applications. Creators prefer knowing exactly which format they are filming for.
                </p>
              </div>

              <div className="glass-card rounded-3xl p-6">
                <h3 className="font-label-bold text-on-surface mb-4">Estimated Reach</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-caption text-outline">Potential Reach</span>
                    <span className="font-label-bold">0</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary w-0"></div>
                  </div>
                  <p className="text-caption text-outline italic">Complete Targeting to see estimates.</p>
                </div>
              </div>

              <div className="relative rounded-3xl overflow-hidden aspect-video group shadow-lg">
                <img
                  alt="Platform Preview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1974&auto=format&fit=crop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="text-white font-label-bold text-[10px]">Platform Preview: Instagram Reels</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Grid Previews */}
          <div className="mt-12 grid grid-cols-3 gap-6 opacity-60">
            {steps.slice(1).map((s) => (
              <div key={s.id} className="glass-card p-6 rounded-3xl border-dashed border-2 border-outline-variant">
                <div className="flex items-center gap-3 mb-3 text-outline">
                  <s.icon size={20} />
                  <h4 className="font-label-bold">{s.name}</h4>
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-full bg-outline-variant/20 rounded"></div>
                  <div className="h-2 w-2/3 bg-outline-variant/20 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CampaignLaunch;
