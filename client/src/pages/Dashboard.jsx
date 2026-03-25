import React, { useState, useEffect } from 'react';
import { noticeService } from '../services/noticeService';
import { getEvents } from '../services/eventService';
import { userService } from '../services/userService';
import Badge from '../components/ui/Badge';
import { FileText, Calendar, Bell, Users, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [data, setData] = useState({ notices: [], events: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Dashboard: Fetching content...');
        // We use a Promise.all but wrap each in a catch to prevents one failure from blocking everything
        const [noticesRes, eventsRes] = await Promise.all([
          noticeService.getNotices().catch(err => ({ success: false, data: [] })),
          getEvents().catch(err => ({ success: false, data: [] }))
        ]);
        
        setData({
          notices: noticesRes?.data?.slice(0, 3) || [],
          events:  eventsRes?.data?.slice(0, 2)  || [],
        });
      } catch (err) {
        console.error('Dashboard error:', err);
        setError('Failed to load dashboard content.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 400, fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--text-muted)' }}>
      Loading today's edition...
    </div>
  );

  if (error) return (
    <div style={{ padding: 40, textAlign: 'center', color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
      {error}
    </div>
  );

  const stats = [
    { icon: <FileText size={20} />, label: 'New Notices',      value: data.notices.length },
    { icon: <Calendar size={20} />, label: 'Upcoming Events',  value: data.events.length },
    { icon: <Bell size={20} />,     label: 'Unread Alerts',    value: '0' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontFamily: 'var(--font-ui)' }}>

      <header style={{ borderBottom: '3px solid var(--border-dark)', paddingBottom: 24 }}>
        <div className="editorial-label-accent" style={{ marginBottom: 10 }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </div>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900,
          color: 'var(--text-primary)', lineHeight: 1.05, letterSpacing: '-0.03em',
        }}>
          Campus Dashboard.
        </h1>
        <p style={{ marginTop: 8, fontSize: 15, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>
          Welcome back. Here is the latest from the student portal.
        </p>
      </header>

      <div className="stat-row">
        {stats.map(({ icon, label, value }) => (
          <div key={label} style={{ padding: '24px 20px', textAlign: 'center', background: 'var(--bg-card)' }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: 8, display: 'flex', justifyContent: 'center' }}>{icon}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 900, color: 'var(--text-primary)' }}>{value}</div>
            <div className="editorial-label" style={{ marginTop: 6 }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Recent Notices */}
        <div style={{ background: 'var(--bg-card)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>Recent Notices</h2>
            <Link to="/notices" style={{ fontSize: 12, fontWeight: 700, color: 'var(--accent)', textDecoration: 'none' }}>View all →</Link>
          </div>
          <div>
            {data.notices.map((notice, i) => (
              <div key={notice.id} style={{ padding: '20px 24px', borderBottom: i < data.notices.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>{notice.title}</h3>
                  <Badge>{notice.category}</Badge>
                </div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{notice.content.substring(0, 100)}...</p>
              </div>
            ))}
            {data.notices.length === 0 && <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>No recent notices.</div>}
          </div>
        </div>

        {/* Upcoming Events */}
        <div style={{ background: 'var(--bg-card)' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700 }}>Upcoming Events</h2>
          </div>
          <div>
            {data.events.map((event, i) => (
              <div key={event.id} style={{ padding: '20px 24px', borderBottom: i < data.events.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', gap: 16 }}>
                <div style={{ background: 'var(--bg-dark)', padding: 8, textAlign: 'center', minWidth: 50 }}>
                   <div style={{ color: 'var(--accent)', fontSize: 10, fontWeight: 700 }}>{new Date(event.date).toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</div>
                   <div style={{ color: '#fff', fontSize: 20, fontWeight: 900 }}>{new Date(event.date).getDate()}</div>
                </div>
                <div>
                  <h3 style={{ fontSize: 15, fontWeight: 700 }}>{event.title}</h3>
                  <div className="editorial-label">{event.time || 'All Day'}</div>
                </div>
              </div>
            ))}
             {data.events.length === 0 && <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>No upcoming events.</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
