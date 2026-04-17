import React from "react";

export interface ButtonProps {
  /** Button label text */
  label: string;
  /** Visual variant */
  variant?: "primary" | "secondary" | "outline" | "ghost";
  /** Size */
  size?: "sm" | "md" | "lg";
  /** Disabled state */
  disabled?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** HTML type attribute */
  type?: "button" | "submit" | "reset";
  /** Full width */
  fullWidth?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--color-primary, #000)",
    color: "var(--color-primary-fg, #fff)",
    border: "2px solid transparent",
  },
  secondary: {
    backgroundColor: "var(--color-secondary, #6b7280)",
    color: "var(--color-secondary-fg, #fff)",
    border: "2px solid transparent",
  },
  outline: {
    backgroundColor: "transparent",
    color: "var(--color-primary, #000)",
    border: "2px solid var(--color-primary, #000)",
  },
  ghost: {
    backgroundColor: "transparent",
    color: "var(--color-primary, #000)",
    border: "2px solid transparent",
  },
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, React.CSSProperties> = {
  sm: { padding: "6px 12px", fontSize: "0.8125rem", borderRadius: "6px" },
  md: { padding: "10px 20px", fontSize: "0.9375rem", borderRadius: "8px" },
  lg: { padding: "14px 28px", fontSize: "1.0625rem", borderRadius: "10px" },
};

export function Button({
  label,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  fullWidth = false,
}: ButtonProps) {
  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-family, Inter, sans-serif)",
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transition: "opacity 0.15s ease, transform 0.1s ease",
    width: fullWidth ? "100%" : undefined,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <button type={type} style={style} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}
