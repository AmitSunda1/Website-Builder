'use client';

import Image from 'next/image';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Blog', 'Reviews', 'FAQs', 'Contact'],
  Legal: ['Terms of Service', 'Privacy Policy'],
  'API Docs': ['Guide', 'API Reference'],
};

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0a0a0a',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '80px 40px 0',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '48px',
            paddingBottom: '64px',
          }}
        >
          {/* Brand column — real extracted Blitz logo */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <Image
                src="/assets-images/framerusercontent.com_images_RASesxV163EOQ4IVc0HISIG4r4.png"
                alt="BlitzAPI"
                width={130}
                height={36}
                style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)' }}
              />
            </div>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, maxWidth: '220px', marginBottom: '32px' }}>
              The data engine behind high-performing GTM teams
            </p>
            <p style={{ fontSize: '13px', color: '#4b5563' }}>
              © 2025 BlitzAPI. All rights reserved.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#fff',
                  marginBottom: '20px',
                  letterSpacing: '0.01em',
                }}
              >
                {section}
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      style={{
                        fontSize: '14px',
                        color: '#6b7280',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#fff')}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#6b7280')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            borderTop: '1px solid #1f1f1f',
          }}
        >
          <a
            href="#youtube"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '24px',
              borderRight: '1px solid #1f1f1f',
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#fff')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#6b7280')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
            </svg>
            Youtube
          </a>
          <a
            href="#linkedin"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '24px',
              color: '#6b7280',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#fff')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#6b7280')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      {/* Large "Blitz" watermark */}
      <div
        style={{
          textAlign: 'center',
          paddingTop: '20px',
          paddingBottom: '0',
          overflow: 'hidden',
          lineHeight: 0.85,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(80px, 18vw, 220px)',
            fontWeight: 900,
            color: 'rgba(255,255,255,0.03)',
            letterSpacing: '-0.04em',
            display: 'block',
          }}
        >
          Blitz
        </span>
      </div>
    </footer>
  );
}
