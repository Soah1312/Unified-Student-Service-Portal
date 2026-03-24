import React, { useState, useEffect } from 'react';

export default function Navbar5() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <header style={{ background: '#F5F5F0', fontFamily: "'Libre Baskerville', serif" }}>
      {/* Top bar */}
      <div style={{ borderBottom: '1px solid #1A1A1A', padding: '8px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: '#888', letterSpacing: '0.08em', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{today}</span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Subscribe', 'Sign In', 'About'].map(item => (
            <a key={item} href="#" style={{ fontSize: 11, color: '#888', letterSpacing: '0.06em', fontFamily: "'Plus Jakarta Sans', sans-serif", transition: 'color 0.2s' }}
              onMouseEnter={e => e.target.style.color = '#FF3333'}
              onMouseLeave={e => e.target.style.color = '#888'}>{item}</a>
          ))}
        </div>
      </div>

      {/* Masthead */}
      <div style={{
        padding: '24px 60px', textAlign: 'center',
        borderBottom: '3px solid #1A1A1A',
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(245,245,240,0.96)' : '#F5F5F0',
        backdropFilter: scrolled ? 'blur(8px)' : 'none',
        transition: 'all 0.3s',
      }}>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900,
          color: '#1A1A1A', letterSpacing: '-0.03em', lineHeight: 1,
        }}>
          THE CAMPUS<span style={{ color: '#FF3333' }}>·</span>PORTAL
        </h1>
        <div style={{ borderTop: '1px solid #1A1A1A', borderBottom: '1px solid #1A1A1A', padding: '8px 0', marginTop: 12, display: 'flex', justifyContent: 'center', gap: 40 }}>
          {['Platform', 'Features', 'Institutions', 'Students', 'Press'].map(item => (
            <a key={item} href="#" style={{ fontSize: 12, color: '#444', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>{item}</a>
          ))}
        </div>
      </div>
    </header>
  );
}
