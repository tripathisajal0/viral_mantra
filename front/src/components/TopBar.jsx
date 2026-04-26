import React from 'react';
import { Menu, Wallet, ChevronDown, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';

const TopBar = () => {
  const { profile } = useAuth();
  const { toggleSidebar } = useUI();

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-8 z-30 bg-white/70 backdrop-blur-md border-b border-indigo-100 shadow-sm w-full">
      <div className="flex items-center gap-3 md:gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors lg:hidden"
        >
          <Menu size={20} />
        </button>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {/* Wallet */}
        <Link 
          to="/wallet"
          className="hidden sm:flex items-center gap-2 bg-indigo-50 pl-3 pr-2 py-1.5 rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 bg-indigo-600/10 rounded-full flex items-center justify-center group-hover:bg-indigo-600/20 transition-colors">
              <Wallet size={12} className="text-indigo-600" />
            </div>
            <span className="text-slate-700 font-bold text-xs md:text-sm">
              ₹{profile?.walletBalance?.toLocaleString() || '0.00'}
            </span>
          </div>
          <div className="p-1 text-slate-400 group-hover:text-indigo-600 transition-colors">
            <ChevronDown size={14} />
          </div>
        </Link>

        {/* Notification */}
        <button className="relative p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border border-white" />
        </button>

        {/* Avatar */}
        <Link 
          to="/profile"
          className="w-8 md:w-9 h-8 md:h-9 rounded-xl overflow-hidden border-2 border-indigo-200 shadow-sm hover:border-indigo-400 transition-all cursor-pointer"
        >
          <img
            alt="User profile"
            className="w-full h-full object-cover"
            src={profile?.avatar || "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974&auto=format&fit=crop"}
          />
        </Link>
      </div>
    </header>
  );
};

export default TopBar;
