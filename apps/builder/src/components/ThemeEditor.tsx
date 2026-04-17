import React from "react";
import { useBuilderState, useBuilderDispatch } from "../BuilderContext";

export function ThemeEditor() {
  const { theme } = useBuilderState();
  const dispatch = useBuilderDispatch();

  const updateColor = (key: keyof typeof theme.colors, value: string) => {
    dispatch({ type: "UPDATE_THEME_COLORS", colors: { [key]: value } });
  };

  const colorFields: Array<{ key: keyof typeof theme.colors; label: string; desc: string }> = [
    { key: "primary", label: "Primary", desc: "Buttons, links, accents" },
    { key: "primaryFg", label: "Primary Text", desc: "Text on primary color" },
    { key: "secondary", label: "Secondary", desc: "Secondary elements" },
    { key: "background", label: "Background", desc: "Page background" },
    { key: "surface", label: "Surface", desc: "Cards and panels" },
    { key: "text", label: "Text", desc: "Body text color" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h3 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280", margin: "0 0 8px 0" }}>
          Theme Colors
        </h3>
        <p style={{ fontSize: "12px", color: "#6b7280", lineHeight: "1.5" }}>
          Colors apply as CSS variables across all sections.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {colorFields.map(({ key, label, desc }) => (
          <div key={key} style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
            padding: "10px 12px",
            backgroundColor: "#1a1a24",
            borderRadius: "8px",
            border: "1px solid #2a2a3a",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                backgroundColor: theme.colors[key] ?? "#6366f1",
                border: "1px solid #3a3a5a",
                flexShrink: 0,
              }} />
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#e2e2f0" }}>{label}</div>
                <div style={{ fontSize: "11px", color: "#6b7280" }}>{desc}</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <input
                id={`theme-color-${key}`}
                type="color"
                value={theme.colors[key] ?? "#6366f1"}
                onChange={(e) => updateColor(key, e.target.value)}
                style={{
                  width: "32px",
                  height: "32px",
                  border: "none",
                  padding: "0",
                  borderRadius: "4px",
                  cursor: "pointer",
                  backgroundColor: "transparent",
                }}
              />
              <input
                type="text"
                value={theme.colors[key] ?? ""}
                onChange={(e) => {
                  if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value)) updateColor(key, e.target.value);
                }}
                style={{
                  width: "72px",
                  fontSize: "11px",
                  padding: "4px 8px",
                  backgroundColor: "#0f0f13",
                  border: "1px solid #2a2a3a",
                  borderRadius: "4px",
                  color: "#e2e2f0",
                  fontFamily: "monospace",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Typography */}
      <div>
        <h3 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280", margin: "0 0 10px 0" }}>
          Typography
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label htmlFor="theme-font" style={{ fontSize: "11px", fontWeight: 600, color: "#a0a0b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Font Family
          </label>
          <input
            id="theme-font"
            type="text"
            value={theme.typography?.fontFamily ?? ""}
            onChange={(e) => dispatch({ type: "UPDATE_THEME", overrides: { typography: { fontFamily: e.target.value } } })}
            placeholder="'Inter', sans-serif"
            style={{
              backgroundColor: "#1a1a24",
              border: "1px solid #2a2a3a",
              borderRadius: "6px",
              color: "#e2e2f0",
              fontSize: "12px",
              padding: "8px 10px",
              outline: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}
