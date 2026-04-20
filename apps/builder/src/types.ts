// ─── Section ──────────────────────────────────────────────────────────────────

export interface SectionInstance {
  id: string;
  type: string; // must be a key in registry
  props: Record<string, unknown>;
}

// ─── Theme ────────────────────────────────────────────────────────────────────

export interface ThemeOverride {
  name: string;
  colors: {
    primary: string;
    primaryFg?: string;
    secondary?: string;
    background?: string;
    surface?: string;
    text?: string;
  };
  typography?: {
    fontFamily?: string;
  };
}

// ─── Page config ─────────────────────────────────────────────────────────────

export interface PageConfig {
  sections: SectionInstance[];
  theme: ThemeOverride;
}

// ─── API response ─────────────────────────────────────────────────────────────

export interface GenerateResponse {
  status: "created" | "error";
  repoUrl?: string;
  projectId?: string;
  workspaceDir?: string;
  sectionsCount?: number;
  message?: string;
  detail?: string;
}

// ─── Builder state ────────────────────────────────────────────────────────────

export type PanelTab = "sections" | "theme" | "export";

export type StylePreset =
  | "all"
  | "core"
  | "authantimate"
  | "blitz-clone"
  | "web-cohort";
export type TemplatePreset =
  | "starter"
  | "authantimate"
  | "blitz-clone"
  | "web-cohort";
