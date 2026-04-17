'use client';

import { motion } from 'framer-motion';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
}

const styles: Record<string, React.CSSProperties> = {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'inherit',
    fontWeight: 500,
    borderRadius: '9999px',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    whiteSpace: 'nowrap' as const,
  },
  primary: {
    background: '#2563eb',
    color: '#fff',
    boxShadow: '0 1px 3px rgba(37,99,235,0.3)',
  },
  secondary: {
    background: 'transparent',
    color: '#111827',
    border: '1.5px solid #e5e7eb',
  },
  ghost: {
    background: 'transparent',
    color: '#fff',
    border: '1.5px solid rgba(255,255,255,0.2)',
  },
  dark: {
    background: '#111827',
    color: '#fff',
  },
  sm: { padding: '8px 18px', fontSize: '13px' },
  md: { padding: '11px 24px', fontSize: '14px' },
  lg: { padding: '14px 32px', fontSize: '15px' },
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  className,
}: ButtonProps) {
  const combined: React.CSSProperties = {
    ...styles.base,
    ...styles[variant],
    ...styles[size],
  };

  const content = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} style={combined} className={className}>
        {content}
      </a>
    );
  }

  return (
    <button style={combined} onClick={onClick} className={className}>
      {content}
    </button>
  );
}
