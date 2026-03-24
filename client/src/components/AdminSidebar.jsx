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
    <aside style={{
      width: 240, flexShrink: 0,
      background: 'var(--bg-dark)',
      borderRight: '2px solid var(--border-dark)',
      display: 'flex', flexDirection: 'column',
      height: '100dvh', position: 'sticky', top: 0,
      fontFamily: 'var(--font-ui)',
    }}>
      {/* Brand */}
      <div style={{ padding: '28px 24px', borderBottom: '1px solid rgba(245,245,240,0.08)' }}>
        <div className="editorial-label-accent" style={{ marginBottom: 8 }}>Admin Console</div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 20, fontWeight: 900,
          color: 'var(--text-invert)',
          letterSpacing: '-0.02em', lineHeight: 1.1,
        }}>
          THE CAMPUS<span style={{ color: 'var(--accent)' }}>·</span>PORTAL
        </div>
      </div>

      <nav style={{ flex: 1, padding: '12px 0' }}>
        {[
          { to: '/admin/dashboard', label: 'Dashboard',   icon: <LayoutDashboard size={18} /> },
          { to: '/admin/notices',   label: 'Notices',      icon: <FileText size={18} />      },
        ].map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '13px 24px',
              borderLeft: isActive ? '3px solid var(--accent)' : '3px solid transparent',
              background: isActive ? 'rgba(255,51,51,0.06)' : 'transparent',
              color: isActive ? 'var(--text-invert)' : 'rgba(245,245,240,0.45)',
              fontSize: 13, fontWeight: isActive ? 700 : 400,
              transition: 'all 0.15s',
              textDecoration: 'none',
            })}
          >
            <span style={{ opacity: 0.7, flexShrink: 0 }}>{icon}</span>
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(245,245,240,0.08)' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: 12,
            width: '100%', padding: '12px 12px',
            background: 'transparent',
            color: 'var(--accent)',
            fontSize: 13, fontWeight: 600,
            border: '1px solid rgba(255,51,51,0.2)',
            cursor: 'pointer', transition: 'all 0.2s',
            fontFamily: 'var(--font-ui)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,51,51,0.08)'; e.currentTarget.style.borderColor = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,51,51,0.2)'; }}
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
