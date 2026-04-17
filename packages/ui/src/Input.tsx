import React from "react";

export interface InputProps {
  /** Input id (required for a11y) */
  id: string;
  /** Label text */
  label: string;
  /** Current value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Placeholder */
  placeholder?: string;
  /** Input type */
  type?: "text" | "email" | "url" | "number" | "tel";
  /** Disabled */
  disabled?: boolean;
  /** Error message */
  error?: string;
  /** Helper text */
  helper?: string;
  /** Required */
  required?: boolean;
}

export function Input({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  error,
  helper,
  required = false,
}: InputProps) {
  const wrapperStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "100%",
    fontFamily: "var(--font-family, Inter, sans-serif)",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "0.8125rem",
    fontWeight: 600,
    color: "var(--color-label, #374151)",
  };

  const inputStyle: React.CSSProperties = {
    padding: "8px 12px",
    borderRadius: "8px",
    border: `1.5px solid ${error ? "var(--color-error, #ef4444)" : "var(--color-border, #d1d5db)"}`,
    fontSize: "0.9375rem",
    color: "var(--color-text, #111827)",
    backgroundColor: disabled ? "var(--color-surface-disabled, #f9fafb)" : "var(--color-surface, #fff)",
    outline: "none",
    transition: "border-color 0.15s ease",
    width: "100%",
    boxSizing: "border-box",
    opacity: disabled ? 0.6 : 1,
  };

  const subTextStyle: React.CSSProperties = {
    fontSize: "0.75rem",
    color: error ? "var(--color-error, #ef4444)" : "var(--color-muted, #6b7280)",
  };

  return (
    <div style={wrapperStyle}>
      <label htmlFor={id} style={labelStyle}>
        {label}
        {required && <span style={{ color: "var(--color-error, #ef4444)", marginLeft: "2px" }}>*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        style={inputStyle}
      />
      {(error ?? helper) && (
        <span style={subTextStyle}>{error ?? helper}</span>
      )}
    </div>
  );
}
