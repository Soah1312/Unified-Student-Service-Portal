import React from 'react';

export default function Hero5() {
  return (
    <section style={{ background: '#F5F5F0', fontFamily: "'Playfair Display', serif", padding: '0 60px' }}>
      {/* Main editorial grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3px 2fr 3px 1fr', gap: 0, borderBottom: '3px solid #1A1A1A', paddingTop: 40 }}>
        {/* Left column */}
        <div style={{ paddingRight: 32, paddingBottom: 40, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #1A1A1A' }}>Analysis</div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: '#333', fontStyle: 'italic' }}>
              "The campus portal problem has existed for decades. USSP is the first product to actually solve it, not paper over it."
            </p>
            <p style={{ fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#888', marginTop: 12 }}>— EdTech Review, March 2025</p>
          </div>
          <div style={{ marginTop: 40 }}>
            <div style={{ width: '100%', height: 1, background: '#1A1A1A', marginBottom: 16 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['12,000+', 'Students Served'], ['34', 'Partner Colleges'], ['99.8%', 'Uptime SLA']].map(([val, lab]) => (
                <div key={lab} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: '#1A1A1A' }}>{val}</span>
                  <span style={{ fontSize: 11, fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#888', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{lab}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ background: '#1A1A1A' }} />

        {/* Center column — hero headline */}
        <div style={{ padding: '0 48px 40px' }}>
          <div style={{ fontSize: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FF3333', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #1A1A1A' }}>Breaking · Student Technology</div>

          <h1 style={{
            fontSize: 'clamp(52px, 7vw, 100px)', fontWeight: 900,
            color: '#1A1A1A', lineHeight: 0.92, letterSpacing: '-0.04em',
            marginBottom: 24,
          }}>
            The Portal<br />
            That Changes<br />
            <span style={{ color: '#FF3333', fontStyle: 'italic' }}>Everything.</span>
          </h1>

          <div style={{ width: '100%', height: 3, background: '#1A1A1A', marginBottom: 20 }} />

          <p style={{ fontSize: 19, lineHeight: 1.75, color: '#1A1A1A', fontFamily: "'Libre Baskerville', serif", fontWeight: 400, marginBottom: 32 }}>
            USSP unifies every student service into a single, intelligently designed portal. Notices. Events. Documents. Deadlines. One place, zero friction, total clarity.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button style={{
              padding: '14px 36px', background: '#1A1A1A', color: '#F5F5F0',
              border: '2px solid #1A1A1A', fontSize: 14, fontFamily: "'Libre Baskerville', serif",
              cursor: 'pointer', letterSpacing: '0.02em', fontStyle: 'italic',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.target.style.background = '#FF3333'; e.target.style.borderColor = '#FF3333'; }}
              onMouseLeave={e => { e.target.style.background = '#1A1A1A'; e.target.style.borderColor = '#1A1A1A'; }}>
              Read the full story →
            </button>
            <button style={{
              padding: '14px 36px', background: 'transparent', color: '#1A1A1A',
              border: '2px solid #1A1A1A', fontSize: 14, fontFamily: "'Libre Baskerville', serif",
              cursor: 'pointer', letterSpacing: '0.02em',
            }}>
              Request access
            </button>
          </div>
        </div>

        {/* Divider */}
        <div style={{ background: '#1A1A1A' }} />

        {/* Right column */}
        <div style={{ paddingLeft: 32, paddingBottom: 40 }}>
          <div style={{ fontSize: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', marginBottom: 16, paddingBottom: 8, borderBottom: '1px solid #1A1A1A' }}>Latest Updates</div>
          {['Semester exam schedule published', 'Library hours extended through April', 'Scholarship deadline extended to April 15', 'New faculty onboarding guide available'].map((item, i) => (
            <div key={i} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: i < 3 ? '1px solid #ddd' : 'none' }}>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: '#1A1A1A', fontFamily: "'Libre Baskerville', serif" }}>{item}</p>
              <span style={{ fontSize: 11, fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#888', marginTop: 4, display: 'block' }}>Campus Notice</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
