import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { BlitzPricingPlansProps } from "./schema";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

export default function BlitzPricingPlans({
  title = "Cheaper, Better, Faster, Stronger",
  subtitle = "Access verified B2B data and enrichment tools at scraping cost. No hidden fees, no lock-in. Just clean, API-delivered results.",
  plans = [
    {
      name: "Unlimited Leads",
      price: "$399",
      period: "/month",
      desc: "For teams that need fresh company + people data, on repeat.",
      highlight: false,
      features: [
        "UNLIMITED Leads",
        "UNLIMITED Companies",
        "Access 380M+ contacts",
        "Access 60M+ companies",
        "5 requests per second",
      ],
      ctaText: "Get Started",
      ctaHref: "#signup",
    },
    {
      name: "Unlimited Email",
      price: "$499",
      period: "/month",
      desc: "For teams running cold email at scale — where deliverability matters.",
      highlight: true,
      badge: "Popular",
      features: [
        "Everything in Unlimited Leads",
        "UNLIMITED Email finder",
        "62M+ verified emails",
        "97% Email accuracy",
        "5 requests per second",
      ],
      ctaText: "Get Started",
      ctaHref: "#signup",
    },
    {
      name: "Unlimited Phone Numbers",
      price: "$599",
      period: "/month",
      desc: "For high-output teams running true multi-channel outreach.",
      highlight: false,
      features: [
        "Everything in Unlimited Email",
        "Unlimited Phone Numbers",
        "+40M Mobile Phone Numbers",
        "US Coverage only",
        "5 requests per second",
      ],
      ctaText: "Get Started",
      ctaHref: "#signup",
    },
  ],
  highlightWord,
  footerNote = "Join leading companies who trust our platform to power their business.",
  footerLogos = ["classpass", "DocuSign", "Webflow", "codecademy"],
}: BlitzPricingPlansProps) {
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
        background: "#0a0a0a",
        padding: "96px 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(37,99,235,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(124,58,237,0.04) 0%, transparent 60%)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          opacity: 0.5,
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", position: "relative" }}>
        {/* Header */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <h2
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              marginBottom: "16px",
              textAlign: "center"
            }}
          >
            {renderTitle(title)}
          </h2>
          <p style={{ fontSize: "16px", color: "#9ca3af", maxWidth: "520px", margin: "0 auto", lineHeight: 1.6 }}>
            {subtitle}
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "20px",
            marginBottom: "64px",
          }}
          className="pricing-plans-grid"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                background: plan.highlight ? "#161616" : "#111111",
                border: plan.highlight ? "1px solid #2d2d2d" : "1px solid #1f1f1f",
                borderRadius: "20px",
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "0",
                textAlign: "left"
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#fff" }}>{plan.name}</h3>
                {plan.badge && (
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#2563eb",
                      background: "rgba(37,99,235,0.1)",
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      border: "1px solid rgba(37,99,235,0.2)"
                    }}
                  >
                    {plan.badge}
                  </span>
                )}
              </div>

              {/* Price */}
              <div style={{ marginBottom: "12px" }}>
                <span style={{ fontSize: "42px", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em" }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: "16px", color: "#9ca3af" }}>{plan.period}</span>
              </div>

              <p style={{ fontSize: "13px", color: "#9ca3af", lineHeight: 1.6, marginBottom: "24px" }}>
                {plan.desc}
              </p>

              <hr style={{ border: "none", borderTop: "1px solid #222", marginBottom: "20px" }} />

              <p style={{ fontSize: "12px", color: "#6b7280", marginBottom: "12px", fontWeight: 500 }}>
                What's included
              </p>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", flex: 1, padding: 0 }}>
                {plan.features.map((feat) => (
                  <li key={feat} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        width: "18px",
                        height: "18px",
                        borderRadius: "50%",
                        background: plan.highlight ? "#2563eb" : "#1f2937",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontSize: "10px",
                        color: "#fff",
                      }}
                    >
                      ✓
                    </span>
                    <span style={{ fontSize: "13px", color: "#d1d5db" }}>{feat}</span>
                  </li>
                ))}
              </ul>

              <motion.a
                href={plan.ctaHref}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "28px",
                  padding: "12px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 600,
                  textDecoration: "none",
                  background: plan.highlight ? "#2563eb" : "#1f2937",
                  color: "#fff",
                  border: plan.highlight ? "none" : "1px solid #374151",
                }}
              >
                {plan.ctaText} <span style={{ marginLeft: "4px" }}>›</span>
              </motion.a>
            </motion.div>
          ))}
        </div>

        {/* Trusted footer */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ textAlign: "center" }}
        >
          <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
            {footerNote}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
              flexWrap: "wrap",
              opacity: 0.5,
            }}
          >
            {footerLogos.map((logo) => (
              <span key={logo} style={{ fontSize: "14px", fontWeight: 700, color: "#fff", letterSpacing: "0.02em" }}>
                {logo}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 991px) {
          .pricing-plans-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
        }
      `}</style>
    </section>
  );
}
