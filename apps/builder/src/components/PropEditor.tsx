import React from "react";
import { getComponent } from "@website-builder/registry";
import { useBuilderState, useBuilderDispatch } from "../BuilderContext";
import type { ZodTypeAny } from "zod";

type ZodShape = Record<string, ZodTypeAny>;

/**
 * Dynamically renders a form based on the selected section's Zod schema.
 * Supports: string, boolean, number, enum, array-of-objects.
 */
export function PropEditor() {
  const { sections, selectedSectionId } = useBuilderState();
  const dispatch = useBuilderDispatch();

  const section = sections.find((s) => s.id === selectedSectionId);
  if (!section) {
    return (
      <div style={{ padding: "24px 0", textAlign: "center", color: "#6b7280", fontSize: "12px" }}>
        Select a section to edit its properties.
      </div>
    );
  }

  let entry;
  try {
    entry = getComponent(section.type);
  } catch {
    return <div style={{ color: "#ef4444", fontSize: "12px" }}>Unknown section type.</div>;
  }

  const schema = entry.schema;
  // Access the raw shape from ZodObject
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  const shape: ZodShape = (schema as any)._def?.shape?.() ?? {};

  const handleChange = (key: string, value: unknown) => {
    dispatch({ type: "UPDATE_SECTION_PROPS", id: section.id, props: { [key]: value } });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{
        padding: "10px 12px",
        backgroundColor: "#1a1a30",
        borderRadius: "8px",
        border: "1px solid #6366f140",
      }}>
        <div style={{ fontSize: "11px", fontWeight: 700, color: "#6366f1", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          Editing: {entry.displayName}
        </div>
      </div>

      {Object.entries(shape).map(([key, zodType]) => (
        <FieldRenderer
          key={key}
          fieldKey={key}
          zodType={zodType}
          value={section.props[key]}
          onChange={(v) => handleChange(key, v)}
        />
      ))}
    </div>
  );
}

// ─── Field renderer ───────────────────────────────────────────────────────────

function FieldRenderer({
  fieldKey,
  zodType,
  value,
  onChange,
}: {
  fieldKey: string;
  zodType: ZodTypeAny;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  // Unwrap optional/default wrappers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  const innerType: ZodTypeAny = (zodType as any)._def?.innerType ?? zodType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const typeName: string = (innerType as any)._def?.typeName ?? (zodType as any)._def?.typeName ?? "";

  const label = toLabel(fieldKey);

  // Boolean checkbox
  if (typeName === "ZodBoolean") {
    return (
      <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
        <input
          type="checkbox"
          id={`prop-${fieldKey}`}
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          style={{ width: "16px", height: "16px", accentColor: "#6366f1", cursor: "pointer" }}
        />
        <span style={{ fontSize: "13px", color: "#c0c0d0" }}>{label}</span>
      </label>
    );
  }

  // Enum select
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  const enumValues: string[] | undefined = (innerType as any)._def?.values;
  if (typeName === "ZodEnum" && enumValues) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor={`prop-${fieldKey}`} style={labelStyle}>{label}</label>
        <select
          id={`prop-${fieldKey}`}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          style={inputStyle}
        >
          {enumValues.map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>
    );
  }

  // Number
  if (typeName === "ZodNumber") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor={`prop-${fieldKey}`} style={labelStyle}>{label}</label>
        <input
          id={`prop-${fieldKey}`}
          type="number"
          value={typeof value === "number" ? value : ""}
          onChange={(e) => onChange(Number(e.target.value))}
          style={inputStyle}
        />
      </div>
    );
  }

  // Array — show as JSON textarea (for sub-arrays like features, testimonials)
  if (typeName === "ZodArray") {
    const arrVal = Array.isArray(value) ? value : [];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor={`prop-${fieldKey}`} style={labelStyle}>{label} <span style={{ color: "#6b7280", fontWeight: 400 }}>(JSON array)</span></label>
        <textarea
          id={`prop-${fieldKey}`}
          rows={5}
          value={JSON.stringify(arrVal, null, 2)}
          onChange={(e) => {
            try {
              const parsed: unknown = JSON.parse(e.target.value);
              onChange(parsed);
            } catch {
              // don't update on invalid JSON
            }
          }}
          style={{ ...inputStyle, fontFamily: "var(--font-mono, monospace)", fontSize: "11px", resize: "vertical" }}
        />
      </div>
    );
  }

  // Default: string input (covers ZodString, URL, etc.)
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label htmlFor={`prop-${fieldKey}`} style={labelStyle}>{label}</label>
      <input
        id={`prop-${fieldKey}`}
        type="text"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter ${label.toLowerCase()}…`}
        style={inputStyle}
      />
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  color: "#a0a0b8",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const inputStyle: React.CSSProperties = {
  backgroundColor: "#1a1a24",
  border: "1px solid #2a2a3a",
  borderRadius: "6px",
  color: "#e2e2f0",
  fontSize: "13px",
  padding: "8px 10px",
  outline: "none",
  width: "100%",
  transition: "border-color 0.15s ease",
  boxSizing: "border-box",
};
