'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Actual extracted logos from blitz-api.ai — confirmed by visual inspection
const logos = [
  {
    name: 'Clay',
    src: '/assets-images/framerusercontent.com_images_KcdBGyZsJWdbdJVHndym4DRTtw.webp',
    width: 100,
    height: 32,
  },
  {
    name: 'Make',
    src: '/assets-images/framerusercontent.com_images_by0K6v0Y3j2IM56ZMX7sTyuoXk.webp',
    width: 100,
    height: 32,
  },
  {
    name: 'n8n',
    src: '/assets-images/framerusercontent.com_images_UTzLxaYnEZ4z37UUvAeUL03Y0o.png',
    width: 80,
    height: 28,
  },
  {
    name: 'Throxy',
    src: '/assets-images/framerusercontent.com_images_NaGM8UmEZYtAB6VZv0Ylr54FQus.png',
    width: 110,
    height: 30,
  },
  {
    name: 'Lead Expo',
    src: '/assets-images/framerusercontent.com_images_ZgF9VEl7cwBm5ks5XqGl0q4gIbs.png',
    width: 120,
    height: 36,
  },
  {
    name: 'Databar.ai',
    src: '/assets-images/framerusercontent.com_images_PjC4jDuhfuksx9hUCrGaJ9kt240.png',
    width: 110,
    height: 36,
  },
  {
    name: 'Solufinance',
    src: '/assets-images/framerusercontent.com_images_5e7roAEn2RheF7t3vlKCeRcZu3w.webp',
    width: 120,
    height: 28,
  },
  {
    name: 'Growth Engine X',
    src: '/assets-images/framerusercontent.com_images_pTls0Enge50VTc2aDjTz9NP0Dg.png',
    width: 140,
    height: 40,
  },
];

// Duplicate for seamless infinite scroll
const allLogos = [...logos, ...logos];

export default function LogoTicker() {
  return (
    <section
      style={{
        background: '#ffffff',
        padding: '40px 0',
        borderTop: '1px solid #f3f4f6',
        borderBottom: '1px solid #f3f4f6',
        overflow: 'hidden',
      }}
    >
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        {/* Fade edges */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '140px',
            background: 'linear-gradient(to right, #fff, transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '140px',
            background: 'linear-gradient(to left, #fff, transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        <motion.div
          style={{
            display: 'flex',
            gap: '64px',
            alignItems: 'center',
            width: 'max-content',
            padding: '8px 0',
          }}
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {allLogos.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 0,
                opacity: 0.65,
                filter: 'grayscale(100%)',
                transition: 'opacity 0.2s, filter 0.2s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '1';
                (e.currentTarget as HTMLElement).style.filter = 'grayscale(0%)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '0.65';
                (e.currentTarget as HTMLElement).style.filter = 'grayscale(100%)';
              }}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                style={{ objectFit: 'contain', maxHeight: '40px', width: 'auto' }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
