import React from 'react';
import {
  LayoutDashboard,
  Megaphone,
  Compass,
  Wallet,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

import { useAuth } from '../context/AuthContext';
import { PlusCircle } from 'lucide-react';

const Sidebar = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = useAuth();

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const creatorItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/creator' },
    { icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
    { icon: Compass, label: 'Marketplace', path: '/marketplace' },
    { icon: Wallet, label: 'Earnings', path: '/earnings' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const brandItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/brand' },
    { icon: PlusCircle, label: 'Launch Campaign', path: '/brand/launch' },
    { icon: Megaphone, label: 'My Campaigns', path: '/brand/campaigns' },
    { icon: BarChart3, label: 'Brand Analytics', path: '/brand/analytics' },
    { icon: Wallet, label: 'Wallet', path: '/brand/wallet' },
    { icon: Settings, label: 'Brand Settings', path: '/brand/settings' },
  ];

  const menuItems = profile?.role === 'brand' ? brandItems : creatorItems;

  return (
    <aside className="h-full flex flex-col p-4 w-64 border-r border-slate-100 bg-white shadow-[20px_0_40px_rgba(79,70,229,0.04)] antialiased">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Viral Mantra</h1>
        <p className="text-[10px] uppercase tracking-widest text-outline font-bold">Creator Economy Hub</p>
      </div>

      <nav className="flex-1 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={handleLinkClick}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02]",
                isActive
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                  : "text-slate-600 hover:bg-slate-100/50"
              )}
            >
              <item.icon size={20} />
              <span className="font-label-bold text-label-bold">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-slate-100">
        <button
          onClick={() => navigate('/login')}
          className="w-full mb-4 py-3 px-4 bg-surface-container text-primary font-label-bold text-label-bold rounded-xl hover:bg-surface-container-high transition-colors"
        >
          Switch Role
        </button>
        <Link to="/help" className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-indigo-600 transition-colors">
          <HelpCircle size={20} />
          <span className="font-label-bold text-label-bold">Help Center</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-error transition-colors text-left"
        >
          <LogOut size={20} />
          <span className="font-label-bold text-label-bold">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
