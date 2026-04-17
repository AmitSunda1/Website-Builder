import { z } from "zod";
import { ALLOWED_SECTION_TYPES } from "@website-builder/registry";

// ─── Section config (per section in the page) ─────────────────────────────────

export const sectionConfigSchema = z.object({
  /** Must be a registered type */
  type: z.string().refine(
    (t) => (ALLOWED_SECTION_TYPES as string[]).includes(t),
    (t) => ({ message: `Unknown section type: "${t}". Allowed: ${ALLOWED_SECTION_TYPES.join(", ")}` })
  ),
  /** Raw props — validated against the per-section schema in the pipeline */
  props: z.record(z.unknown()),
});

// ─── Theme config ─────────────────────────────────────────────────────────────

export const themeConfigSchema = z.object({
  name: z.string().optional().default("default"),
  colors: z
    .object({
      primary: z.string().regex(/^#[0-9a-fA-F]{3,8}$/, "Must be a hex color"),
      primaryFg: z.string().regex(/^#[0-9a-fA-F]{3,8}$/).optional().default("#ffffff"),
      secondary: z.string().regex(/^#[0-9a-fA-F]{3,8}$/).optional(),
      background: z.string().regex(/^#[0-9a-fA-F]{3,8}$/).optional(),
      surface: z.string().regex(/^#[0-9a-fA-F]{3,8}$/).optional(),
      text: z.string().regex(/^#[0-9a-fA-F]{3,8}$/).optional(),
    })
    .optional(),
  typography: z
    .object({
      fontFamily: z.string().optional(),
    })
    .optional(),
});

// ─── Generate request body ────────────────────────────────────────────────────

export const generateRequestSchema = z.object({
  projectName: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[a-z0-9-]+$/, "Only lowercase letters, numbers, and hyphens allowed"),
  repoName: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-zA-Z0-9_.-]+$/, "Invalid repo name"),
  config: z.object({
    sections: z.array(sectionConfigSchema).min(1).max(20),
    theme: themeConfigSchema,
  }),
  /** Optional ID to link to a project for AI hydration */
  projectId: z.string().optional(),
  /** GitHub token — optional; if omitted, skips GitHub push */
  githubToken: z.string().optional(),
  /** GitHub username/org for repo creation */
  githubOwner: z.string().optional(),
});

export type GenerateRequest = z.infer<typeof generateRequestSchema>;
export type SectionConfig = z.infer<typeof sectionConfigSchema>;
export type ThemeConfig = z.infer<typeof themeConfigSchema>;
