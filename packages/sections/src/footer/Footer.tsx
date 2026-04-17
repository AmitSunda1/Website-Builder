import React from "react";
import { Container } from "@website-builder/ui";
import type { FooterProps } from "./schema";

const socialIcons: Record<string, string> = {
  twitter: "𝕏",
  github: "⌥",
  linkedin: "in",
  instagram: "◈",
  facebook: "f",
  youtube: "▶",
};

export function Footer({
  brandName,
  logoUrl,
  tagline,
  columns = [],
  copyrightText,
  showYear = true,
  socialLinks = [],
  variant = "dark",
}: FooterProps) {
  const isDark = variant === "dark";
  const year = new Date().getFullYear();

  const sectionStyle: React.CSSProperties = {
    backgroundColor: isDark ? "var(--color-primary, #1a1a2e)" : "var(--color-background, #fff)",
    color: isDark ? "#ffffff" : "var(--color-text, #0f172a)",
    padding: "64px 0 32px",
    fontFamily: "var(--font-family, Inter, sans-serif)",
    borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "var(--color-border, #e2e8f0)"}`,
  };

  const topRowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: columns.length > 0 ? `1fr repeat(${columns.length}, auto)` : "1fr",
    gap: "48px",
    marginBottom: "48px",
  };

  const brandStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const brandNameStyle: React.CSSProperties = {
    fontSize: "1.25rem",
    fontWeight: 800,
    margin: 0,
    color: isDark ? "#ffffff" : "var(--color-text, #0f172a)",
  };

  const taglineStyle: React.CSSProperties = {
    fontSize: "0.875rem",
    opacity: 0.65,
    margin: 0,
    maxWidth: "240px",
    lineHeight: "1.6",
  };

  const colTitleStyle: React.CSSProperties = {
    fontSize: "0.8125rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    opacity: 0.6,
    margin: "0 0 16px 0",
  };

  const linkStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.9375rem",
    color: isDark ? "rgba(255,255,255,0.8)" : "var(--color-text, #0f172a)",
    textDecoration: "none",
    marginBottom: "8px",
    transition: "opacity 0.15s ease",
    opacity: 0.8,
  };

  const bottomRowStyle: React.CSSProperties = {
    borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "var(--color-border, #e2e8f0)"}`,
    paddingTop: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
  };

  const copyrightStyle: React.CSSProperties = {
    fontSize: "0.8125rem",
    opacity: 0.55,
    margin: 0,
  };

  const socialGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "12px",
  };

  const socialBtnStyle: React.CSSProperties = {
    width: "36px",
    height: "36px",
    borderRadius: "var(--radius-md, 8px)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.2)" : "var(--color-border, #e2e8f0)"}`,
    backgroundColor: "transparent",
    color: isDark ? "#ffffff" : "var(--color-text, #0f172a)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.875rem",
    fontWeight: 700,
    textDecoration: "none",
    cursor: "pointer",
    transition: "opacity 0.15s ease",
  };

  const copyright = copyrightText
    ? `${showYear ? `© ${year} ` : ""}${copyrightText}`
    : `© ${year} ${brandName}. All rights reserved.`;

  return (
    <footer style={sectionStyle}>
      <Container maxWidth="xl" padding="md">
        <div style={topRowStyle}>
          <div style={brandStyle}>
            {logoUrl && <img src={logoUrl} alt={brandName || "Logo"} style={{ height: "48px", objectFit: "contain", marginBottom: "8px", borderRadius: "4px", alignSelf: "flex-start" }} />}
            <p style={brandNameStyle}>{brandName}</p>
            {tagline && <p style={taglineStyle}>{tagline}</p>}
          </div>
          {columns.map((col, idx) => (
            <div key={idx}>
              <p style={colTitleStyle}>{col.title}</p>
              {col.links.map((link, li) => (
                <a key={li} href={link.href} style={linkStyle}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div style={bottomRowStyle}>
          <p style={copyrightStyle}>{copyright}</p>
          {socialLinks.length > 0 && (
            <div style={socialGroupStyle}>
              {socialLinks.map((s, idx) => (
                <a key={idx} href={s.href} style={socialBtnStyle} target="_blank" rel="noopener noreferrer">
                  {socialIcons[s.platform] ?? s.platform.charAt(0).toUpperCase()}
                </a>
              ))}
            </div>
          )}
        </div>
      </Container>
    </footer>
  );
}
