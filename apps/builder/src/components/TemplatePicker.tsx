import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useBuilderState, useBuilderDispatch } from "../BuilderContext";
import { TEMPLATE_PRESETS, getComponent } from "@website-builder/registry";
import type { SectionInstance } from "../types";

export function TemplatePicker() {
  const { templatePreset, sections } = useBuilderState();
  const dispatch = useBuilderDispatch();

  // If we already have sections, we might not want to show the picker,
  // or we might want to let them override. For now, let's always show it,
  // but warn if they are over-writing existing sections.

  const handleSelectTemplate = (templateId: string) => {
    if (sections.length > 0) {
      if (!window.confirm("Loading a template will replace all your current sections. Continue?")) {
        return;
      }
    }

    const preset = TEMPLATE_PRESETS.find((p) => p.id === templateId);
    if (!preset) return;

    const newSections: SectionInstance[] = preset.sectionSequence.map((typeKey) => {
      try {
        const entry = getComponent(typeKey);
        return {
          id: uuidv4(),
          type: typeKey,
          props: { ...entry.defaultProps },
        };
      } catch (err) {
        // Fallback for an invalid type mapping during development
        return {
          id: uuidv4(),
          type: "hero-1", // safe fallback
          props: {},
        };
      }
    });

    dispatch({ type: "SET_TEMPLATE_PRESET", preset: templateId as any });
    dispatch({ type: "SET_SECTIONS", sections: newSections });
  };

  return (
    <div style={{ marginTop: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
        <h3 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280", margin: 0 }}>
          Template Presets
        </h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {TEMPLATE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => handleSelectTemplate(preset.id)}
            style={{
              padding: "16px",
              backgroundColor: templatePreset === preset.id ? "rgba(99, 102, 241, 0.15)" : "#1e1e24",
              border: `1px solid ${templatePreset === preset.id ? "#6366f1" : "#2a2a3a"}`,
              borderRadius: "8px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s ease",
              width: "100%",
            }}
          >
            <div style={{ color: templatePreset === preset.id ? "#818cf8" : "#e2e2f0", fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>
              {preset.name}
            </div>
            <div style={{ color: "#9ca3af", fontSize: "12px", lineHeight: 1.4 }}>
              {preset.description}
            </div>
          </button>
        ))}
        {TEMPLATE_PRESETS.length === 0 && (
          <div style={{ color: "#6b7280", fontSize: "12px" }}>No templates available.</div>
        )}
      </div>
    </div>
  );
}
