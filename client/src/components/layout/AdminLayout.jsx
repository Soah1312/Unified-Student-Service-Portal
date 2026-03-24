import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AdminSidebar from '../AdminSidebar';
import { Menu } from 'lucide-react';

export default function AdminLayout() {
  const isAdmin = localStorage.getItem('isAdmin');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans overflow-hidden" style={{ background: 'var(--bg)' }}>
      <AdminSidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      
      <main className="flex-1 overflow-y-auto w-full relative">
        <div className="md:hidden flex items-center p-4 border-b border-[rgba(245,245,240,0.1)] bg-[var(--bg-dark)] sticky top-0 z-10">
          <button className="hamburger-btn" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={20} />
          </button>
          <span className="ml-4 font-display font-bold text-white tracking-widest text-sm">ADMIN CONSOLE</span>
        </div>
        <div className="max-w-7xl mx-auto w-full p-4 md:p-6 lg:p-8 min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
