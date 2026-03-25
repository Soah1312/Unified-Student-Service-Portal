import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { noticeService } from '../services/noticeService';
import NoticeForm from '../components/NoticeForm';

export default function CreateNotice() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const isEditing = Boolean(id);
  const initialData = location.state?.notice || null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    setError('');
    try {
      const res = isEditing
        ? await noticeService.updateNotice(id, formData)
        : await noticeService.createNotice(formData);

      if (res.success) navigate('/admin/notices');
      else setError(res.message || 'Operation failed. Please try again.');
    } catch {
      setError('An unexpected error occurred. Please try again.');
    }
    setIsSubmitting(false);
  };

  return (
    <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: 32, fontFamily: 'var(--font-ui)' }}>

      {/* Header */}
      <header style={{ borderBottom: '3px solid var(--border-dark)', paddingBottom: 24 }}>
        <div className="editorial-label-accent" style={{ marginBottom: 8 }}>
          Admin · Notices · {isEditing ? 'Edit' : 'Create'}
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.05, letterSpacing: '-0.03em' }}>
          {isEditing ? 'Edit Notice' : 'Publish New Notice'}
        </h1>
        <p style={{ marginTop: 8, fontSize: 14, color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontStyle: 'italic' }}>
          {isEditing ? 'Update the details and save your changes.' : 'Broadcast an official announcement to the student portal.'}
        </p>
      </header>

      {/* Error */}
      {error && (
        <div style={{ padding: '14px 18px', borderLeft: '3px solid var(--accent)', background: 'rgba(255,51,51,0.04)' }}>
          <p style={{ fontSize: 13, color: 'var(--accent)', fontWeight: 600 }}>{error}</p>
        </div>
      )}

      {/* Form */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', padding: '28px 32px' }}>
        <NoticeForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/admin/notices')}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
