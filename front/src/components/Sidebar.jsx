import React from 'react';
import {
  Home,
  Users,
  Trophy,
  LayoutGrid,
  Headphones,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useUI } from '../context/UIContext';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const { isSidebarOpen, closeSidebar } = useUI();
  const { profile } = useAuth();
  const role = profile?.role || 'creator';

  const creatorSections = [
    {
      title: 'GENERAL',
      items: [
        { icon: Home, label: 'Home', path: '/creator' },
      ]
    },
    {
      title: 'ACTIVITY',
      items: [
        { icon: LayoutGrid, label: 'My Campaigns', path: '/my-campaigns' },
      ]
    },
    {
      title: 'SUPPORT',
      items: [
        { icon: Headphones, label: 'Live Support', path: '/support' },
      ]
    }
  ];

  const brandSections = [
    {
      title: 'GENERAL',
      items: [
        { icon: Home, label: 'Dashboard', path: '/brand' },
        { icon: LayoutGrid, label: 'Launch Campaign', path: '/brand/launch' },
      ]
    },
    {
      title: 'FINANCE',
      items: [
        { icon: Home, label: 'VM Points Wallet', path: '/brand/wallet' },
      ]
    },
    {
      title: 'SUPPORT',
      items: [
        { icon: Headphones, label: 'Live Support', path: '/support' },
      ]
    }
  ];

  const sections = role === 'brand' ? brandSections : creatorSections;

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      <aside className={cn(
        "fixed left-0 top-0 h-full w-64 z-50 flex flex-col p-4 transition-transform duration-300 ease-in-out lg:translate-x-0",
        "bg-white/90 backdrop-blur-xl border-r border-indigo-100 shadow-[4px_0_24px_rgba(79,70,229,0.06)]",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10 px-2 pt-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
            <span className="text-white font-black text-lg">V</span>
          </div>
          <h1 className="text-lg font-black tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Viral Mantra
          </h1>
          <button
            onClick={closeSidebar}
            className="ml-auto text-slate-400 lg:hidden hover:text-indigo-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-6 overflow-y-auto">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-1">
              <h3 className="text-[10px] font-bold text-slate-400 tracking-widest px-4 mb-1 uppercase">
                {section.title}
              </h3>
              {section.items.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={closeSidebar}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group",
                      isActive
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-200"
                        : "text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
                    )}
                  >
                    <item.icon size={18} />
                    <span className="font-semibold text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-indigo-100">
          <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100">
            <p className="text-xs text-slate-500 mb-1">Need help?</p>
            <p className="text-sm text-slate-700 font-semibold mb-3">Contact our support team 24/7</p>
            <button className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xs rounded-xl hover:opacity-90 transition-opacity shadow-md shadow-indigo-200">
              Chat with us
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
