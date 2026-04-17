'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const useCases = [
  {
    icon: '🎯',
    title: 'Top Quality B2B Data',
    desc: 'Enrich, validate, and ship clean data into your workflows.',
  },
  {
    icon: '📋',
    title: 'Waterfall ICP',
    desc: 'Prioritize by persona → Get only what matters, stop when quota is met.',
  },
  {
    icon: '🔄',
    title: 'Unlimited data enrichment',
    desc: 'Enrich emails, phones, LinkedIn and company data — at scale, through simple API calls.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function UseCases() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      style={{
        background: '#ffffff',
        padding: '96px 0',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        {/* Left: use cases list */}
        <div>
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#111827',
              lineHeight: 1.15,
              marginBottom: '48px',
            }}
          >
            Your <span style={{ color: '#2563eb' }}>API teammate</span> for any GTM workflow
          </motion.h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
            {useCases.map((uc, i) => (
              <motion.div
                key={uc.title}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                style={{
                  background: '#f9fafb',
                  border: '1.5px solid #e5e7eb',
                  borderRadius: '14px',
                  padding: '20px 24px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s',
                }}
                whileHover={{ borderColor: '#2563eb', scale: 1.01 }}
              >
                <span style={{ fontSize: '20px', display: 'block', marginBottom: '8px' }}>{uc.icon}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#111827', marginBottom: '6px' }}>
                  {uc.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.6 }}>{uc.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.a
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            href="#signup"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#2563eb',
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Get 1,000 credits free ›
          </motion.a>
        </div>

        {/* Right: LinkedIn profile mockup */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            background: 'linear-gradient(135deg, #dbeafe 0%, #ede9fe 100%)',
            borderRadius: '24px',
            padding: '40px',
            minHeight: '400px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Floating LinkedIn icons */}
          {[
            { top: '10%', left: '5%', rotate: '-15deg', size: 52 },
            { top: '8%', right: '8%', rotate: '10deg', size: 60 },
            { bottom: '12%', right: '6%', rotate: '-8deg', size: 48 },
          ].map((item, i) => (
            <motion.div
              key={i}
              style={{ position: 'absolute', ...item }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div
                style={{
                  width: item.size,
                  height: item.size,
                  background: '#0077b5',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `rotate(${item.rotate})`,
                  boxShadow: '0 4px 16px rgba(0,119,181,0.3)',
                }}
              >
                <span style={{ color: '#fff', fontWeight: 900, fontSize: item.size * 0.4 }}>in</span>
              </div>
            </motion.div>
          ))}

          {/* Profile card */}
          <div
            style={{
              background: '#1e1e2e',
              borderRadius: '16px',
              padding: '0',
              width: '260px',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
            }}
          >
            {/* Blue header */}
            <div style={{ background: '#2563eb', height: '72px' }} />
            {/* Avatar */}
            <div style={{ padding: '0 20px 20px', marginTop: '-32px' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: '#d1d5db',
                  border: '3px solid #1e1e2e',
                  overflow: 'hidden',
                  marginBottom: '12px',
                }}
              >
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #9ca3af, #6b7280)' }} />
              </div>
              <div style={{ height: '10px', width: '60%', background: '#374151', borderRadius: '5px', marginBottom: '6px' }} />
              <div style={{ height: '8px', width: '80%', background: '#374151', borderRadius: '4px', marginBottom: '16px' }} />
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['primary', 'outline', 'ghost'].map((v) => (
                  <div
                    key={v}
                    style={{
                      height: '26px',
                      width: v === 'primary' ? '90px' : v === 'outline' ? '90px' : '60px',
                      background: v === 'primary' ? '#2563eb' : 'transparent',
                      border: v !== 'primary' ? '1px solid #4b5563' : 'none',
                      borderRadius: '9999px',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
