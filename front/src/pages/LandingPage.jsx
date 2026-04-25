import React from 'react';
import { 
  MessageSquare, 
  Rocket, 
  TrendingUp, 
  Video, 
  CheckCircle2, 
  Globe, 
  Share2, 
  PlayCircle,
  Zap,
  BarChart3,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleJoinAsCreator = () => {
    navigate('/login', { state: { role: 'creator' } });
  };

  const handleLaunchCampaign = () => {
    navigate('/login', { state: { role: 'brand' } });
  };

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between px-8 z-50 bg-white/60 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold text-indigo-600">Viral Mantra</span>
          <nav className="hidden md:flex gap-6">
            <a className="font-label-bold text-caption text-indigo-600 border-b-2 border-indigo-600 pb-1" href="#">Guidelines</a>
            <a className="font-label-bold text-caption text-slate-500 hover:text-indigo-500 transition-colors" href="#">Brands</a>
            <a className="font-label-bold text-caption text-slate-500 hover:text-indigo-500 transition-colors" href="#">Case Studies</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden lg:flex items-center gap-2 px-4 py-2 text-slate-500 hover:opacity-80 transition-opacity">
            <MessageSquare size={20} />
            <span className="font-label-bold text-caption">Support</span>
          </button>
          <button 
            onClick={handleLaunchCampaign}
            className="bg-primary text-on-primary px-6 py-2 rounded-lg font-label-bold text-caption hover:scale-[1.02] transition-transform shadow-lg shadow-indigo-500/20"
          >
            Launch Campaign
          </button>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative hero-gradient overflow-hidden py-24 px-8">
          <div className="max-w-container-max mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="z-10"
            >
              <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-50 text-indigo-600 font-label-bold text-caption border border-indigo-100">
                TRUSTED BY 2,500+ CREATORS
              </span>
              <h1 className="text-h1 mb-6 text-on-surface leading-tight font-extrabold">
                Turn Your Views <br/>
                <span className="text-gradient">Into Value</span>
              </h1>
              <p className="text-body-lg text-on-surface-variant mb-10 max-w-lg">
                The world’s first performance-driven influencer marketplace. We connect elite creators with brands that care about real impact, not just vanity metrics.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleJoinAsCreator}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-label-bold text-body-md shadow-xl shadow-indigo-500/30 hover:scale-[1.02] transition-transform"
                >
                  Join as Creator
                </button>
                <button 
                  onClick={handleLaunchCampaign}
                  className="px-8 py-4 bg-white text-indigo-600 border-2 border-indigo-600/10 rounded-xl font-label-bold text-body-md hover:bg-indigo-50 transition-colors"
                >
                  Launch Campaign
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card rounded-2xl p-4 transform translate-y-8">
                  <div className="w-full aspect-[9/16] rounded-xl overflow-hidden mb-4 bg-slate-200">
                    <img 
                      className="w-full h-full object-cover" 
                      alt="Creator mockup" 
                      src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop" 
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-label-bold text-caption text-indigo-600">Active Campaign</span>
                    <span className="font-label-bold text-caption text-on-tertiary-fixed-variant bg-tertiary-fixed px-2 py-0.5 rounded">Live</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="glass-card rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-white">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <div className="font-label-bold text-caption text-on-surface-variant">Total Earnings</div>
                        <div className="text-h3 text-indigo-600 font-bold">$12,450</div>
                      </div>
                    </div>
                    <div className="w-full h-16 bg-gradient-to-t from-indigo-50 to-transparent rounded flex items-end gap-1 px-1">
                      <div className="w-full bg-indigo-200 h-1/3 rounded-t-sm"></div>
                      <div className="w-full bg-indigo-300 h-1/2 rounded-t-sm"></div>
                      <div className="w-full bg-indigo-400 h-3/4 rounded-t-sm"></div>
                      <div className="w-full bg-indigo-600 h-full rounded-t-sm shadow-[0_-4px_10px_rgba(79,70,229,0.3)]"></div>
                    </div>
                  </div>
                  <div className="glass-card rounded-2xl p-4 overflow-hidden">
                    <img 
                      className="w-full h-32 object-cover rounded-lg" 
                      alt="Studio" 
                      src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" 
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="py-16 bg-surface-container-low border-y border-white/40">
          <div className="max-w-container-max mx-auto px-8">
            <p className="text-center font-label-bold text-caption text-on-surface-variant mb-8 uppercase tracking-widest">Powering growth for modern brands</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale">
              <div className="text-h3 text-on-surface font-bold">VELOCITY</div>
              <div className="text-h3 text-on-surface font-bold">NEXUS</div>
              <div className="text-h3 text-on-surface font-bold">PULSE</div>
              <div className="text-h3 text-on-surface font-bold">Z-D2C</div>
              <div className="text-h3 text-on-surface font-bold">ORBIT</div>
            </div>
          </div>
        </section>

        {/* Dual Value Proposition */}
        <section className="py-24 px-8 max-w-container-max mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Creator Card */}
            <div className="glass-card rounded-3xl p-10 bg-gradient-to-br from-white/90 to-indigo-50/50 border border-white relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-colors"></div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                  <Video size={30} />
                </div>
                <div>
                  <h3 className="text-h3 font-bold">For Creators</h3>
                  <p className="font-label-bold text-caption text-indigo-600">The Ultimate Side Hustle</p>
                </div>
              </div>
              <h2 className="text-h2 mb-6 font-bold">Get paid for real views on <span className="text-indigo-600">Reels & Shorts.</span></h2>
              <ul className="space-y-4 mb-10">
                {[
                  "Instant payouts based on CPM performance.",
                  "Work with brands you actually use.",
                  "Detailed analytics for every piece of content."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-tertiary" size={20} />
                    <span className="text-body-md text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={handleJoinAsCreator}
                className="w-full py-4 bg-white border border-indigo-600 text-indigo-600 rounded-xl font-label-bold hover:bg-indigo-600 hover:text-white transition-all"
              >
                Apply to Join
              </button>
            </div>

            {/* Brand Card */}
            <div className="glass-card rounded-3xl p-10 bg-gradient-to-br from-white/90 to-purple-50/50 border border-white relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors"></div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-purple-200">
                  <Rocket size={30} />
                </div>
                <div>
                  <h3 className="text-h3 font-bold">For Brands</h3>
                  <p className="font-label-bold text-caption text-purple-600">ROAS Focused Influence</p>
                </div>
              </div>
              <h2 className="text-h2 mb-6 font-bold">Performance-driven growth with <span className="text-purple-600">verified reach.</span></h2>
              <ul className="space-y-4 mb-10">
                {[
                  "Zero waste—only pay for unique views.",
                  "AI-powered creator matching algorithm.",
                  "Automated content rights management."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="text-tertiary" size={20} />
                    <span className="text-body-md text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={handleLaunchCampaign}
                className="w-full py-4 bg-purple-600 text-white rounded-xl font-label-bold hover:bg-purple-700 transition-all shadow-lg shadow-purple-200"
              >
                Launch Demo
              </button>
            </div>
          </div>
        </section>

        {/* Workflow Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-container-max mx-auto px-8">
            <div className="text-center mb-20">
              <h2 className="text-h2 mb-4 font-bold text-on-surface">The Viral Mantra <span className="text-gradient">Workflow</span></h2>
              <p className="text-body-md text-on-surface-variant max-w-xl mx-auto">Our transparent process ensures high-quality content for brands and guaranteed earnings for creators.</p>
            </div>
            <div className="grid lg:grid-cols-3 gap-12 relative">
              <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-indigo-100 -translate-y-1/2 z-0"></div>
              {[
                { step: 1, title: "Sync & Select", desc: "Connect your social accounts and choose from high-payout brand campaigns tailored to your niche." },
                { step: 2, title: "Create & Upload", desc: "Follow the brief to create authentic Reels/Shorts. Upload to our dashboard for instant verification." },
                { step: 3, title: "Track & Earn", desc: "Watch your views turn into revenue in real-time. Withdraw funds directly to your bank account weekly." }
              ].map((item, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-h3 font-bold mb-6 shadow-xl shadow-indigo-200">
                    {item.step}
                  </div>
                  <h4 className="text-body-lg font-bold mb-3">{item.title}</h4>
                  <p className="text-body-md text-on-surface-variant">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-8">
          <div className="max-w-container-max mx-auto bg-gradient-to-r from-indigo-900 to-indigo-700 rounded-[3rem] p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img 
                className="w-full h-full object-cover" 
                alt="Abstract background" 
                src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070&auto=format&fit=crop" 
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-h2 mb-6 font-bold">Ready to scale your influence?</h2>
              <p className="text-body-lg mb-10 text-indigo-100 max-w-2xl mx-auto">Join the new era of performance marketing where creators are paid what they're actually worth.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <button 
                  onClick={handleJoinAsCreator}
                  className="px-10 py-4 bg-tertiary-fixed text-on-tertiary-fixed-variant rounded-xl font-label-bold text-body-md hover:scale-[1.05] transition-transform"
                >
                  Start for Free
                </button>
                <button className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-label-bold text-body-md hover:bg-white/20 transition-colors">
                  Talk to an Expert
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-highest border-t border-white/20 py-20 px-8">
        <div className="max-w-container-max mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 block">Viral Mantra</span>
            <p className="text-caption text-on-surface-variant mb-6">Empowering the creator economy with fintech precision.</p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm" href="#"><Globe size={20} /></a>
              <a className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm" href="#"><PlayCircle size={20} /></a>
              <a className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-indigo-600 shadow-sm" href="#"><Share2 size={20} /></a>
            </div>
          </div>
          {[
            { title: "Platform", links: ["For Creators", "For Brands", "Pricing", "Success Stories"] },
            { title: "Resources", links: ["Help Center", "Creator Guidelines", "API Documentation", "Media Kit"] },
            { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] }
          ].map((col, i) => (
            <div key={i}>
              <h5 className="font-label-bold text-on-surface mb-6">{col.title}</h5>
              <ul className="space-y-4 text-caption text-on-surface-variant">
                {col.links.map((link, j) => (
                  <li key={j}><a className="hover:text-indigo-600 transition-colors" href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-container-max mx-auto mt-20 pt-8 border-t border-indigo-200/20 text-center">
          <p className="text-caption text-on-surface-variant">© 2024 Viral Mantra. All rights reserved. Built for the performance era.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
