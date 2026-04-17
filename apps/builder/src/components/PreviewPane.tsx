import React, { useEffect, useRef } from "react";
import { useBuilderState } from "../BuilderContext";
import { generateCSSVariables, defaultTheme } from "@website-builder/theme";
import type { Theme } from "@website-builder/theme";

/**
 * Live preview of the page using an iframe to isolate styles.
 * Generates the page HTML string on every state change and writes it using srcdoc.
 */
export function PreviewPane() {
  const { sections, theme } = useBuilderState();
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Build a full-page CSS variables string from the current theme
  const themeCSS = generateCSSVariables({
    ...defaultTheme,
    colors: { ...defaultTheme.colors, ...(theme.colors as Partial<Theme["colors"]>) },
    typography: { ...defaultTheme.typography, ...(theme.typography as Partial<Theme["typography"]>) },
  } as Theme);

  // Build a simplified HTML preview (no React runtime needed — just shows mock structure)
  const previewHTML = buildPreviewHTML(sections, themeCSS, theme);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    iframe.srcdoc = previewHTML;
  }, [previewHTML]);

  if (sections.length === 0) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        gap: "16px",
        color: "#4a4a6a",
      }}>
        <div style={{ fontSize: "3rem" }}>🏗️</div>
        <div style={{ fontSize: "16px", fontWeight: 600, color: "#6b7280" }}>Your page preview will appear here</div>
        <div style={{ fontSize: "13px", color: "#4a4a6a" }}>Add sections from the left panel to get started</div>
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      title="Page Preview"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        backgroundColor: "#fff",
        borderRadius: "0",
      }}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}

// ─── HTML preview builder ─────────────────────────────────────────────────────

interface SectionInst {
  id: string;
  type: string;
  props: Record<string, unknown>;
}

