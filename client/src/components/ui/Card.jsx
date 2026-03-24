import React from 'react';

export default function Card({ children, className = '', onClick, hover = false, padding = 'p-6', style = {} }) {
  return (
    <div
      className={`editorial-card ${className}`}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 0.2s',
        ...style,
      }}
      onMouseEnter={hover && onClick ? (e) => e.currentTarget.style.borderColor = 'var(--border-dark)' : undefined}
      onMouseLeave={hover && onClick ? (e) => e.currentTarget.style.borderColor = 'var(--border)' : undefined}
    >
      {children}
    </div>
  );
}
