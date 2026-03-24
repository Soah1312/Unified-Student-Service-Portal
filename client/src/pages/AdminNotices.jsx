import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { noticeService } from '../services/noticeService';
import NoticeCard from '../components/NoticeCard';
import Button from '../components/ui/Button';
import { Plus } from 'lucide-react';

export default function AdminNotices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const res = await noticeService.getNotices();
      if (res.success) setNotices(res.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchNotices(); }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this notice?')) {
      const res = await noticeService.deleteNotice(id);
      if (res.success) setNotices(prev => prev.filter(n => n.id !== id));
      else alert(res.message || 'Failed to delete');
    }
  };

  const handleEdit = (notice) => navigate(`/admin/notices/edit/${notice.id}`, { state: { notice } });

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300, fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text-muted)', fontStyle: 'italic' }}>
      Loading notices...
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'var(--font-ui)' }}>

      {/* Header */}
      <header style={{ borderBottom: '3px solid var(--border-dark)', paddingBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="editorial-label-accent" style={{ marginBottom: 8 }}>Admin · Notices</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.03em' }}>
            Notice Management
          </h1>
          <p style={{ marginTop: 8, fontSize: 14, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>
            Publish and manage official portal notices.
          </p>
        </div>
        <Button onClick={() => navigate('/admin/notices/create')} variant="primary" icon={<Plus size={16} />}>
          New Notice
        </Button>
      </header>

      {notices.length === 0 ? (
        <div style={{ padding: '64px 24px', textAlign: 'center', border: '1px solid var(--border)', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontStyle: 'italic', color: 'var(--text-muted)' }}>The notice board is empty.</p>
          <Button onClick={() => navigate('/admin/notices/create')} variant="secondary">
            Publish the first notice →
          </Button>
        </div>
      ) : (
        <div className="notice-admin-grid">
          {notices.map(notice => (
            <NoticeCard key={notice.id} notice={notice} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
