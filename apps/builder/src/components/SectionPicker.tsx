import React from "react";
import { listComponents } from "@website-builder/registry";
import { useBuilderDispatch, useBuilderState } from "../BuilderContext";
import type { StylePreset } from "../types";

const categories = {
  layout: { label: "Layout", color: "#6366f1", icon: "◧" },
  content: { label: "Content", color: "#06b6d4", icon: "⊞" },
  social: { label: "Social Proof", color: "#10b981", icon: "★" },
  conversion: { label: "Conversion", color: "#f59e0b", icon: "⚡" },
  support: { label: "Support", color: "#ec4899", icon: "?" },
};

const familyLabel: Record<string, string> = {
  header: "Header",
  hero: "Hero",
  features: "Features",
  testimonials: "Testimonials",
  footer: "Footer",
  about: "About",
  faq: "FAQ",
  contact: "Contact",
};

const presets: Array<{ label: string; value: StylePreset }> = [
  { label: "All styles", value: "all" },
  { label: "Core", value: "core" },
  { label: "AuthantiMate", value: "authantimate" },
  { label: "Blitz Clone", value: "blitz-clone" },
  { label: "Web Cohort", value: "web-cohort" },
];

export function SectionPicker() {
  const dispatch = useBuilderDispatch();
  const { stylePreset } = useBuilderState();

  const entries = listComponents().filter(
    ([, entry]) => stylePreset === "all" || entry.template === stylePreset,
  );

  const groupedByFamily = entries.reduce<Record<string, typeof entries>>(
    (acc, entry) => {
      const fam = entry[1].family;
      if (!acc[fam]) acc[fam] = [];
      acc[fam]!.push(entry);
      return acc;
    },
    {},
  );

  const sortedFamilies = Object.keys(groupedByFamily).sort((a, b) => {
    const order = [
      "header",
      "hero",
      "features",
      "testimonials",
      "about",
      "faq",
      "contact",
      "footer",
    ];
    return order.indexOf(a) - order.indexOf(b);
  });

  const handleAdd = (type: string, defaultProps: Record<string, unknown>) => {
    dispatch({ type: "ADD_SECTION", sectionType: type, defaultProps });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h3
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#6b7280",
            margin: "0 0 12px 0",
          }}
        >
          Add Sections
        </h3>
        <p
          style={{
            fontSize: "12px",
            color: "#6b7280",
            margin: "0 0 12px 0",
            lineHeight: "1.5",
          }}
        >
          Choose a template preset, then pick a section variant card.
        </p>
        <label style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          <span
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#6b7280",
              fontWeight: 700,
            }}
          >
            Style Preset
          </span>
          <select
            value={stylePreset}
            onChange={(e) =>
              dispatch({
                type: "SET_STYLE_PRESET",
                preset: e.target.value as StylePreset,
              })
            }
            style={{
              backgroundColor: "#1a1a24",
              color: "#e2e2f0",
              border: "1px solid #2a2a3a",
              borderRadius: "8px",
              padding: "8px 10px",
              fontSize: "12px",
            }}
          >
            {presets.map((preset) => (
              <option key={preset.value} value={preset.value}>
                {preset.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {sortedFamilies.length === 0 && (
        <div
          style={{
            border: "1px dashed #2a2a3a",
            borderRadius: "10px",
            padding: "16px",
            color: "#6b7280",
            fontSize: "12px",
          }}
        >
          No section variants found for this preset yet.
        </div>
      )}

      {sortedFamilies.map((family) => {
        const items = groupedByFamily[family] ?? [];
        if (items.length === 0) return null;

        const firstCategory = items[0]?.[1].category ?? "content";
        const catMeta = categories[firstCategory as keyof typeof categories];

        return (
          <div key={family}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "6px" }}
              >
                <span style={{ fontSize: "13px" }}>{catMeta?.icon ?? "□"}</span>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    color: catMeta?.color ?? "#9ca3af",
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                  }}
                >
                  {familyLabel[family] ?? family}
                </span>
              </div>
              <span style={{ fontSize: "10px", color: "#6b7280" }}>
                {items.length} variants
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, minmax(0,1fr))",
                gap: "8px",
              }}
            >
              {items.map(([type, entry]) => (
                <button
                  key={type}
                  id={`add-section-${type}`}
                  onClick={() => handleAdd(type, entry.defaultProps)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "76px 1fr",
                    gap: "12px",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid #2a2a3a",
                    backgroundColor: "#1a1a24",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.backgroundColor = "#232337";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      entry.previewAccent ?? "#6366f1";
                  }}
                  onMouseLeave={(e) => {
                    (
                      e.currentTarget as HTMLButtonElement
                    ).style.backgroundColor = "#1a1a24";
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "#2a2a3a";
                  }}
                >
                  <div
                    style={{
                      borderRadius: "8px",
                      height: "56px",
                      background: entry.previewBackground,
                      border: "1px solid rgba(255,255,255,0.08)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        right: "6px",
                        bottom: "6px",
                        width: "10px",
                        height: "10px",
                        borderRadius: "9999px",
                        background: entry.previewAccent ?? "#6366f1",
                      }}
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        marginBottom: "4px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "#e2e2f0",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {entry.displayName}
                      </span>
                      <span
                        style={{
                          fontSize: "9px",
                          padding: "2px 6px",
                          borderRadius: "9999px",
                          backgroundColor: "#2a2a3a",
                          color: "#a5b4fc",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {entry.template}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#6b7280",
                        lineHeight: "1.45",
                      }}
                    >
                      {entry.description}
                    </div>
                    <div
                      style={{
                        marginTop: "6px",
                        fontSize: "10px",
                        color: "#4f46e5",
                      }}
                    >
                      {type}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
