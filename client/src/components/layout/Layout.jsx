import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', background: 'var(--bg)' }}>
      <Navbar onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        <Sidebar mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        <main className="page-padding" style={{
          flex: 1, overflowY: 'auto',
          maxWidth: '100%',
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
