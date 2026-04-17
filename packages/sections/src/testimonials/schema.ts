import { z } from "zod";

export const testimonialItemSchema = z.object({
  quote: z.string().min(1),
  name: z.string().min(1),
  title: z.string().optional(),
  company: z.string().optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  avatar: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
});

export const testimonialsSchema = z.object({
  /** Section heading */
  heading: z.string().min(1, "Heading is required"),
  /** Section subheading */
  subheading: z.string().optional(),
  /** Array of testimonials (1–6) */
  testimonials: z.array(testimonialItemSchema).min(1).max(6),
  /** Background variant */
  variant: z.enum(["light", "dark", "accent"]).optional().default("accent"),
});

export type TestimonialsProps = z.infer<typeof testimonialsSchema>;
export type TestimonialItem = z.infer<typeof testimonialItemSchema>;
