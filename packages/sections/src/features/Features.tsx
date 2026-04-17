import React from "react";
import { Container } from "@website-builder/ui";
import type { FeaturesProps } from "./schema";

const variantBg: Record<string, string> = {
  light: "var(--color-background, #fff)",
  dark: "var(--color-primary, #1a1a2e)",
  accent: "var(--color-surface, #f8fafc)",
};

const variantText: Record<string, string> = {
  light: "var(--color-text, #0f172a)",
  dark: "#ffffff",
  accent: "var(--color-text, #0f172a)",
};

const defaultIcons = ["⚡", "🔒", "🎯", "🚀", "💡", "🛡️", "📊", "🔧", "🌟"];

export function Features({
  heading,
  subheading,
  features,
  columns = "3",
  variant = "light",
}: FeaturesProps) {
  const textColor = variantText[variant] ?? variantText.light;

  const sectionStyle: React.CSSProperties = {
    backgroundColor: variantBg[variant] ?? variantBg.light,
    padding: "80px 0",
    fontFamily: "var(--font-family, Inter, sans-serif)",
  };

  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    marginBottom: "56px",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
    fontWeight: 800,
    color: textColor,
    margin: "0 0 12px 0",
    letterSpacing: "-0.01em",
  };

  const subheadingStyle: React.CSSProperties = {
    fontSize: "1.125rem",
    color: variant === "dark" ? "rgba(255,255,255,0.7)" : "var(--color-muted, #64748b)",
    margin: 0,
    maxWidth: "560px",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: "32px",
  };

  const cardStyle: React.CSSProperties = {
    padding: "32px",
    borderRadius: "var(--radius-lg, 12px)",
    border: `1px solid ${variant === "dark" ? "rgba(255,255,255,0.1)" : "var(--color-border, #e2e8f0)"}`,
    backgroundColor: variant === "dark" ? "rgba(255,255,255,0.05)" : "var(--color-surface, #f8fafc)",
    transition: "box-shadow 0.2s ease",
  };

  const iconStyle: React.CSSProperties = {
    fontSize: "2rem",
    marginBottom: "12px",
    display: "block",
  };

  const cardTitleStyle: React.CSSProperties = {
    fontSize: "1.125rem",
    fontWeight: 700,
    color: textColor,
    margin: "0 0 8px 0",
  };

  const cardDescStyle: React.CSSProperties = {
    fontSize: "0.9375rem",
    color: variant === "dark" ? "rgba(255,255,255,0.7)" : "var(--color-muted, #64748b)",
    margin: 0,
    lineHeight: "1.6",
  };

  return (
    <section style={sectionStyle}>
      <Container maxWidth="xl" padding="md">
        <div style={headerStyle}>
          <h2 style={headingStyle}>{heading}</h2>
          {subheading && <p style={subheadingStyle}>{subheading}</p>}
        </div>
        <div style={gridStyle}>
          {features.map((feature, idx) => {
            const isUrl = feature.icon && (feature.icon.startsWith("http") || feature.icon.startsWith("data:image"));
            return (
              <div key={idx} style={cardStyle}>
                <span style={iconStyle}>
                  {isUrl ? (
                    <img src={feature.icon} alt={feature.title} style={{ height: "40px", objectFit: "contain" }} />
                  ) : (
                    feature.icon ?? defaultIcons[idx % defaultIcons.length]
                  )}
                </span>
                <h3 style={cardTitleStyle}>{feature.title}</h3>
                <p style={cardDescStyle}>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
