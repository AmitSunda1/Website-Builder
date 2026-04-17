import React from "react";
import { listComponents } from "@website-builder/registry";
import { useBuilderDispatch } from "../BuilderContext";

const categories = {
  layout: { label: "Layout", color: "#6366f1", icon: "◧" },
  content: { label: "Content", color: "#06b6d4", icon: "⊞" },
  social: { label: "Social Proof", color: "#10b981", icon: "★" },
  conversion: { label: "Conversion", color: "#f59e0b", icon: "⚡" },
};

export function SectionPicker() {
  const dispatch = useBuilderDispatch();
  const entries = listComponents();

  const grouped = entries.reduce<Record<string, typeof entries>>((acc, entry) => {
    const cat = entry[1].category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat]!.push(entry);
    return acc;
  }, {});

  const handleAdd = (type: string, defaultProps: Record<string, unknown>) => {
    dispatch({ type: "ADD_SECTION", sectionType: type, defaultProps });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h3 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280", margin: "0 0 12px 0" }}>
          Add Sections
        </h3>
        <p style={{ fontSize: "12px", color: "#6b7280", margin: "0 0 16px 0", lineHeight: "1.5" }}>
          Click any section to add it to your page.
        </p>
      </div>

      {Object.entries(grouped).map(([cat, items]) => {
        const catMeta = categories[cat as keyof typeof categories];
        return (
          <div key={cat}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px" }}>{catMeta?.icon}</span>
              <span style={{ fontSize: "11px", fontWeight: 600, color: catMeta?.color ?? "#6b7280", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {catMeta?.label ?? cat}
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              {items.map(([type, entry]) => (
                <button
                  key={type}
                  id={`add-section-${type}`}
                  onClick={() => handleAdd(type, entry.defaultProps)}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                    padding: "12px",
                    backgroundColor: "#1a1a24",
                    border: "1px solid #2a2a3a",
                    borderRadius: "8px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                    width: "100%",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#22223a";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = catMeta?.color ?? "#6366f1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1a1a24";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "#2a2a3a";
                  }}
                >
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    backgroundColor: `${catMeta?.color ?? "#6366f1"}22`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    flexShrink: 0,
                  }}>
                    {catMeta?.icon}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "13px", fontWeight: 600, color: "#e2e2f0", marginBottom: "2px" }}>
                      {entry.displayName}
                    </div>
                    <div style={{ fontSize: "11px", color: "#6b7280", lineHeight: "1.4" }}>
                      {entry.description}
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
