import { z } from "zod";

export const featureItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().optional(),
});

export const featuresSchema = z.object({
  /** Section heading */
  heading: z.string().min(1, "Heading is required"),
  /** Section subheading */
  subheading: z.string().optional(),
  /** List of features (1–9) */
  features: z.array(featureItemSchema).min(1).max(9),
  /** Grid columns */
  columns: z.enum(["2", "3", "4"]).optional().default("3"),
  /** Background style */
  variant: z.enum(["light", "dark", "accent"]).optional().default("light"),
});

export type FeaturesProps = z.infer<typeof featuresSchema>;
export type FeatureItem = z.infer<typeof featureItemSchema>;
