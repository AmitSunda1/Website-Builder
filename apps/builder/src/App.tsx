import React from "react";
import { BuilderProvider, useBuilderState, useBuilderDispatch } from "./BuilderContext";
import { SectionPicker } from "./components/SectionPicker";
import { SectionList } from "./components/SectionList";
import { TemplatePicker } from "./components/TemplatePicker";
import { PropEditor } from "./components/PropEditor";
import { ThemeEditor } from "./components/ThemeEditor";
import { ExportPanel } from "./components/ExportPanel";
import { PreviewPane } from "./components/PreviewPane";
import { Onboarding } from "./components/Onboarding";
import type { PanelTab } from "./types";

function MainLayout() {
  const { activeTab } = useBuilderState();
  const dispatch = useBuilderDispatch();

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", backgroundColor: "#0f0f13" }}>
      {/* ─── Left Sidebar (Panels) ──────────────────────────────────────────────── */}
      <aside style={{ width: "340px", flexShrink: 0, borderRight: "1px solid #2a2a3a", display: "flex", flexDirection: "column", backgroundColor: "#14141a" }}>
        
        {/* Brand header */}
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #2a2a3a", display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "24px", height: "24px", borderRadius: "6px", backgroundColor: "#6366f1", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "14px" }}>
            W
          </div>
          <div style={{ fontSize: "14px", fontWeight: 700, color: "#e2e2f0", letterSpacing: "0.02em" }}>
            Builder <span style={{ color: "#6366f1" }}>v2</span>
          </div>
        </div>

        {/* Tab navigation */}
        <div style={{ display: "flex", padding: "12px 24px 0", gap: "8px", borderBottom: "1px solid #2a2a3a" }}>
          <TabButton active={activeTab === "sections"} onClick={() => dispatch({ type: "SET_TAB", tab: "sections" })}>
            🧩 Sections
          </TabButton>
          <TabButton active={activeTab === "theme"} onClick={() => dispatch({ type: "SET_TAB", tab: "theme" })}>
            🎨 Theme
          </TabButton>
          <TabButton active={activeTab === "export"} onClick={() => dispatch({ type: "SET_TAB", tab: "export" })}>
            🚀 Export
          </TabButton>
        </div>

        {/* Tab content area */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          {activeTab === "sections" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <h3 style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6b7280", margin: 0 }}>
                    Page Structure
                  </h3>
                </div>
                <SectionList />
              </div>
              <PropEditor />
              <div style={{ height: "1px", backgroundColor: "#2a2a3a" }} />
              <TemplatePicker />
              <div style={{ height: "1px", backgroundColor: "#2a2a3a" }} />
              <SectionPicker />
            </div>
          )}
          {activeTab === "theme" && <ThemeEditor />}
          {activeTab === "export" && <ExportPanel />}
        </div>
      </aside>

      {/* ─── Right Area (Preview) ───────────────────────────────────────────────── */}
      <main style={{ flex: 1, backgroundColor: "#000", position: "relative" }}>
        
        {/* Top bar */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "48px", backgroundColor: "#14141a", borderBottom: "1px solid #2a2a3a", display: "flex", alignItems: "center", padding: "0 24px", zIndex: 10 }}>
          <div style={{ fontSize: "12px", color: "#6b7280", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981" }} />
            Live Preview (1440px)
          </div>
        </div>

        {/* Canvas */}
        <div style={{ position: "absolute", top: "48px", left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center", overflow: "hidden", padding: "24px" }}>
          <div style={{ width: "100%", maxWidth: "1440px", height: "100%", backgroundColor: "#fff", borderRadius: "8px", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}>
            <PreviewPane />
          </div>
        </div>
      </main>
    </div>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 12px",
        backgroundColor: "transparent",
        color: active ? "#e2e2f0" : "#6b7280",
        border: "none",
        borderBottom: `2px solid ${active ? "#6366f1" : "transparent"}`,
        fontSize: "12px",
        fontWeight: active ? 600 : 500,
        cursor: "pointer",
        transition: "all 0.15s ease",
        marginBottom: "-1px", /* overlap border */
      }}
      onMouseEnter={(e) => {
        if (!active) (e.currentTarget as HTMLButtonElement).style.color = "#a0a0b8";
      }}
      onMouseLeave={(e) => {
        if (!active) (e.currentTarget as HTMLButtonElement).style.color = "#6b7280";
      }}
    >
      {children}
    </button>
  );
}

export default function App() {
  return (
    <BuilderProvider>
      <AppRouter />
    </BuilderProvider>
  );
}

function AppRouter() {
  const { appState } = useBuilderState();
  if (appState === "onboarding") {
    return <Onboarding />;
  }
  return <MainLayout />;
}
