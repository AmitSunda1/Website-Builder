'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'Pricing', href: '#pricing' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? 'rgba(255,255,255,0.95)' : '#ffffff',
        backdropFilter: 'blur(10px)',
        borderBottom: scrolled ? '1px solid #e5e7eb' : '1px solid #f3f4f6',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 32px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px',
        }}
      >
        {/* Logo — extracted real asset */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Image
            src="/assets-images/framerusercontent.com_images_RASesxV163EOQ4IVc0HISIG4r4.png"
            alt="BlitzAPI"
            width={130}
            height={40}
            style={{ objectFit: 'contain' }}
            priority
          />
        </Link>

        {/* Desktop Links */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
            flex: 1,
          }}
          className="nav-links-desktop"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: '#374151',
                transition: 'color 0.2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#111827')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#374151')}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}
          className="nav-actions-desktop"
        >
          <a
            href="#login"
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#374151',
              padding: '8px 16px',
              textDecoration: 'none',
            }}
          >
            Login
          </a>
          <motion.a
            href="#signup"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#111827',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 500,
              padding: '9px 22px',
              borderRadius: '9999px',
              textDecoration: 'none',
            }}
          >
            Get 1,000 credits free <span>›</span>
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: 'none', padding: '4px' }}
          className="nav-hamburger"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            background: '#fff',
            borderTop: '1px solid #e5e7eb',
            padding: '16px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{ fontSize: '15px', fontWeight: 500, color: '#111827', textDecoration: 'none' }}
            >
              {link.label}
            </a>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb' }} />
          <a href="#login" style={{ fontSize: '15px', color: '#374151', textDecoration: 'none' }}>Login</a>
          <a
            href="#signup"
            style={{
              background: '#111827',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 500,
              textAlign: 'center',
              textDecoration: 'none',
            }}
          >
            Get 1,000 credits free →
          </a>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-actions-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}