function buildPreviewHTML(
  sections: SectionInst[],
  themeCSS: string,
  theme: { colors: Record<string, string | undefined> }
): string {
  const primary = theme.colors["primary"] ?? "#6366f1";
  const primaryFg = theme.colors["primaryFg"] ?? "#ffffff";
  const bg = theme.colors["background"] ?? "#ffffff";
  const surface = theme.colors["surface"] ?? "#f8fafc";
  const text = theme.colors["text"] ?? "#0f172a";

  const sectionsHTML = sections
    .map((s) => renderSectionPreview(s, { primary, primaryFg, bg, surface, text }))
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<style>
${themeCSS}
*, *::before, *::after { box-sizing: border-box; }
body {
  margin: 0;
  font-family: var(--font-family, 'Inter', sans-serif);
  background: ${bg};
  color: ${text};
  -webkit-font-smoothing: antialiased;
}
img { max-width: 100%; height: auto; }
a { color: inherit; }
</style>
</head>
<body>
${sectionsHTML}
</body>
</html>`;
}

const colors = { primary: "", primaryFg: "", bg: "", surface: "", text: "" };
type Colors = typeof colors;

function renderSectionPreview(section: SectionInst, c: Colors): string {
  const p = section.props;

  switch (section.type) {
    case "header-1": {
      const isDark = p["variant"] === "dark";
      const logoHtml = p["logoUrl"] ? `<img src="${esc(String(p["logoUrl"]))}" style="height:40px;object-fit:contain;border-radius:4px;" />` : "";
      return `<header style="background:${isDark ? c.primary : "#fff"};border-bottom:1px solid #e2e8f0;padding:16px 48px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:100;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
  <div style="display:flex;align-items:center;gap:12px;">
    ${logoHtml}
    <div>
      <div style="font-size:1.25rem;font-weight:800;color:${isDark ? "#fff" : c.text}">${esc(String(p["title"] ?? ""))}</div>
      ${p["subtitle"] ? `<div style="font-size:0.875rem;color:${isDark ? "rgba(255,255,255,0.7)" : "#64748b"}">${esc(String(p["subtitle"]))}</div>` : ""}
    </div>
  </div>
  ${p["showCTA"] && p["ctaText"] ? `<a href="${esc(String(p["ctaHref"] ?? "#"))}" style="padding:8px 20px;background:${isDark ? "rgba(255,255,255,0.15)" : c.primary};color:${isDark ? "#fff" : c.primaryFg};border-radius:9999px;font-size:0.875rem;font-weight:600;text-decoration:none;">${esc(String(p["ctaText"]))}</a>` : ""}
</header>`;
    }

    case "hero-1": {
      const bgStyle = p["backgroundStyle"] === "image" && p["backgroundImageUrl"]
        ? `background:url(${esc(String(p["backgroundImageUrl"]))}) center/cover`
        : `background:linear-gradient(135deg,${c.primary},${c.primary}99)`;
      const align = String(p["align"] ?? "center");
      return `<section style="${bgStyle};padding:96px 48px;text-align:${align};">
  <h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:800;color:#fff;margin:0 0 16px;line-height:1.15;">${esc(String(p["headline"] ?? ""))}</h1>
  ${p["description"] ? `<p style="font-size:1.125rem;color:rgba(255,255,255,0.85);max-width:560px;margin:0 auto 32px;line-height:1.6;${align === "left" ? "margin-left:0;" : ""}">${esc(String(p["description"]))}</p>` : ""}
  <div style="display:flex;gap:16px;justify-content:${align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center"};flex-wrap:wrap;">
    ${p["primaryCTAText"] ? `<a href="${esc(String(p["primaryCTAHref"] ?? "#"))}" style="padding:14px 32px;background:#fff;color:${c.primary};border-radius:9999px;font-weight:700;text-decoration:none;font-size:1rem;">${esc(String(p["primaryCTAText"]))}</a>` : ""}
    ${p["secondaryCTAText"] ? `<a href="${esc(String(p["secondaryCTAHref"] ?? "#"))}" style="padding:14px 32px;background:transparent;color:#fff;border:2px solid rgba(255,255,255,0.6);border-radius:9999px;font-weight:700;text-decoration:none;font-size:1rem;">${esc(String(p["secondaryCTAText"]))}</a>` : ""}
  </div>
  ${p["imageUrl"] ? `<div style="margin-top:32px;display:flex;justify-content:center;"><img src="${esc(String(p["imageUrl"]))}" style="max-height:400px;object-fit:contain;border-radius:12px;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);" /></div>` : ""}
</section>`;
    }

    case "features-1": {
      const features = Array.isArray(p["features"]) ? p["features"] as Array<{title:string;description:string;icon?:string}> : [];
      const cols = String(p["columns"] ?? "3");
      const isDark = p["variant"] === "dark";
      return `<section style="background:${isDark ? c.primary : c.surface};padding:80px 48px;">
  <h2 style="text-align:center;font-size:2rem;font-weight:800;color:${isDark ? "#fff" : c.text};margin:0 0 8px;">${esc(String(p["heading"] ?? ""))}</h2>
  ${p["subheading"] ? `<p style="text-align:center;color:${isDark ? "rgba(255,255,255,0.7)" : "#64748b"};margin:0 0 48px;font-size:1.125rem;">${esc(String(p["subheading"]))}</p>` : `<div style="margin-bottom:48px;"></div>`}
  <div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:24px;max-width:1000px;margin:0 auto;">
    ${features.map((f, i) => {
      const isUrl = f.icon && (f.icon.startsWith("http") || f.icon.startsWith("data:image"));
      const iconHtml = isUrl ? `<img src="${esc(f.icon!)}" style="height:40px;object-fit:contain;margin-bottom:8px;display:block;" />` : `<div style="font-size:1.5rem;margin-bottom:8px;">${f.icon ?? ["⚡","🔒","🎯","🚀","💡","🛡️","📊","🔧","🌟"][i % 9] ?? "✨"}</div>`;
      return `<div style="padding:28px;border-radius:12px;border:1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"};background:${isDark ? "rgba(255,255,255,0.05)" : "#fff"};">
      ${iconHtml}
      <h3 style="font-size:1rem;font-weight:700;color:${isDark ? "#fff" : c.text};margin:0 0 6px;">${esc(f.title)}</h3>
      <p style="font-size:0.875rem;color:${isDark ? "rgba(255,255,255,0.7)" : "#64748b"};margin:0;line-height:1.5;">${esc(f.description)}</p>
    </div>`
    }).join("")}
  </div>
