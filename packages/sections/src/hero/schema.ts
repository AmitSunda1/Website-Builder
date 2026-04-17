import { z } from "zod";

export const heroSchema = z.object({
  /** Main headline */
  headline: z.string().min(1, "Headline is required"),
  /** Supporting description */
  description: z.string().optional(),
  /** Primary CTA button label */
  primaryCTAText: z.string().optional(),
  /** Primary CTA href */
  primaryCTAHref: z.string().optional(),
  /** Secondary CTA button label */
  secondaryCTAText: z.string().optional(),
  /** Secondary CTA href */
  secondaryCTAHref: z.string().optional(),
  /** Background style */
  backgroundStyle: z.enum(["gradient", "solid", "image"]).optional().default("gradient"),
  /** Background image URL (when backgroundStyle is 'image') */
  backgroundImageUrl: z.string().optional(),
  /** Foreground image URL */
  imageUrl: z.string().optional(),
  /** Alignment of content */
  align: z.enum(["left", "center", "right"]).optional().default("center"),
});

export type HeroProps = z.infer<typeof heroSchema>;
