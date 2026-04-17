import { generateCSSVariables, defaultTheme } from "@website-builder/theme";
import type { ThemeConfig } from "../schemas/generate.schema";
import type { Theme } from "@website-builder/theme";

/**
 * Merges user-supplied theme overrides with the defaultTheme
 * and returns a full CSS variables string.
 */
export function injectTheme(themeConfig: ThemeConfig): string {
  const merged: Theme = {
    ...defaultTheme,
    name: themeConfig.name ?? defaultTheme.name,
    colors: {
      ...defaultTheme.colors,
      ...(themeConfig.colors?.primary && { primary: themeConfig.colors.primary }),
      ...(themeConfig.colors?.primaryFg && { primaryFg: themeConfig.colors.primaryFg }),
      ...(themeConfig.colors?.secondary && { secondary: themeConfig.colors.secondary }),
      ...(themeConfig.colors?.background && { background: themeConfig.colors.background }),
      ...(themeConfig.colors?.surface && { surface: themeConfig.colors.surface }),
      ...(themeConfig.colors?.text && { text: themeConfig.colors.text }),
    },
    typography: {
      ...defaultTheme.typography,
      ...(themeConfig.typography?.fontFamily && {
        fontFamily: themeConfig.typography.fontFamily,
      }),
    },
  };

  return generateCSSVariables(merged);
}
