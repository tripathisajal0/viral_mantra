import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { useUI } from '../context/UIContext';

const DashboardLayout = ({ children }) => {
  const { isSidebarOpen, toggleSidebar, closeSidebar } = useUI();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header - Only visible on small screens */}
      <div className="lg:hidden sticky top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-b border-slate-100 z-50 px-4 flex items-center justify-between">
        <h1 className="text-xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Viral Mantra</h1>
        <button
          onClick={toggleSidebar}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
          aria-label="Toggle Menu"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - Desktop always visible, Mobile toggleable */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 transition-transform duration-300 transform lg:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <Sidebar onClose={closeSidebar} />
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen w-full overflow-x-hidden">
        <div className="hidden lg:block sticky top-0 z-30">
          <TopBar />
        </div>
        <main className="flex-grow p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
