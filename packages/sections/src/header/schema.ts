import { z } from "zod";

export const headerSchema = z.object({
  /** Site/brand title shown in the nav */
  title: z.string().min(1, "Title is required"),
  logoUrl: z.string().optional(),
  /** Optional tagline under the title */
  subtitle: z.string().optional(),
  /** Show a CTA button in the header */
  showCTA: z.boolean(),
  /** CTA button label (required when showCTA is true) */
  ctaText: z.string().optional(),
  /** CTA link href */
  ctaHref: z.string().optional(),
  /** Use dark/light background */
  variant: z.enum(["light", "dark"]).optional().default("light"),
});

export type HeaderProps = z.infer<typeof headerSchema>;
