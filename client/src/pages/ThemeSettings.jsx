import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme as setThemeInStore } from '../store/uiSlice';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/ui/Button';

export default function ThemeSettings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme, setTheme, toggleTheme } = useTheme();
  const reduxTheme = useSelector((state) => state.ui.theme);

  const handleSetTheme = (nextTheme) => {
    setTheme(nextTheme);
    dispatch(setThemeInStore(nextTheme));
  };

  return (
    <div style={{ maxWidth: 780, display: 'flex', flexDirection: 'column', gap: 28, fontFamily: 'var(--font-ui)' }}>
      <header style={{ borderBottom: '3px solid var(--border-dark)', paddingBottom: 22 }}>
        <div className="editorial-label-accent" style={{ marginBottom: 8 }}>Preferences</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
          Theme Settings
        </h1>
        <p style={{ marginTop: 8, color: 'var(--text-muted)', fontStyle: 'italic' }}>
          Choose your reading mode and apply it across the portal.
        </p>
      </header>

      <section style={{ border: '1px solid var(--border)', background: 'var(--bg-card)', padding: 24, display: 'grid', gap: 16 }}>
        <p className="editorial-label">Current Theme</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </span>
          <Button onClick={toggleTheme} variant="secondary" size="sm">
            Quick Toggle
          </Button>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <Button
            variant={theme === 'light' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => handleSetTheme('light')}
          >
            Use Light
          </Button>
          <Button
            variant={theme === 'dark' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => handleSetTheme('dark')}
          >
            Use Dark
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </section>

      <section style={{ borderLeft: '3px solid var(--accent)', background: 'rgba(255,51,51,0.04)', padding: '12px 16px' }}>
        <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          Redux theme value: <strong>{reduxTheme}</strong>
        </p>
      </section>
    </div>
  );
}
