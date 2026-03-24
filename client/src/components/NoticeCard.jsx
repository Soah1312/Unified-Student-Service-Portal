import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import Badge from './ui/Badge';

export default function NoticeCard({ notice, onEdit, onDelete }) {

  return (
    <div style={{
      background: 'var(--bg)',
      border: '1px solid var(--border)',
      padding: '24px',
      transition: 'border-color 0.2s',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--border-dark)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16, marginBottom: 16 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
            <Badge>{notice.category}</Badge>
            <span className="editorial-label">{notice.date}</span>
          </div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 18, fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.2, letterSpacing: '-0.01em',
          }}>
            {notice.title}
          </h3>
        </div>

        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          {onEdit && (
            <button
              onClick={() => onEdit(notice)}
              title="Edit"
              style={{
                padding: '8px', color: 'var(--text-muted)',
                border: '1px solid transparent', cursor: 'pointer',
                transition: 'all 0.15s', background: 'transparent',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              <Edit2 size={16} />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(notice.id)}
              title="Delete"
              style={{
                padding: '8px', color: 'var(--text-muted)',
                border: '1px solid transparent', cursor: 'pointer',
                transition: 'all 0.15s', background: 'transparent',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      <hr className="editorial-rule" style={{ margin: '0 0 12px' }} />

      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: 14, lineHeight: 1.75,
        color: 'var(--text-secondary)',
        display: '-webkit-box', WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {notice.content}
      </p>
    </div>
  );
}
