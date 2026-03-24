import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, LogOut } from 'lucide-react';

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-[rgba(255,255,255,0.1)] flex flex-col h-full shrink-0 hidden md:flex">
      <div className="p-6">
        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Admin Portal
        </h2>
      </div>
      
      <nav className="flex-1 px-4 flex flex-col gap-2">
        <NavLink 
          to="/admin/dashboard" 
          className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>
        <NavLink 
          to="/admin/notices" 
          className={({isActive}) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
        >
          <FileText size={20} />
          Notices Management
        </NavLink>
      </nav>

      <div className="p-4 border-t border-[rgba(255,255,255,0.1)]">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
