'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

// Real icons extracted from blitz-api.ai
const featureCards = [
  {
    iconSrc: '/assets-images/framerusercontent.com_images_OVEMxKSDadrBYGTq6QtZsh8ceLQ.png',
    title: 'API-first architecture',
  },
  {
    iconSrc: '/assets-images/framerusercontent.com_images_nBjEs1JX6H9at4KGO5uV0QHkIk.png',
    title: 'Pay only for verified results',
  },
  {
    iconSrc: '/assets-images/framerusercontent.com_images_3KADvT0rewQNzigoYkisNRMzKI.png',
    title: 'Built for Scalability & Reliability',
  },
  {
    iconSrc: '/assets-images/framerusercontent.com_images_RcumPqDYqoxUKGkIixltAdiGw.png',
    title: 'Unlimited Growth Use-Cases',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      ref={ref}
      style={{
        background: '#f9fafb',
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
        {/* Left: text */}
        <div>
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#111827',
              marginBottom: '24px',
            }}
          >
            Get <span style={{ color: '#2563eb' }}>unlimited</span> B2B data
          </motion.h2>

          <motion.p
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7, marginBottom: '12px' }}
          >
            BlitzAPI transforms your GTM playbooks into automated, scalable workflows.
          </motion.p>
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            style={{ fontSize: '15px', color: '#6b7280', lineHeight: 1.7, marginBottom: '36px' }}
          >
            Stop wasting credits on bad leads and outdated information.
            Integrate easily, pay only for results, and scale growth easily.
          </motion.p>

          <motion.a
            custom={3}
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
            Try it for free ›
          </motion.a>

          {/* Feature cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginTop: '48px',
            }}
          >
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i + 4}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                style={{
                  background: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '14px',
                  padding: '20px',
                }}
              >
                <div style={{ width: '36px', height: '36px', marginBottom: '10px' }}>
                  <Image
                    src={card.iconSrc}
                    alt={card.title}
                    width={36}
                    height={36}
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: '#111827', lineHeight: 1.4 }}>
                  {card.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: visual */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          style={{
            background: '#eff6ff',
            borderRadius: '24px',
            padding: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '380px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Grid lines */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.3 }}
            viewBox="0 0 400 380"
            preserveAspectRatio="xMidYMid slice"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 44} y1="0" x2={i * 44} y2="380" stroke="#2563eb" strokeWidth="1" />
            ))}
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 44} x2="400" y2={i * 44} stroke="#2563eb" strokeWidth="1" />
            ))}
          </svg>

          {/* Blitz logo mark — extracted real asset */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Image
              src="/assets-images/framerusercontent.com_images_wzWjxJPT1eMj66hrydpZX2uk.png"
              alt="Blitz"
              width={200}
              height={200}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
