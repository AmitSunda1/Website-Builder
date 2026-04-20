import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import type { BlitzFAQProps } from "./schema";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: "easeOut" as const },
  }),
};

export default function BlitzFAQ({
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about using BlitzAPI. Still have questions? Drop us a message — we'll get back to you quickly.",
  faqs = [
    {
      q: "What exactly is BlitzAPI?",
      a: "BlitzAPI is a collection of high-performance B2B data APIs designed specifically for Growth, Revenue, and Operations teams. From ICP targeting and contact enrichment to email validation, our APIs provide real-time, verified data at the lowest possible cost.",
    },
    {
      q: 'What does "at scraping cost" mean?',
      a: "We pass on the raw data acquisition cost directly to you without inflated licensing fees. You get the same quality data enterprise tools charge 10x for — at the actual cost of sourcing it.",
    },
    {
      q: "Do I need a developer or technical background to use BlitzAPI?",
      a: "While BlitzAPI is API-first, we offer no-code connectors for Clay, Make, Zapier, and n8n. You can get started without writing a single line of code.",
    },
    {
      q: "What specific use cases can BlitzAPI handle for Growth teams?",
      a: "From cold email enrichment and LinkedIn matching to ICP filtering, phone validation, and waterfall enrichment — BlitzAPI covers the full GTM data stack.",
    },
    {
      q: "How quickly can I get started with BlitzAPI?",
      a: "Sign up and get 1,000 free credits instantly. You can make your first API call within minutes of registration.",
    },
    {
      q: "What integrations and tools work best with BlitzAPI?",
      a: "Clay, Make, n8n, Zapier, HubSpot, Salesforce, and any tool that accepts webhook or REST API calls.",
    },
    {
      q: "Is BlitzAPI GDPR compliant?",
      a: "Yes. BlitzAPI only surfaces business contact data from public sources. All data handling aligns with GDPR and CCPA requirements.",
    },
    {
      q: "Can I request a specific feature or additional API?",
      a: "Absolutely. We actively build based on customer feedback. Reach out via our contact page and we'll prioritize based on demand.",
    },
  ],
}: BlitzFAQProps) {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        background: "linear-gradient(180deg, #fff 0%, #eef2ff 100%)",
        padding: "96px 0",
      }}
      id="faq"
    >
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          style={{ textAlign: "center", marginBottom: "56px" }}
        >
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              color: "#111827",
              marginBottom: "16px",
              textAlign: "center"
            }}
          >
            {title}
          </h2>
          <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.6 }}>
            {subtitle}
          </p>
        </motion.div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                overflow: "hidden",
                textAlign: "left"
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "20px 24px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: "15px", fontWeight: 600, color: "#111827", flex: 1 }}>
                  {faq.q}
                </span>
                <span
                  style={{
                    fontSize: "20px",
                    color: "#6b7280",
                    fontWeight: 300,
                    marginLeft: "16px",
                    flexShrink: 0,
                    transition: "transform 0.2s",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  {open === i ? "×" : "+"}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={{ padding: "0 24px 20px", borderTop: "1px solid #f3f4f6" }}>
                      <p style={{ paddingTop: "16px", fontSize: "14px", color: "#6b7280", lineHeight: 1.7 }}>
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
