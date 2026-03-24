import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Megaphone, Calendar, Bell, User } from 'lucide-react';

const navItems = [
  { path: '/dashboard',      label: 'Dashboard',     icon: <LayoutDashboard size={18} />, section: 'I.' },
  { path: '/notices',       label: 'Notices',       icon: <Megaphone size={18} />,       section: 'II.' },
  { path: '/events',        label: 'Events',        icon: <Calendar size={18} />,        section: 'III.' },
  { path: '/notifications', label: 'Notifications', icon: <Bell size={18} />,            section: 'IV.' },
  { path: '/profile',       label: 'Profile',       icon: <User size={18} />,            section: 'V.' },
];

import { X } from 'lucide-react';

export default function Sidebar({ mobileOpen, onClose }) {
  const content = (
    <>
      {/* Section label */}
      <div className="app-sidebar-header" style={{ padding: '20px 20px 12px', borderBottom: '1px solid rgba(245,245,240,0.08)' }}>
        <span className="editorial-label" style={{ color: 'rgba(245,245,240,0.3)' }}>Navigation</span>
      </div>

      <nav style={{ flex: 1, padding: '8px 0' }}>
        {navItems.map(({ path, label, icon, section }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/dashboard'}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 20px',
              borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
              background: isActive ? 'rgba(255,51,51,0.06)' : 'transparent',
              color: isActive ? 'var(--text-invert)' : 'rgba(245,245,240,0.45)',
              fontSize: 13, fontWeight: isActive ? 700 : 400,
              letterSpacing: '0.01em',
              transition: 'all 0.15s',
              textDecoration: 'none',
            })}
            onMouseEnter={e => { if (!e.currentTarget.style.borderLeft.includes('accent')) { e.currentTarget.style.color = 'rgba(245,245,240,0.8)'; e.currentTarget.style.background = 'rgba(245,245,240,0.04)'; } }}
            onMouseLeave={e => { if (!e.currentTarget.style.borderLeft.includes('accent')) { e.currentTarget.style.color = 'rgba(245,245,240,0.45)'; e.currentTarget.style.background = 'transparent'; } }}
          >
            <span style={{ opacity: 0.7, flexShrink: 0 }}>{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(245,245,240,0.06)' }}>
        <p style={{ fontSize: 11, color: 'rgba(245,245,240,0.2)', lineHeight: 1.6 }}>
          © 2025 Campus Portal
        </p>
      </div>
    </>
  );

  return (
    <>
      <aside className="app-sidebar" style={{
        width: 220, flexShrink: 0,
        background: 'var(--bg-dark)',
        borderRight: '2px solid var(--border-dark)',
        flexDirection: 'column',
        height: 'calc(100dvh - 83px)',
        position: 'sticky', top: 83,
        fontFamily: 'var(--font-ui)',
      }}>
        {content}
      </aside>

      {mobileOpen && (
        <div className="mobile-nav-overlay" onClick={onClose}>
          <aside className="mobile-nav-drawer" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid rgba(245,245,240,0.08)' }}>
              <span className="editorial-label" style={{ color: 'rgba(245,245,240,0.3)' }}>Portal Menu</span>
              <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}>
                <X size={20} />
              </button>
            </div>
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
