import { z } from "zod";

export const footerLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string(),
});

export const footerColumnSchema = z.object({
  title: z.string().min(1),
  links: z.array(footerLinkSchema).min(1).max(8),
});

export const footerSchema = z.object({
  /** Brand name */
  brandName: z.string().min(1, "Brand name is required"),
  logoUrl: z.string().optional(),
  /** Tagline shown under brand name */
  tagline: z.string().optional(),
  /** Link columns (1–4) */
  columns: z.array(footerColumnSchema).min(0).max(4).optional().default([]),
  /** Copyright text */
  copyrightText: z.string().optional(),
  /** Show current year automatically */
  showYear: z.boolean().optional().default(true),
  /** Social links */
  socialLinks: z
    .array(
      z.object({
        platform: z.enum(["twitter", "github", "linkedin", "instagram", "facebook", "youtube"]),
        href: z.string(),
      })
    )
    .optional()
    .default([]),
  /** Background variant */
  variant: z.enum(["light", "dark"]).optional().default("dark"),
});

export type FooterProps = z.infer<typeof footerSchema>;
export type FooterColumn = z.infer<typeof footerColumnSchema>;
export type FooterLink = z.infer<typeof footerLinkSchema>;
