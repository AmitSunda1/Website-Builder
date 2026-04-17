'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

// Real integration logos, extracted from blitz-api.ai
const integrations = [
  {
    name: 'Clay',
    src: '/assets-images/framerusercontent.com_images_KcdBGyZsJWdbdJVHndym4DRTtw.webp',
    width: 80,
    height: 26,
  },
  {
    name: 'Make',
    src: '/assets-images/framerusercontent.com_images_by0K6v0Y3j2IM56ZMX7sTyuoXk.webp',
    width: 80,
    height: 26,
  },
  {
    name: 'n8n',
    src: '/assets-images/framerusercontent.com_images_UTzLxaYnEZ4z37UUvAeUL03Y0o.png',
    width: 60,
    height: 22,
  },
  {
    name: 'Databar.ai',
    src: '/assets-images/framerusercontent.com_images_PjC4jDuhfuksx9hUCrGaJ9kt240.png',
    width: 90,
    height: 28,
  },
  {
    name: 'Lead Expo',
    src: '/assets-images/framerusercontent.com_images_ZgF9VEl7cwBm5ks5XqGl0q4gIbs.png',
    width: 100,
    height: 30,
  },
  {
    name: 'Throxy',
    src: '/assets-images/framerusercontent.com_images_NaGM8UmEZYtAB6VZv0Ylr54FQus.png',
    width: 90,
    height: 24,
  },
  {
    name: 'Solufinance',
    src: '/assets-images/framerusercontent.com_images_5e7roAEn2RheF7t3vlKCeRcZu3w.webp',
    width: 100,
    height: 22,
  },
  {
    name: 'Growth Engine X',
    src: '/assets-images/framerusercontent.com_images_pTls0Enge50VTc2aDjTz9NP0Dg.png',
    width: 120,
    height: 34,
  },
  {
    name: 'TOKIN',
    src: '/assets-images/framerusercontent.com_images_BHI2bWe7IpC83bEeLZMEKAiehs4.png',
    width: 80,
    height: 24,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export default function Integrations() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="integrations"
      ref={ref}
      style={{
        background: '#fff',
        padding: '96px 0',
        borderTop: '1px solid #f3f4f6',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 40px', textAlign: 'center' }}>
        <motion.h2
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#111827',
            marginBottom: '12px',
          }}
        >
          Seamless Integrations
        </motion.h2>
        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{ fontSize: '15px', color: '#6b7280', marginBottom: '56px', lineHeight: 1.6 }}
        >
          BlitzAPI plugs into your existing workflows — from no-code automations to enterprise stacks.
        </motion.p>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {integrations.map((integration, i) => (
            <motion.div
              key={`${integration.name}-${i}`}
              custom={i + 2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              whileHover={{ y: -4, scale: 1.06, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
              style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '14px',
                padding: '16px 28px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '120px',
              }}
            >
              <Image
                src={integration.src}
                alt={integration.name}
                width={integration.width}
                height={integration.height}
                style={{ objectFit: 'contain', maxHeight: '36px', width: 'auto' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
