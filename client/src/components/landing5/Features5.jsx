import React from 'react';

const features = [
  { label: 'I.', title: 'Notice Board', body: 'Every department announcement, scholarship notice, and institutional update — curated, filtered, and always current.' },
  { label: 'II.', title: 'Events Register', body: 'The complete campus social and academic calendar. Register, mark attendance, retrieve certificates from the same interface.' },
  { label: 'III.', title: 'Document Vault', body: 'Academic certificates, identity letters, financial receipts. All official. All downloadable. None requiring you to visit the admin block.' },
  { label: 'IV.', title: 'Alert Engine', body: 'Push notifications calibrated to your academic calendar and department. No spam. No silence when something actually matters.' },
  { label: 'V.', title: 'Admin Command', body: 'Faculty and staff get a broadcast desk powerful enough for institution-wide notices, granular enough for department-only messages.' },
  { label: 'VI.', title: 'Data Integrity', body: 'FERPA-grade encryption, zero advertising, full audit trails. Institutional-grade privacy for every student record.' },
];

export default function Features5() {
  return (
    <section style={{ background: '#F5F5F0', padding: '60px', borderBottom: '3px solid #1A1A1A', fontFamily: "'Libre Baskerville', serif" }}>
      <div style={{ marginBottom: 48, borderBottom: '3px solid #1A1A1A', paddingBottom: 16 }}>
        <div style={{ fontSize: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#FF3333', marginBottom: 8 }}>Features · The Complete Record</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          Six pillars of the unified portal.
        </h2>
      </div>

      <div style={{ columns: 2, gap: 48 }}>
        {features.map(({ label, title, body }) => (
          <div key={label} style={{ breakInside: 'avoid', marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid #ddd' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 28, color: '#FF3333' }}>{label}</span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: '#1A1A1A' }}>{title}</h3>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.85, color: '#555' }}>{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
