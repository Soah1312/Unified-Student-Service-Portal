import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import { Mail, Phone, BookOpen, Clock, ShieldCheck, Calendar } from 'lucide-react';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProfile().then(res => {
      if (res?.success) setProfile(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-muted)', fontStyle: 'italic' }}>
      Loading profile...
    </div>
  );
  if (!profile) return (
    <div style={{ textAlign: 'center', padding: 60, fontFamily: 'var(--font-display)', color: 'var(--text-muted)', fontStyle: 'italic' }}>Profile not found.</div>
  );

  const acadStats = [
    { label: 'Current Term', value: profile.semester },
    { label: 'CGPA', value: profile.cgpa },
    { label: 'Credits Earned', value: profile.credits },
    { label: 'Registered Events', value: profile.registeredEvents?.length || 0 },
  ];

  const activity = [
    { label: 'Registered for TechZen 2026', date: 'Mar 19, 2026' },
    { label: 'Updated contact information', date: 'Mar 12, 2026' },
    { label: 'Commented on Exam Schedule notice', date: 'Mar 10, 2026' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, maxWidth: 1000, fontFamily: 'var(--font-ui)' }}>

      {/* Profile Header */}
      <div style={{ borderBottom: '3px solid var(--border-dark)', paddingBottom: 32 }}>
        <div className="editorial-label-accent" style={{ marginBottom: 12 }}>Student Profile</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{
            width: 80, height: 80, background: 'var(--bg-dark)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid var(--border-dark)', flexShrink: 0,
          }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, color: 'var(--text-invert)' }}>
              {profile.avatar || profile.name?.[0] || 'A'}
            </span>
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 8 }}>
              {profile.name}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <span className="editorial-label">{profile.rollNo}</span>
              <span style={{ color: 'var(--border)' }}>·</span>
              <span className="editorial-label">{profile.branch}</span>
              <Badge variant="success"><ShieldCheck size={10} style={{ marginRight: 4, display: 'inline' }} />Verified Student</Badge>
            </div>
          </div>
          <Button variant="secondary" size="sm">Edit Profile</Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24 }}>

        {/* Left: Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-dark)' }}>
            <div className="editorial-label" style={{ color: 'rgba(245,245,240,0.4)' }}>Contact</div>
          </div>
          <div style={{ background: 'var(--bg-card)' }}>
            {[
              { icon: <Mail size={14} />, label: 'Email', value: profile.email },
              { icon: <Phone size={14} />, label: 'Phone', value: profile.phone },
            ].map(({ icon, label, value }) => (
              <div key={label} style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--text-muted)', paddingTop: 2, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div className="editorial-label" style={{ marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-primary)', wordBreak: 'break-all' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '16px 20px', background: 'var(--bg-card)' }}>
            <Button variant="ghost" fullWidth size="sm">Update contact</Button>
          </div>
        </div>

        {/* Right: Academics + Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          {/* Academic stats */}
          <div style={{ border: '1px solid var(--border)' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-dark)' }}>
              <div className="editorial-label" style={{ color: 'rgba(245,245,240,0.4)' }}>Academic Overview</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: 'var(--bg-card)' }}>
              {acadStats.map(({ label, value }, i) => (
                <div key={label} style={{ padding: '20px 16px', textAlign: 'center', borderRight: i < 3 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</div>
                  <div className="editorial-label" style={{ marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div style={{ border: '1px solid var(--border)' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', background: 'var(--bg-dark)' }}>
              <div className="editorial-label" style={{ color: 'rgba(245,245,240,0.4)' }}>Recent Activity</div>
            </div>
            <div style={{ background: 'var(--bg-card)' }}>
              {activity.map(({ label, date }, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: i < activity.length - 1 ? '1px solid var(--border)' : 'none', gap: 16 }}>
                  <p style={{ fontSize: 13, fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{label}</p>
                  <span className="editorial-label" style={{ flexShrink: 0, color: 'var(--text-muted)' }}>{date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
