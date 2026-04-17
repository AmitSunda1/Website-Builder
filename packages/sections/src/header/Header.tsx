import React from "react";
import { Container } from "@website-builder/ui";
import type { HeaderProps } from "./schema";

export function Header({
  title,
  logoUrl,
  subtitle,
  showCTA,
  ctaText,
  ctaHref,
  variant = "light",
}: HeaderProps) {
  const isDark = variant === "dark";

  const navStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: isDark ? "var(--color-primary, #1a1a2e)" : "var(--color-background, #fff)",
    borderBottom: `1px solid var(--color-border, #e2e8f0)`,
    padding: "16px 0",
    fontFamily: "var(--font-family, Inter, sans-serif)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "var(--shadow-sm)",
  };

  const innerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "var(--font-size-xl, 1.25rem)",
    fontWeight: "var(--font-weight-bold, 700)" as React.CSSProperties["fontWeight"],
    color: isDark ? "var(--color-primary-fg, #fff)" : "var(--color-text, #0f172a)",
    margin: 0,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: "var(--font-size-sm, 0.875rem)",
    color: isDark ? "rgba(255,255,255,0.7)" : "var(--color-muted, #64748b)",
    margin: 0,
  };

  const ctaStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    padding: "8px 20px",
    backgroundColor: "var(--color-primary, #1a1a2e)",
    color: "var(--color-primary-fg, #fff)",
    borderRadius: "var(--radius-full, 9999px)",
    fontSize: "var(--font-size-sm, 0.875rem)",
    fontWeight: 600,
    textDecoration: "none",
    border: isDark ? "1px solid rgba(255,255,255,0.3)" : "none",
    cursor: "pointer",
    transition: "opacity 0.15s ease",
  };

  return (
    <header style={navStyle}>
      <Container maxWidth="xl" padding="md">
        <div style={innerStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {logoUrl && <img src={logoUrl} alt={title || "Logo"} style={{ height: "40px", objectFit: "contain", borderRadius: "4px" }} />}
            <div>
              <p style={titleStyle}>{title}</p>
              {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
            </div>
          </div>
          {showCTA && ctaText && (
            <a href={ctaHref ?? "#"} style={ctaStyle}>
              {ctaText}
            </a>
          )}
        </div>
      </Container>
    </header>
  );
}
