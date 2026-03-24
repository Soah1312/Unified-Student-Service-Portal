import React from 'react';

export default function Footer5() {
  return (
    <footer style={{ background: '#1A1A1A', padding: '60px 60px 36px', fontFamily: "'Libre Baskerville', serif" }}>
      <div style={{ borderBottom: '1px solid rgba(245,245,240,0.15)', paddingBottom: 40, marginBottom: 32 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: '#F5F5F0', marginBottom: 8 }}>THE CAMPUS<span style={{ color: '#FF3333' }}>·</span>PORTAL</div>
            <p style={{ fontSize: 13, color: '#666', lineHeight: 1.8, maxWidth: 260 }}>The unified student service portal. Elegant by design. Powerful by necessity.</p>
          </div>
          {[['Platform', ['Notices', 'Events', 'Vault', 'Alerts']], ['Company', ['About', 'Press', 'Careers']], ['Legal', ['Privacy', 'Terms', 'Data']]].map(([col, items]) => (
            <div key={col}>
              <div style={{ fontSize: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: '#FF3333', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 16 }}>{col}</div>
              {items.map(item => (
                <a key={item} href="#" style={{ display: 'block', fontSize: 14, color: '#555', marginBottom: 10, transition: 'color 0.2s', fontFamily: "'Libre Baskerville', serif" }}
                  onMouseEnter={e => e.target.style.color = '#F5F5F0'}
                  onMouseLeave={e => e.target.style.color = '#555'}>{item}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#444' }}>© 2025 Unified Student Service Portal. All rights reserved.</span>
        <span style={{ fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#FF3333', fontStyle: 'italic' }}>Est. 2023 · India</span>
      </div>
    </footer>
  );
}
