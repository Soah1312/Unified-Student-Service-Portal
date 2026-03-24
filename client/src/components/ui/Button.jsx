import React from 'react';

const sizeMap = {
  sm: { padding: '8px 18px', fontSize: '12px' },
  md: { padding: '11px 24px', fontSize: '13px' },
  lg: { padding: '14px 36px', fontSize: '15px' },
};

const variantClassMap = {
  primary:   'btn-editorial-primary',
  secondary: 'btn-editorial-secondary',
  danger:    'btn-editorial-danger',
  ghost:     'btn-editorial-ghost',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  fullWidth = false,
  icon = null,
  isLoading = false,
}) {
  const cls = variantClassMap[variant] || variantClassMap.primary;
  const sz  = sizeMap[size] || sizeMap.md;

  return (
    <button
      type={type}
      className={`${cls} ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      style={{ ...sz, width: fullWidth ? '100%' : 'auto' }}
    >
      {isLoading ? (
        <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      ) : icon ? (
        <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>
      ) : null}
      {children}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </button>
  );
}
