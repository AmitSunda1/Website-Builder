import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { BlitzCTAProps } from "./schema";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function BlitzCTA({
  title = "Enterprise-grade targeting & enrichment at a scraping cost",
  subtitle = "Join thousands of GTM teams using BlitzAPI to power smarter outreach, faster.",
  cta = {
    text: "Get 1,000 credits free",
    href: "#signup",
  },
  benefits = [
    { icon: "⚡", label: "Blitz-fast APIs" },
    { icon: "🔒", label: "GDPR Compliant" },
    { icon: "💳", label: "No credit card" },
  ],
}: BlitzCTAProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
        padding: "96px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative" }}>
        <motion.h2
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: "20px",
            textAlign: "center"
          }}
        >
          {title}
        </motion.h2>

        <motion.p
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", marginBottom: "40px", lineHeight: 1.6 }}
        >
          {subtitle}
        </motion.p>

        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}
        >
          <motion.a
            href={cta.href}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#fff",
              color: "#1d4ed8",
              padding: "13px 28px",
              borderRadius: "9999px",
              fontSize: "15px",
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            }}
          >
            {cta.text} <span style={{ marginLeft: "4px" }}>›</span>
          </motion.a>
        </motion.div>

        {/* Social proof icons */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            marginTop: "40px",
            flexWrap: "wrap",
          }}
        >
          {benefits.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.85)",
                fontWeight: 500,
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
