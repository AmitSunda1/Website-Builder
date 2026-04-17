export interface ColorTokens {
  primary: string;
  primaryFg: string;
  secondary: string;
  secondaryFg: string;
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  error: string;
  success: string;
  warning: string;
}

export interface TypographyTokens {
  fontFamily: string;
  fontFamilyMono: string;
  fontSizeBase: string;
  fontSizeSm: string;
  fontSizeLg: string;
  fontSizeXl: string;
  fontSizeXxl: string;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  lineHeightBase: string;
  lineHeightTight: string;
}

export interface SpacingTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

export interface BorderTokens {
  radiusSm: string;
  radiusMd: string;
  radiusLg: string;
  radiusXl: string;
  radiusFull: string;
}

export interface ShadowTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
}

export interface Theme {
  name: string;
  colors: ColorTokens;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  border: BorderTokens;
  shadow: ShadowTokens;
}

export const defaultTheme: Theme = {
  name: "default",
  colors: {
    primary: "#1a1a2e",
    primaryFg: "#ffffff",
    secondary: "#16213e",
    secondaryFg: "#ffffff",
    background: "#ffffff",
    surface: "#f8fafc",
    text: "#0f172a",
    textMuted: "#64748b",
    border: "#e2e8f0",
    error: "#ef4444",
    success: "#22c55e",
    warning: "#f59e0b",
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyMono: "'JetBrains Mono', 'Fira Code', monospace",
    fontSizeBase: "1rem",
    fontSizeSm: "0.875rem",
    fontSizeLg: "1.125rem",
    fontSizeXl: "1.25rem",
    fontSizeXxl: "1.5rem",
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    lineHeightBase: "1.6",
    lineHeightTight: "1.2",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "48px",
    xxl: "96px",
  },
  border: {
    radiusSm: "4px",
    radiusMd: "8px",
    radiusLg: "12px",
    radiusXl: "16px",
    radiusFull: "9999px",
  },
  shadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
};

export const darkTheme: Theme = {
  name: "dark",
  colors: {
    primary: "#6366f1",
    primaryFg: "#ffffff",
    secondary: "#8b5cf6",
    secondaryFg: "#ffffff",
    background: "#0f172a",
    surface: "#1e293b",
    text: "#f1f5f9",
    textMuted: "#94a3b8",
    border: "#334155",
    error: "#f87171",
    success: "#4ade80",
    warning: "#fbbf24",
  },
  typography: defaultTheme.typography,
  spacing: defaultTheme.spacing,
  border: defaultTheme.border,
  shadow: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.3)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.3)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.3)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.3)",
  },
};
