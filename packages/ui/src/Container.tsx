import React from "react";

export interface ContainerProps {
  /** Child content */
  children: React.ReactNode;
  /** Max width of the container */
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
  /** Horizontal padding */
  padding?: "none" | "sm" | "md" | "lg";
  /** Center content */
  centered?: boolean;
}

const maxWidthMap: Record<NonNullable<ContainerProps["maxWidth"]>, string> = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  full: "100%",
};

const paddingMap: Record<NonNullable<ContainerProps["padding"]>, string> = {
  none: "0",
  sm: "0 16px",
  md: "0 24px",
  lg: "0 48px",
};

export function Container({
  children,
  maxWidth = "xl",
  padding = "md",
  centered = true,
}: ContainerProps) {
  const style: React.CSSProperties = {
    width: "100%",
    maxWidth: maxWidthMap[maxWidth],
    padding: paddingMap[padding],
    marginLeft: centered ? "auto" : undefined,
    marginRight: centered ? "auto" : undefined,
    boxSizing: "border-box",
  };

  return <div style={style}>{children}</div>;
}
