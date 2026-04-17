import React from "react";
import { Container } from "@website-builder/ui";
import type { TestimonialsProps, TestimonialItem } from "./schema";

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

function StarRating({ rating }: { rating: number }) {
  const filled = "★";
  const empty = "☆";
  return (
    <span style={{ color: "#f59e0b", fontSize: "1rem", letterSpacing: "1px" }}>
      {Array.from({ length: 5 }, (_, i) => (i < rating ? filled : empty)).join("")}
    </span>
  );
}

function TestimonialCard({
  item,
  textColor,
  borderColor,
  bgColor,
}: {
  item: TestimonialItem;
  textColor: string;
  borderColor: string;
  bgColor: string;
}) {
  const cardStyle: React.CSSProperties = {
    padding: "32px",
    borderRadius: "var(--radius-lg, 12px)",
    border: `1px solid ${borderColor}`,
    backgroundColor: bgColor,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const quoteStyle: React.CSSProperties = {
    fontSize: "1rem",
    color: textColor,
    lineHeight: "1.7",
    margin: 0,
    fontStyle: "italic",
  };

  const footerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "auto",
  };

  const avatarStyle: React.CSSProperties = {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    objectFit: "cover",
    backgroundColor: "var(--color-border, #e2e8f0)",
    flexShrink: 0,
  };

  const nameStyle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: "0.9375rem",
    color: textColor,
    margin: "0 0 2px 0",
  };

  const roleStyle: React.CSSProperties = {
    fontSize: "0.8125rem",
    color: textColor,
    opacity: 0.65,
    margin: 0,
  };

  return (
    <div style={cardStyle}>
      {item.rating && <StarRating rating={item.rating} />}
      <p style={quoteStyle}>"{item.quote}"</p>
      <div style={footerStyle}>
        {(item.avatarUrl || item.avatar) ? (
          <img src={item.avatarUrl || item.avatar} alt={item.name} style={avatarStyle} />
        ) : (
          <div style={{ ...avatarStyle, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>
            {item.name[0]}
          </div>
        )}
        <div>
          <p style={nameStyle}>{item.name}</p>
          {(item.title ?? item.company) && (
            <p style={roleStyle}>
              {[item.title, item.company].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function Testimonials({
  heading,
  subheading,
  testimonials,
  variant = "accent",
}: TestimonialsProps) {
  const textColor: string = variantText[variant] ?? variantText["accent"] ?? "#0f172a";
  const borderColor = variant === "dark" ? "rgba(255,255,255,0.1)" : "var(--color-border, #e2e8f0)";
  const cardBg = variant === "dark" ? "rgba(255,255,255,0.05)" : "var(--color-background, #fff)";

  const sectionStyle: React.CSSProperties = {
    backgroundColor: variantBg[variant] ?? variantBg.accent,
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
  };

  const cols = testimonials.length <= 2 ? testimonials.length : 3;
  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gap: "24px",
  };

  return (
    <section style={sectionStyle}>
      <Container maxWidth="xl" padding="md">
        <div style={headerStyle}>
          <h2 style={headingStyle}>{heading}</h2>
          {subheading && <p style={subheadingStyle}>{subheading}</p>}
        </div>
        <div style={gridStyle}>
          {testimonials.map((item, idx) => (
            <TestimonialCard
              key={idx}
              item={item}
              textColor={textColor}
              borderColor={borderColor}
              bgColor={cardBg}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
