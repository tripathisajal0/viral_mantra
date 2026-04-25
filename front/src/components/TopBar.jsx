import React from 'react';
import { Search, Bell, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TopBar = () => {
  const navigate = useNavigate();
  const { profile } = useAuth();

  return (
    <header className="h-16 flex items-center justify-between px-4 lg:px-8 bg-white/60 backdrop-blur-md border-b border-slate-100 shadow-sm w-full">
      <div className="flex items-center gap-6 flex-1">
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
          <input 
            className="w-full bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20" 
            placeholder="Search brands or campaigns..." 
            type="text"
          />
        </div>
        <nav className="hidden lg:flex items-center gap-6 ml-8">
          <a className="font-label-bold text-label-bold text-slate-500 hover:text-primary transition-colors" href="#">Guidelines</a>
          <a className="font-label-bold text-label-bold text-slate-500 hover:text-primary transition-colors" href="#">Brands</a>
          <a className="font-label-bold text-label-bold text-slate-500 hover:text-primary transition-colors" href="#">Case Studies</a>
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <MessageSquare size={20} />
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        
        {profile?.role === 'brand' && (
          <button 
            onClick={() => navigate('/brand/launch')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-full font-label-bold text-label-bold shadow-md hover:opacity-90 transition-opacity"
          >
            Launch Campaign
          </button>
        )}

        <img 
          alt="User profile" 
          className="w-10 h-10 rounded-full border-2 border-primary/20 bg-white" 
          src={profile?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop"} 
        />
      </div>
    </header>
  );
};

export default TopBar;
