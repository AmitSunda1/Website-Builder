import React from "react";
import { Container } from "@website-builder/ui";
import type { HeroProps } from "./schema";

const backgroundStyles: Record<string, React.CSSProperties> = {
  gradient: {
    background: "linear-gradient(135deg, var(--color-primary, #1a1a2e) 0%, var(--color-secondary, #16213e) 100%)",
  },
  solid: {
    backgroundColor: "var(--color-primary, #1a1a2e)",
  },
  image: {},
};

export function Hero({
  headline,
  description,
  primaryCTAText,
  primaryCTAHref,
  secondaryCTAText,
  secondaryCTAHref,
  backgroundStyle = "gradient",
  backgroundImageUrl,
  imageUrl,
  align = "center",
}: HeroProps) {
  const bgStyle: React.CSSProperties =
    backgroundStyle === "image" && backgroundImageUrl
      ? {
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      : (backgroundStyles[backgroundStyle] ?? backgroundStyles["gradient"]!);

  const sectionStyle: React.CSSProperties = {
    ...bgStyle,
    padding: "96px 0",
    fontFamily: "var(--font-family, Inter, sans-serif)",
    position: "relative",
    overflow: "hidden",
  };

  const contentStyle: React.CSSProperties = {
    textAlign: align,
    color: "#ffffff",
    display: "flex",
    flexDirection: "column",
    alignItems: align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center",
    gap: "24px",
  };

  const headlineStyle: React.CSSProperties = {
    fontSize: "clamp(2rem, 5vw, 3.5rem)",
    fontWeight: 800,
    lineHeight: "1.15",
    margin: 0,
    letterSpacing: "-0.02em",
  };

  const descStyle: React.CSSProperties = {
    fontSize: "clamp(1rem, 2vw, 1.25rem)",
    opacity: 0.85,
    maxWidth: "560px",
    margin: 0,
    lineHeight: "1.6",
  };

  const ctaGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
    justifyContent: align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center",
  };

  const primaryBtnStyle: React.CSSProperties = {
    padding: "14px 32px",
    backgroundColor: "#ffffff",
    color: "var(--color-primary, #1a1a2e)",
    borderRadius: "var(--radius-full, 9999px)",
    fontWeight: 700,
    fontSize: "1rem",
    textDecoration: "none",
    border: "none",
    cursor: "pointer",
    transition: "opacity 0.15s ease",
  };

  const secondaryBtnStyle: React.CSSProperties = {
    padding: "14px 32px",
    backgroundColor: "transparent",
    color: "#ffffff",
    borderRadius: "var(--radius-full, 9999px)",
    fontWeight: 700,
    fontSize: "1rem",
    textDecoration: "none",
    border: "2px solid rgba(255,255,255,0.6)",
    cursor: "pointer",
    transition: "opacity 0.15s ease",
  };

  return (
    <section style={sectionStyle}>
      <Container maxWidth="xl" padding="md">
        <div style={contentStyle}>
          <h1 style={headlineStyle}>{headline}</h1>
          {description && <p style={descStyle}>{description}</p>}
          {(primaryCTAText ?? secondaryCTAText) && (
            <div style={ctaGroupStyle}>
              {primaryCTAText && (
                <a href={primaryCTAHref ?? "#"} style={primaryBtnStyle}>
                  {primaryCTAText}
                </a>
              )}
              {secondaryCTAText && (
                <a href={secondaryCTAHref ?? "#"} style={secondaryBtnStyle}>
                  {secondaryCTAText}
                </a>
              )}
            </div>
          )}
          {imageUrl && (
            <div style={{ marginTop: "32px", width: "100%", display: "flex", justifyContent: "center" }}>
              <img src={imageUrl} alt={headline} style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain", borderRadius: "12px", boxShadow: "var(--shadow-xl)" }} />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
