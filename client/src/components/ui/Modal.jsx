import React from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
        backgroundColor: 'rgba(26,26,26,0.7)',
        backdropFilter: 'blur(2px)',
      }}
    >
      {/* Backdrop click */}
      <div style={{ position: 'fixed', inset: 0 }} onClick={onClose} />

      {/* Modal panel */}
      <div
        className="animate-slide-up"
        style={{
          position: 'relative', zIndex: 10,
          width: '100%', maxWidth: 560,
          background: 'var(--bg)',
          border: '2px solid var(--border-dark)',
          maxHeight: '90vh', overflowY: 'auto',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: '1px solid var(--border)',
        }}>
          <div>
            <div className="editorial-label-accent" style={{ marginBottom: 4 }}>Notice</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1 }}>{title}</h2>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: 8, color: 'var(--text-muted)',
              border: '1px solid transparent', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}
