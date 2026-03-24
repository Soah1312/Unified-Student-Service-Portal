import React from 'react';
import { Bell, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const unreadCount = 2;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <header style={{
      background: 'var(--bg-dark)',
      borderBottom: '3px solid var(--border-dark)',
      position: 'sticky', top: 0, zIndex: 40,
    }}>
      {/* Top strip */}
      <div style={{
        padding: '8px 32px',
        borderBottom: '1px solid rgba(245,245,240,0.08)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(245,245,240,0.35)', letterSpacing: '0.06em' }}>
          {today}
        </span>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(245,245,240,0.25)', letterSpacing: '0.1em' }}>
          UNIFIED STUDENT SERVICE PORTAL
        </span>
      </div>

      {/* Main bar */}
      <div style={{
        height: 56, padding: '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Masthead */}
        <Link to="/dashboard" style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22, fontWeight: 900,
            color: 'var(--text-invert)',
            letterSpacing: '-0.03em',
          }}>
            THE CAMPUS
          </span>
          <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900 }}>·</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 900, color: 'var(--text-invert)', letterSpacing: '-0.03em' }}>
            PORTAL
          </span>
        </Link>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Link
            to="/notifications"
            style={{ position: 'relative', padding: '8px', color: 'rgba(245,245,240,0.6)', display: 'flex', alignItems: 'center', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,240,0.6)'}
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span style={{
                position: 'absolute', top: 4, right: 4,
                width: 16, height: 16, borderRadius: '50%',
                background: 'var(--accent)', fontSize: 9, fontWeight: 700,
                color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-ui)',
              }}>
                {unreadCount}
              </span>
            )}
          </Link>

          <div style={{ width: 1, height: 24, background: 'rgba(245,245,240,0.12)', margin: '0 8px' }} />

          <Link
            to="/profile"
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,245,240,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{
              width: 32, height: 32, background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 12, color: '#fff',
            }}>
              AS
            </div>
            <span style={{ fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 600, color: 'rgba(245,245,240,0.8)' }}>
              Aarav Singh
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
