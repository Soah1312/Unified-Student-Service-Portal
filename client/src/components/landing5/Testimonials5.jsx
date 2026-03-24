import React from 'react';

const testimonials = [
  { quote: "USSP replaced five different channels I used just to stay informed about my own college. It should not have taken this long for someone to build this.", name: "Priya Mehta", role: "B.Tech CSE, Year 3", publication: "Student Review" },
  { quote: "As an administrator, broadcasting a notice to 2,000 students used to involve three staff members and a 40-minute workflow. USSP made it a 90-second task.", name: "Dr. Suresh Iyer", role: "Department Head, Mechanical Engg.", publication: "Faculty Forum" },
  { quote: "I retrieved my bonafide certificate at midnight before a visa appointment. No email. No office visit. The document was simply there.", name: "Aditya Rao", role: "MBA, Year 2", publication: "Graduate Times" },
];

export default function Testimonials5() {
  return (
    <section style={{ background: '#1A1A1A', padding: '60px', fontFamily: "'Libre Baskerville', serif" }}>
      <div style={{ marginBottom: 40, borderBottom: '1px solid rgba(245,245,240,0.15)', paddingBottom: 16 }}>
        <div style={{ fontSize: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FF3333', marginBottom: 8 }}>Testimonials</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: '#F5F5F0', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          In their own words.
        </h2>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'rgba(245,245,240,0.08)' }}>
        {testimonials.map(({ quote, name, role, publication }) => (
          <div key={name} style={{ background: '#1A1A1A', padding: '40px 32px' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 64, color: '#FF3333', lineHeight: 0.6, marginBottom: 24, opacity: 0.6 }}>"</div>
            <p style={{ fontSize: 17, fontStyle: 'italic', lineHeight: 1.8, color: '#C8C8C0', marginBottom: 28 }}>{quote}</p>
            <div style={{ borderTop: '1px solid rgba(245,245,240,0.1)', paddingTop: 20 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700, color: '#F5F5F0', marginBottom: 4 }}>{name}</div>
              <div style={{ fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#666', marginBottom: 4 }}>{role}</div>
              <div style={{ fontSize: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#FF3333', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{publication}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
