import React from 'react';

export default function CTA5() {
  return (
    <section style={{ background: '#FF3333', padding: '80px 60px', fontFamily: "'Playfair Display', serif", textAlign: 'center' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ fontSize: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,245,240,0.6)', marginBottom: 24 }}>Editorial · Call to Action</div>
        <h2 style={{ fontSize: 'clamp(44px, 7vw, 88px)', fontWeight: 900, color: '#F5F5F0', lineHeight: 0.92, letterSpacing: '-0.04em', marginBottom: 32 }}>
          Your campus awaits.<br />
          <em>Will you claim it?</em>
        </h2>
        <div style={{ width: 60, height: 4, background: '#F5F5F0', margin: '0 auto 32px' }} />
        <p style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, color: 'rgba(245,245,240,0.8)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 48px' }}>
          12,000 students chose clarity over chaos. The portal is free. The chaos is optional.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/dashboard" style={{
            display: 'inline-block',
            padding: '18px 48px', background: '#F5F5F0', color: '#1A1A1A',
            border: '2px solid #F5F5F0', fontSize: 15, fontFamily: "'Playfair Display', serif",
            fontWeight: 700, letterSpacing: '0.01em', cursor: 'pointer',
            fontStyle: 'italic', transition: 'all 0.2s', textDecoration: 'none',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#F5F5F0'; e.currentTarget.style.borderColor = '#1A1A1A'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F5F5F0'; e.currentTarget.style.color = '#1A1A1A'; e.currentTarget.style.borderColor = '#F5F5F0'; }}>
            Enter the portal →
          </a>
          <button style={{
            padding: '18px 48px', background: 'transparent', color: '#F5F5F0',
            border: '2px solid rgba(245,245,240,0.4)', fontSize: 15, fontFamily: "'Libre Baskerville', serif",
            cursor: 'pointer', transition: 'border-color 0.2s',
          }}
            onMouseEnter={e => e.target.style.borderColor = '#F5F5F0'}
            onMouseLeave={e => e.target.style.borderColor = 'rgba(245,245,240,0.4)'}>
            Schedule a briefing
          </button>
        </div>
      </div>
    </section>
  );
}
