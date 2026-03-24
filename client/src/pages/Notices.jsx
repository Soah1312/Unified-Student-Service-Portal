import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import CommentSection from '../components/ui/CommentSection';
import { Search, Filter, MessageSquare } from 'lucide-react';

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedNotice, setSelectedNotice] = useState(null);

  useEffect(() => { fetchNotices(); }, []);

  const fetchNotices = async () => {
    const res = await api.getNotices();
    if (res?.success) setNotices(res.data);
    setLoading(false);
  };

  const handleAddComment = async (text) => {
    if (!selectedNotice) return;
    const res = await api.addComment(selectedNotice.id, 'Aarav Singh', text);
    if (res?.success) {
      const updated = { ...selectedNotice, comments: [...selectedNotice.comments, res.data] };
      setSelectedNotice(updated);
      setNotices(notices.map(n => n.id === updated.id ? updated : n));
    }
  };

  const filtered = notices.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase()) ||
    n.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-muted)', fontStyle: 'italic' }}>
      Fetching notices...
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'var(--font-ui)' }}>

      {/* Header */}
      <div style={{ borderBottom: '3px solid var(--border-dark)', paddingBottom: 24 }}>
        <div className="editorial-label-accent" style={{ marginBottom: 8 }}>Official Bulletin</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.03em' }}>
            Notices
          </h1>
          {/* Search bar */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={16} />
              <input
                type="text"
                placeholder="Search notices..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="editorial-input"
                style={{ paddingLeft: 38, width: 260 }}
              />
            </div>
            <button style={{ padding: '10px 12px', background: 'var(--bg-card)', border: '1.5px solid var(--border)', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-dark)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
              <Filter size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Notice list */}
      {filtered.length === 0 ? (
        <div style={{ padding: '48px', textAlign: 'center', border: '1px solid var(--border)', background: 'var(--bg-card)', fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', color: 'var(--text-muted)' }}>
          No notices found matching "{search}"
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--border)' }}>
          {filtered.map((notice, i) => (
            <div
              key={notice.id}
              onClick={() => setSelectedNotice(notice)}
              style={{
                display: 'flex', gap: 16, justifyContent: 'space-between', alignItems: 'flex-start',
                padding: '20px 24px',
                borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                borderLeft: notice.priority === 'high' ? '3px solid var(--accent)' : '3px solid transparent',
                background: 'var(--bg-card)', cursor: 'pointer',
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--bg-card)'}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <Badge variant={notice.priority === 'high' ? 'danger' : notice.priority === 'medium' ? 'warning' : 'default'}>{notice.category}</Badge>
                  <span className="editorial-label">{notice.date} · By {notice.author}</span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 6 }}>
                  {notice.title}
                </h3>
                <p style={{ fontSize: 13, fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', lineHeight: 1.7, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {notice.content}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', flexShrink: 0 }}>
                <MessageSquare size={16} />
                <span style={{ fontSize: 12, fontWeight: 600 }}>{notice.comments?.length || 0}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <Modal isOpen={!!selectedNotice} onClose={() => setSelectedNotice(null)} title={selectedNotice?.category + ' Notice'}>
        {selectedNotice && (
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 12 }}>
              {selectedNotice.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
              <span className="editorial-label">By {selectedNotice.author}</span>
              <span style={{ color: 'var(--border)' }}>·</span>
              <span className="editorial-label">{selectedNotice.date}</span>
              <Badge variant={selectedNotice.priority === 'high' ? 'danger' : selectedNotice.priority === 'medium' ? 'warning' : 'default'}>
                {selectedNotice.priority}
              </Badge>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.85, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
              {selectedNotice.content}
            </p>
            <CommentSection comments={selectedNotice.comments} onAddComment={handleAddComment} />
          </div>
        )}
      </Modal>
    </div>
  );
}
