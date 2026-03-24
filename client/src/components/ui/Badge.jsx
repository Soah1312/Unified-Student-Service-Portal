import React from 'react';

const variants = {
  default: {
    background: 'var(--bg-secondary)',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border)',
  },
  primary: {
    background: 'var(--text-primary)',
    color: 'var(--text-invert)',
    border: '1px solid var(--text-primary)',
  },
  success: {
    background: 'transparent',
    color: '#2E7D32',
    border: '1.5px solid #2E7D32',
  },
  danger: {
    background: 'var(--accent)',
    color: '#fff',
    border: '1.5px solid var(--accent)',
  },
  warning: {
    background: 'transparent',
    color: '#B45309',
    border: '1.5px solid #B45309',
  },
};

export default function Badge({ children, variant = 'default', className = '' }) {
  const v = variants[variant] || variants.default;
  return (
    <span
      className={`badge-editorial ${className}`}
      style={v}
    >
      {children}
    </span>
  );
}
