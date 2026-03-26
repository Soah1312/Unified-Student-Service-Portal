import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { adminService } from '../../services/adminService';
import AdminSidebar from '../AdminSidebar';
import { Menu } from 'lucide-react';

const ALLOWED_ADMIN_EMAILS = ['crceadmin@gmail.com', 'admin@gmail.com'];

export default function AdminLayout() {
  const [authState, setAuthState] = useState('loading'); // 'loading' | 'authed' | 'unauthed'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && ALLOWED_ADMIN_EMAILS.includes(user.email)) {
        setAuthState('authed');
      } else {
        setAuthState('unauthed');
      }
    });
    return unsubscribe;
  }, []);

  if (authState === 'loading') {
    return (
      <div style={{
        minHeight: '100dvh', background: 'var(--bg-dark)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <p style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', fontSize: 14 }}>Verifying session…</p>
      </div>
    );
  }

  if (authState === 'unauthed') {
    return <Navigate to="/admin" replace />;
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
