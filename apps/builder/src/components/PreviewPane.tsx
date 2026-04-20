import React, { useMemo } from "react";
import { useBuilderState } from "../BuilderContext";
import { generateCSSVariables, defaultTheme } from "@website-builder/theme";
import type { Theme } from "@website-builder/theme";
import { getComponent } from "@website-builder/registry";
import * as Sections from "@website-builder/sections";

export function PreviewPane() {
  const { sections, theme } = useBuilderState();

  // Generate localized CSS variables string for the preview container
  const themeCSS = useMemo(() => {
    const rawCSS = generateCSSVariables({
      ...defaultTheme,
      colors: {
        ...defaultTheme.colors,
        ...(theme.colors as Partial<Theme["colors"]>),
      },
      typography: {
        ...defaultTheme.typography,
        ...(theme.typography as Partial<Theme["typography"]>),
      },
    } as Theme);
    
    // Scope CSS variables to the #preview-canvas instead of global :root
    return rawCSS.replace(/:root/g, "#preview-canvas");
  }, [theme]);

  if (sections.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          gap: "16px",
          color: "#4a4a6a",
        }}
      >
        <div style={{ fontSize: "3rem" }}>🏗️</div>
        <div style={{ fontSize: "16px", fontWeight: 600, color: "#6b7280" }}>
          Your page preview will appear here
        </div>
        <div style={{ fontSize: "13px", color: "#4a4a6a" }}>
          Add sections from the left panel to get started
        </div>
      </div>
    );
  }

  return (
    <div
      id="preview-canvas"
      className="w-full bg-white h-full overflow-x-hidden overflow-y-auto relative"
      style={{
        color: "var(--color-text)",
        fontFamily: "var(--font-family, 'Inter', sans-serif)",
        transform: "translateZ(0)",
      }}
    >
      <style>{themeCSS}</style>
      <Sections.AuthLines />
      {sections.map((section) => {
        try {
          const entry = getComponent(section.type);
          // Dynamically load the component by its registered export name
          const Component = (Sections as any)[entry.component];
          
          if (!Component) {
            return (
              <div
                key={section.id}
                className="p-8 text-center bg-slate-100 text-slate-500 text-sm border-y border-slate-200"
              >
                Missing exported component: <b>{entry.component}</b>
              </div>
            );
          }
          
          return <Component key={section.id} {...section.props} />;
        } catch (err) {
          return (
            <div
              key={section.id}
              className="p-8 text-center bg-red-50 text-red-500 text-sm border-y border-red-200"
            >
              Error resolving section registry map: <b>{section.type}</b>
            </div>
          );
        }
      })}
    </div>
  );
}

