import React from 'react';

export default function About5() {
  return (
    <section style={{ background: '#F5F5F0', padding: '60px', fontFamily: "'Libre Baskerville', serif", borderBottom: '3px solid #1A1A1A' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
        <div>
          <div style={{ fontSize: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FF3333', marginBottom: 16 }}>Our Origin</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 900, color: '#1A1A1A', lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: 24 }}>
            Built in frustration.<br /><em style={{ fontStyle: 'italic' }}>Refined with purpose.</em>
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: '#444', marginBottom: 20 }}>
            We were students. We missed events because of buried emails. We missed scholarship deadlines because notices went to the wrong board. We built USSP so the next generation of students doesn't have to.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: '#666' }}>
            USSP isn't a feature list. It's a philosophy: campus services should be as effortless as reading a newspaper — pick it up, find what you need, and get on with your life.
          </p>
        </div>
        <div style={{ background: '#1A1A1A', padding: '48px 40px', color: '#F5F5F0' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 80, color: '#FF3333', lineHeight: 0.7, marginBottom: 24 }}>"</div>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontStyle: 'italic', lineHeight: 1.6, color: '#F5F5F0', marginBottom: 32 }}>
            The best campus technology is the kind students don't have to think about — it just works, exactly when they need it.
          </p>
          <div style={{ borderTop: '1px solid rgba(245,245,240,0.15)', paddingTop: 24 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: '#F5F5F0' }}>Arjun Verma</div>
            <div style={{ fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#888', marginTop: 6 }}>Co-founder & CEO, USSP</div>
          </div>
        </div>
      </div>
    </section>
  );
}
