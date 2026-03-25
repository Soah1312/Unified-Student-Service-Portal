import React, { useState, useEffect } from 'react';
import { noticeService } from '../services/noticeService';
import Badge from '../components/ui/Badge';
import { FileText, Grid, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [data, setData] = useState({ notices: [], loading: true });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noticesRes = await noticeService.getNotices();
        setData({ notices: noticesRes?.data || [], loading: false });
      } catch {
        setData(prev => ({ ...prev, loading: false }));
      }
    };
    fetchData();
  }, []);

  if (data.loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-muted)', fontStyle: 'italic' }}>
      Loading dashboard...
    </div>
  );

  const totalNotices = data.notices.length;
  const recentNotices = [...data.notices].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  const categoryCounts = data.notices.reduce((acc, c) => { acc[c.category] = (acc[c.category] || 0) + 1; return acc; }, {});

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontFamily: 'var(--font-ui)' }}>

      {/* Header */}
      <header style={{ borderBottom: '3px solid var(--border-dark)', paddingBottom: 24 }}>
        <div className="editorial-label-accent" style={{ marginBottom: 8 }}>Admin Overview</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.03em' }}>
          Dashboard
        </h1>
      </header>

      {/* Stats row */}
      <div className="stat-row">
        <div style={{ padding: '32px 24px', textAlign: 'center', background: 'var(--bg-card)' }}>
          <FileText size={24} style={{ margin: '0 auto 12px', color: 'var(--text-muted)' }} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>{totalNotices}</div>
          <div className="editorial-label" style={{ marginTop: 8 }}>Total Notices</div>
        </div>
        {Object.entries(categoryCounts).slice(0, 2).map(([cat, count], i) => (
          <div key={cat} style={{ padding: '32px 24px', textAlign: 'center', background: 'var(--bg-card)' }}>
            <Grid size={24} style={{ margin: '0 auto 12px', color: i === 0 ? '#2E7D32' : '#B45309' }} />
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>{count}</div>
            <div className="editorial-label" style={{ marginTop: 8 }}>{cat}</div>
          </div>
        ))}
      </div>

      {/* Recent notices table */}
      <div style={{ border: '1px solid var(--border)' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="editorial-label-accent" style={{ marginBottom: 4 }}>Recent</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
              Latest Notices
            </h2>
          </div>
          <Link to="/admin/notices" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', borderBottom: '1px solid rgba(255,51,51,0.3)' }}>
            Manage all →
          </Link>
        </div>
        {recentNotices.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 16, fontStyle: 'italic', color: 'var(--text-muted)' }}>No notices published yet.</div>
        ) : recentNotices.map((notice, i) => (
          <div key={notice.id} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
            padding: '14px 24px',
            borderBottom: i < recentNotices.length - 1 ? '1px solid var(--border)' : 'none',
            background: 'var(--bg-card)',
            transition: 'background 0.15s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{notice.title}</h3>
              <p style={{ fontSize: 12, fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{notice.content}</p>
            </div>
            <Badge variant={notice.priority === 'high' ? 'danger' : notice.priority === 'medium' ? 'warning' : 'default'}>
              {notice.category}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
