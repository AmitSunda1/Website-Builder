import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { BlitzHeaderProps } from "./schema";

export default function BlitzHeader({
  logoUrl,
  logoText = "BlitzAPI",
  navLinks = [
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#integrations" },
    { label: "Reviews", href: "#reviews" },
    { label: "FAQs", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  ctaText = "Get 1,000 credits free",
  ctaHref = "#signup",
  loginText = "Login",
  loginHref = "#login",
}: BlitzHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.95)" : "#ffffff",
        backdropFilter: "blur(10px)",
        borderBottom: scrolled ? "1px solid #e5e7eb" : "1px solid #f3f4f6",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 32px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "32px",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, textDecoration: "none" }}>
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={logoText || "Brand"}
              style={{ height: "30px", width: "auto", objectFit: "contain" }}
            />
          ) : (
            <span style={{ fontSize: "20px", fontWeight: 800, color: "#111827" }}>{logoText || "Brand"}</span>
          )}
        </a>

        {/* Desktop Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            flex: 1,
          }}
          className="nav-links-desktop"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontSize: "14px",
                fontWeight: 500,
                color: "#374151",
                transition: "color 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#111827")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#374151")}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right actions */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}
          className="nav-actions-desktop"
        >
          <a
            href={loginHref}
            style={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#374151",
              padding: "8px 16px",
              textDecoration: "none",
            }}
          >
            {loginText}
          </a>
          <motion.a
            href={ctaHref}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              background: "#111827",
              color: "#ffffff",
              fontSize: "14px",
              fontWeight: 500,
              padding: "9px 22px",
              borderRadius: "9999px",
              textDecoration: "none",
            }}
          >
            {ctaText} <span style={{ marginLeft: "4px" }}>›</span>
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: "none", padding: "4px", background: "none", border: "none" }}
          className="nav-hamburger"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: "#fff",
              borderTop: "1px solid #e5e7eb",
              padding: "16px 24px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              overflow: "hidden"
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{ fontSize: "15px", fontWeight: 500, color: "#111827", textDecoration: "none" }}
              >
                {link.label}
              </a>
            ))}
            <hr style={{ border: "none", borderTop: "1px solid #e5e7eb" }} />
            <a href={loginHref} style={{ fontSize: "15px", color: "#374151", textDecoration: "none" }}>{loginText}</a>
            <a
              href={ctaHref}
              style={{
                background: "#111827",
                color: "#fff",
                padding: "12px 24px",
                borderRadius: "9999px",
                fontSize: "14px",
                fontWeight: 500,
                textAlign: "center",
                textDecoration: "none",
              }}
            >
              {ctaText} →
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-actions-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}
