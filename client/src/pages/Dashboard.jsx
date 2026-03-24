import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Badge from '../components/ui/Badge';
import { FileText, Calendar, Bell, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [data, setData] = useState({ notices: [], events: [], profile: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [noticesRes, eventsRes, profileRes] = await Promise.all([
          api.getNotices(), api.getEvents(), api.getProfile(),
        ]);
        setData({
          notices: noticesRes?.data?.slice(0, 3) || [],
          events:  eventsRes?.data?.slice(0, 2)  || [],
          profile: profileRes?.data || null,
        });
      } finally { setLoading(false); }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-muted)', fontStyle: 'italic' }}>
      Loading today's edition...
    </div>
  );

  const stats = [
    { icon: <FileText size={20} />, label: 'New Notices',      value: '3' },
    { icon: <Calendar size={20} />, label: 'Upcoming Events',  value: '5' },
    { icon: <Bell size={20} />,     label: 'Unread Alerts',    value: '2' },
    { icon: <Users size={20} />,    label: 'Registered Apps',  value: '2' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontFamily: 'var(--font-ui)' }}>

      {/* Page header */}
      <header style={{ borderBottom: '3px solid var(--border-dark)', paddingBottom: 24 }}>
        <div className="editorial-label-accent" style={{ marginBottom: 10 }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900,
          color: 'var(--text-primary)', lineHeight: 1.05, letterSpacing: '-0.03em',
        }}>
          Good morning, {data.profile?.name?.split(' ')[0] || 'Student'}.
        </h1>
        <p style={{ marginTop: 8, fontSize: 15, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>
          {data.profile?.branch} · {data.profile?.year} · Here's what's on campus today.
        </p>
      </header>

      {/* Stats */}
      <div className="stat-row">
        {stats.map(({ icon, label, value }, i) => (
          <div key={label} style={{
            padding: '24px 20px', textAlign: 'center',
            background: 'var(--bg-card)',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
          >
            <div style={{ color: 'var(--text-muted)', marginBottom: 8, display: 'flex', justifyContent: 'center' }}>{icon}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</div>
            <div className="editorial-label" style={{ marginTop: 6 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="dashboard-grid">

        {/* Recent Notices */}
        <div style={{ background: 'var(--bg-card)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div className="editorial-label-accent" style={{ marginBottom: 4 }}>Latest</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                Recent Notices
              </h2>
            </div>
            <Link to="/notices" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              View all <ChevronRight size={14} />
            </Link>
          </div>
          <div>
            {data.notices.map((notice, i) => (
              <div key={notice.id} style={{ padding: '20px 24px', borderBottom: i < data.notices.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3 }}>{notice.title}</h3>
                  <Badge variant={notice.priority === 'high' ? 'danger' : notice.priority === 'medium' ? 'warning' : 'default'}>{notice.category}</Badge>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'var(--font-body)', lineHeight: 1.65, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {notice.content}
                </p>
                <div className="editorial-label" style={{ marginTop: 10, color: 'var(--text-muted)' }}>Posted {notice.date}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div style={{ background: 'var(--bg-card)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
            <div className="editorial-label-accent" style={{ marginBottom: 4 }}>Calendar</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Upcoming Events
            </h2>
          </div>
          <div>
            {data.events.map((event, i) => {
              const d = new Date(event.date);
              return (
                <div key={event.id} style={{ padding: '20px 24px', borderBottom: i < data.events.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ background: 'var(--bg-dark)', padding: '8px 12px', textAlign: 'center', minWidth: 56, flexShrink: 0 }}>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--accent)', textTransform: 'uppercase' }}>
                      {d.toLocaleDateString('en-US', { month: 'short' })}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 900, color: 'var(--text-invert)', lineHeight: 1 }}>
                      {d.getDate()}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.3, marginBottom: 4 }}>{event.title}</h3>
                    {event.time && <div className="editorial-label">{event.time}</div>}
                  </div>
                </div>
              );
            })}
            <Link to="/events" style={{ display: 'block', padding: '16px 24px', textAlign: 'center', fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-secondary)', borderTop: '1px solid var(--border)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.target.style.color = 'var(--accent)'; e.target.style.background = 'var(--bg-secondary)'; }}
              onMouseLeave={e => { e.target.style.color = 'var(--text-secondary)'; e.target.style.background = 'transparent'; }}>
              See all events →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
