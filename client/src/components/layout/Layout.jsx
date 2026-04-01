import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeToast, setThemeToast] = useState('');

  const handleThemeChanged = (nextTheme) => {
    setThemeToast(`Theme changed to ${nextTheme} mode`);
  };

  React.useEffect(() => {
    if (!themeToast) return;
    const timer = window.setTimeout(() => setThemeToast(''), 1800);
    return () => window.clearTimeout(timer);
  }, [themeToast]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', background: 'var(--bg)' }}>
      <Navbar
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        onThemeChanged={handleThemeChanged}
      />
      {themeToast && (
        <div style={{
          background: 'var(--bg-dark)',
          color: 'var(--text-invert)',
          border: '1px solid rgba(245,245,240,0.12)',
          padding: '8px 16px',
          fontSize: 12,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          position: 'fixed',
          top: 94,
          right: 16,
          zIndex: 80,
        }}>
          {themeToast}
        </div>
      )}
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
