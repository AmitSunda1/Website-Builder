import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'outline' | 'filled' | 'popular';
}

const variantStyles: Record<string, React.CSSProperties> = {
  outline: {
    border: '1px solid #d1d5db',
    color: '#374151',
    background: 'transparent',
  },
  filled: {
    background: 'rgba(37,99,235,0.08)',
    color: '#2563eb',
    border: '1px solid rgba(37,99,235,0.2)',
  },
  popular: {
    background: '#7c3aed',
    color: '#fff',
    border: 'none',
  },
};

export default function Badge({ children, variant = 'outline' }: BadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '3px 12px',
        borderRadius: '9999px',
        fontSize: '12px',
        fontWeight: 500,
        letterSpacing: '0.02em',
        ...variantStyles[variant],
      }}
    >
      {children}
    </span>
  );
}
