import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { BlitzFeaturesProps } from "./schema";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function BlitzFeatures({
  title = "Get unlimited B2B data",
  description = [
    "BlitzAPI transforms your GTM playbooks into automated, scalable workflows.",
    "Stop wasting credits on bad leads and outdated information. Integrate easily, pay only for results, and scale growth easily.",
  ],
  cta = {
    text: "Try it for free",
    href: "#signup",
  },
  featureCards = [
    {
      iconSrc: "/images/blitz/assets-images/framerusercontent.com_images_OVEMxKSDadrBYGTq6QtZsh8ceLQ.png",
      title: "API-first architecture",
    },
    {
      iconSrc: "/images/blitz/assets-images/framerusercontent.com_images_nBjEs1JX6H9at4KGO5uV0QHkIk.png",
      title: "Pay only for verified results",
    },
    {
      iconSrc: "/images/blitz/assets-images/framerusercontent.com_images_3KADvT0rewQNzigoYkisNRMzKI.png",
      title: "Built for Scalability & Reliability",
    },
    {
      iconSrc: "/images/blitz/assets-images/framerusercontent.com_images_RcumPqDYqoxUKGkIixltAdiGw.png",
      title: "Unlimited Growth Use-Cases",
    },
  ],
  visualImageSrc = "/images/blitz/assets-images/framerusercontent.com_images_wzWjxJPT1eMj66hrydpZX2uk.png",
  highlightWord,
}: BlitzFeaturesProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const renderTitle = (text: string) => {
    if (!highlightWord) return text;
    return text.split(new RegExp(`(${highlightWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g')).map((part, i) => {
      if (part === highlightWord) return <span key={i} style={{ color: "#2563eb" }}>{part}</span>;
      return part;
    });
  };

  return (
    <section
      ref={ref}
      style={{
        background: "#f9fafb",
        padding: "96px 0",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="features-grid"
      >
        {/* Left: text */}
        <div>
          <motion.h2
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#111827",
              marginBottom: "24px",
            }}
          >
            {renderTitle(title)}
          </motion.h2>

          {description.map((text, i) => (
            <motion.p
              key={i}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.7, marginBottom: i === description.length - 1 ? "36px" : "12px" }}
            >
              {text}
            </motion.p>
          ))}

          <motion.a
            custom={description.length + 1}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            href={cta.href}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#2563eb",
              color: "#fff",
              padding: "12px 24px",
              borderRadius: "9999px",
              fontSize: "14px",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            {cta.text} <span style={{ marginLeft: "4px" }}>›</span>
          </motion.a>

          {/* Feature cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
              marginTop: "48px",
            }}
          >
            {featureCards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i + description.length + 2}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "14px",
                  padding: "20px",
                  textAlign: "left"
                }}
              >
                <div style={{ width: "36px", height: "36px", marginBottom: "10px" }}>
                  <img
                    src={card.iconSrc}
                    alt={card.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#111827", lineHeight: 1.4 }}>
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
          animate={inView ? "visible" : "hidden"}
          style={{
            background: "#eff6ff",
            borderRadius: "24px",
            padding: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "380px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Grid lines */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3 }}
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

          {/* Blitz logo mark */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <img
              src={visualImageSrc}
              alt="Blitz Visual"
              style={{ width: "200px", height: "auto", objectFit: "contain" }}
            />
          </div>
        </motion.div>
      </div>
      <style>{`
        @media (max-width: 991px) {
          .features-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
