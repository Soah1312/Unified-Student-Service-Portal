import React from 'react';
import { Bell, Sun, Moon, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userService } from '../../services/userService';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar({ onMenuToggle, onThemeChanged }) {
  const [unreadCount, setUnreadCount] = React.useState(0);
  const { theme, isDark, toggleTheme } = useTheme();
  const reduxTheme = useSelector((state) => state.ui.theme);
  
  React.useEffect(() => {
    const checkNotifications = async () => {
      const res = await userService.getNotifications();
      if (res?.success) {
        setUnreadCount(res.data.filter(n => !n.read).length);
      }
    };
    checkNotifications();
    // Refresh occasionally or on storage event
    window.addEventListener('storage', checkNotifications);
    return () => window.removeEventListener('storage', checkNotifications);
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = toggleTheme();
    if (onThemeChanged) onThemeChanged(nextTheme);
  };


  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <header className="app-navbar" style={{
      background: 'var(--bg-dark)',
      borderBottom: '3px solid var(--border-dark)',
      position: 'sticky', top: 0, zIndex: 40,
    }}>
      {/* Top strip */}
      <div style={{
        padding: '8px 16px',
        borderBottom: '1px solid rgba(245,245,240,0.08)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(245,245,240,0.35)', letterSpacing: '0.06em', display: 'none' }} className="md-inline">
          {today}
        </span>
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 11, color: 'rgba(245,245,240,0.25)', letterSpacing: '0.1em' }}>
          UNIFIED STUDENT SERVICE PORTAL
        </span>
      </div>

      {/* Main bar */}
      <div style={{
        height: 56, padding: '0 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}>
        {/* Masthead */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="hamburger-btn" onClick={onMenuToggle}>
            <Menu size={20} />
          </button>
          <Link to="/dashboard" style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(18px, 4vw, 22px)', fontWeight: 900,
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
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            onClick={handleThemeToggle}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            style={{
              position: 'relative',
              padding: '8px',
              color: 'rgba(245,245,240,0.75)',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid rgba(245,245,240,0.15)',
            }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
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
          <span className="editorial-label" style={{ color: 'rgba(245,245,240,0.35)' }}>
            {reduxTheme}
          </span>
        </div>
      </div>
    </header>
  );
}
