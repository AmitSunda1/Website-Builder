import React from "react";
import { motion } from "framer-motion";
import type { BlitzHeroProps } from "./schema";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function BlitzHero({
  eyebrowBadge = {
    label: "UNLIMITED DATA",
    text: "Start for free",
    emoji: "🐦",
    href: "#signup",
  },
  title = "The ⚡ API engine for every 🐦 GTM playbook",
  subtitle = "Our platform gives your growth team instant access to clean B2B data via powerful APIs: people search, email & phone enrichment, LinkedIn matching, and more.",
  primaryCta = {
    text: "Get 1,000 credits free",
    href: "#signup",
  },
  secondaryCta = {
    text: "Book a free demo",
    href: "#demo",
  },
  bottomText = "No credit card · Just clean, validated data",
  highlightWord,
  mockup = {
    mainLabel: "No outdated data",
    mainHighlight: "outdated",
    cardLabels: ["People Search", "Email Validation", "Company Enrich"],
    gridLabels: ["Contact record", "Enriched profile", "Validated email", "Company data"]
  }
}: BlitzHeroProps) {
  // Parse title for dynamic highlighting and icons
  const renderTitle = (text: string) => {
    const tokens = highlightWord 
      ? text.split(new RegExp(`(${highlightWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}|⚡|🐦)`, 'g'))
      : text.split(/(⚡|🐦)/g);

    return tokens.map((part, i) => {
      if (highlightWord && part === highlightWord) return <span key={i} style={{ color: "#2563eb" }}>{part}</span>;
      if (part === "⚡") return <span key={i} style={{ fontSize: "0.85em" }}>⚡</span>;
      if (part === "🐦") return <span key={i} style={{ fontSize: "0.85em" }}>🐦</span>;
      return part;
    });
  };

  return (
    <section
      style={{
        background: "linear-gradient(180deg, #eef2ff 0%, #f8faff 60%, #ffffff 100%)",
        paddingTop: "140px",
        paddingBottom: "80px",
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
        {/* Eyebrow badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ display: "flex", justifyContent: "center", marginBottom: "28px" }}
        >
          <a
            href={eyebrowBadge.href}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              border: "1px solid #d1d5db",
              borderRadius: "9999px",
              padding: "6px 14px",
              fontSize: "13px",
              color: "#374151",
              background: "#fff",
              textDecoration: "none",
              transition: "border-color 0.2s",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.05em",
                border: "1px solid #e5e7eb",
                borderRadius: "9999px",
                padding: "2px 9px",
                background: "#f9fafb",
              }}
            >
              {eyebrowBadge.label}
            </span>
            <span style={{ fontWeight: 500 }}>{eyebrowBadge.text}</span>
            <span style={{ fontSize: "16px" }}>{eyebrowBadge.emoji}</span>
            <span style={{ color: "#6b7280" }}>›</span>
          </a>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "clamp(44px, 7vw, 84px)",
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: "-0.03em",
            color: "#111827",
            marginBottom: "24px",
            maxWidth: "900px",
            margin: "0 auto 24px",
          }}
        >
          {renderTitle(title)}
        </motion.h1>

        {/* Subtext */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: "17px",
            color: "#6b7280",
            maxWidth: "520px",
            margin: "0 auto 40px",
            lineHeight: 1.65,
          }}
        >
          {subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "16px",
          }}
        >
          <motion.a
            href={primaryCta.href}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#111827",
              color: "#fff",
              padding: "13px 28px",
              borderRadius: "9999px",
              fontSize: "15px",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            {primaryCta.text} <span style={{ marginLeft: "4px" }}>›</span>
          </motion.a>
          <motion.a
            href={secondaryCta.href}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "transparent",
              color: "#111827",
              padding: "13px 28px",
              borderRadius: "9999px",
              fontSize: "15px",
              fontWeight: 500,
              textDecoration: "none",
              border: "1.5px solid #d1d5db",
            }}
          >
            {secondaryCta.text} <span style={{ marginLeft: "4px" }}>›</span>
          </motion.a>
        </motion.div>

        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{ fontSize: "13px", color: "#2563eb", marginBottom: "60px" }}
        >
          {bottomText}
        </motion.p>

        {/* Product preview mockup */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          style={{
            position: "relative",
            maxWidth: "760px",
            margin: "0 auto",
            background: "#fff",
            borderRadius: "20px",
            border: "1px solid #e5e7eb",
            boxShadow: "0 8px 48px rgba(37,99,235,0.08), 0 2px 8px rgba(0,0,0,0.06)",
            padding: "40px 32px 32px",
            overflow: "hidden",
          }}
        >
          {/* Mock dashboard cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${mockup.cardLabels?.length || 3}, 1fr)`,
              gap: "12px",
              marginBottom: "24px",
            }}
          >
            {mockup.cardLabels?.map((label, i) => {
              const colors = ["#eff6ff", "#f0fdf4", "#faf5ff", "#fff7ed", "#fdf2f8"];
              return (
                <div
                  key={`${label}-${i}`}
                  style={{
                    background: colors[i % colors.length],
                    borderRadius: "12px",
                    padding: "16px",
                    minHeight: "90px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    textAlign: "left"
                  }}
                >
                  {i === 0 && (
                    <svg viewBox="0 0 80 40" style={{ width: "100%", marginBottom: "8px" }}>
                      <polyline
                        points="0,35 15,28 30,20 45,22 60,12 75,5"
                        fill="none"
                        stroke="#2563eb"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                  <span style={{ fontSize: "11px", color: "#6b7280", fontWeight: 500 }}>{label}</span>
                </div>
              );
            })}
          </div>

          {/* "No outdated data" label */}
          <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
            <span style={{ fontSize: "22px", fontWeight: 700, color: "#111827" }}>
              {mockup.mainLabel?.split(new RegExp(`(${mockup.mainHighlight})`, 'g')).map((part, i) => (
                part === mockup.mainHighlight ? <span key={i} style={{ color: "#2563eb" }}>{part}</span> : part
              )) || mockup.mainLabel}
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px", marginTop: "16px" }}>
            {mockup.gridLabels?.map((item, i) => (
              <div
                key={`${item}-${i}`}
                style={{
                  background: "#f9fafb",
                  borderRadius: "10px",
                  padding: "14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  textAlign: "left"
                }}
              >
                <div style={{ height: "8px", width: "60%", background: "#e5e7eb", borderRadius: "4px" }} />
                <div style={{ height: "8px", width: "80%", background: "#e5e7eb", borderRadius: "4px" }} />
                <div style={{ height: "8px", width: "40%", background: "#2563eb", borderRadius: "4px" }} />
                <span style={{ fontSize: "10px", color: "#9ca3af", marginTop: "4px" }}>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