</section>`;
    }

    case "testimonials-1": {
      const items = Array.isArray(p["testimonials"]) ? p["testimonials"] as Array<{quote:string;name:string;title?:string;company?:string;rating?:number;avatarUrl?:string;avatar?:string}> : [];
      const isDark = p["variant"] === "dark";
      const cols = Math.min(items.length, 3);
      return `<section style="background:${isDark ? c.primary : c.surface};padding:80px 48px;">
  <h2 style="text-align:center;font-size:2rem;font-weight:800;color:${isDark ? "#fff" : c.text};margin:0 0 48px;">${esc(String(p["heading"] ?? ""))}</h2>
  <div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:24px;max-width:1000px;margin:0 auto;">
    ${items.map((t) => {
      const avatarSrc = t.avatarUrl || t.avatar;
      const avatarHtml = avatarSrc 
        ? `<img src="${esc(avatarSrc)}" style="width:44px;height:44px;border-radius:50%;object-fit:cover;background:#e2e8f0;flex-shrink:0;" />`
        : `<div style="width:44px;height:44px;border-radius:50%;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-size:1.2rem;flex-shrink:0;color:#000;">${esc(t.name[0] ?? "U")}</div>`;
      
      return `<div style="padding:28px;border-radius:12px;border:1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"};background:${isDark ? "rgba(255,255,255,0.05)" : "#fff"};display:flex;flex-direction:column;gap:16px;">
      ${t.rating ? `<div style="color:#f59e0b;">${"★".repeat(t.rating)}${"☆".repeat(5 - t.rating)}</div>` : ""}
      <p style="font-size:0.9375rem;color:${isDark ? "rgba(255,255,255,0.85)" : c.text};font-style:italic;margin:0;line-height:1.6;flex-grow:1;">"${esc(t.quote)}"</p>
      <div style="display:flex;align-items:center;gap:12px;margin-top:auto;">
        ${avatarHtml}
        <div>
          <strong style="display:block;font-weight:700;color:${isDark ? "#fff" : c.text};font-size:0.875rem;margin:0 0 2px 0;">${esc(t.name)}</strong>
          ${t.title ?? t.company ? `<span style="font-size:0.8125rem;color:#64748b;margin:0;">${esc([t.title, t.company].filter(Boolean).join(" · "))}</span>` : ""}
        </div>
      </div>
    </div>`
    }).join("")}
  </div>
</section>`;
    }

    case "footer-1": {
      const isDark = p["variant"] !== "light";
      const year = new Date().getFullYear();
      return `<footer style="background:${isDark ? c.primary : "#fff"};color:${isDark ? "#fff" : c.text};padding:48px 48px 24px;border-top:1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"};">
  <div style="margin-bottom:32px;">
    ${p["logoUrl"] ? `<img src="${esc(String(p["logoUrl"]))}" style="height:48px;object-fit:contain;margin-bottom:8px;border-radius:4px;" />` : ""}
    <div style="font-size:1.25rem;font-weight:800;margin-bottom:6px;">${esc(String(p["brandName"] ?? ""))}</div>
    ${p["tagline"] ? `<div style="font-size:0.875rem;opacity:0.65;">${esc(String(p["tagline"]))}</div>` : ""}
  </div>
  <div style="border-top:1px solid ${isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0"};padding-top:20px;font-size:0.8125rem;opacity:0.55;">
    © ${year} ${esc(String(p["brandName"] ?? ""))}. All rights reserved.
  </div>
</footer>`;
    }

    default:
      return `<div style="padding:32px;text-align:center;background:#f1f5f9;color:#64748b;font-size:0.875rem;">Unknown section: ${esc(section.type)}</div>`;
  }
}

function esc(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
