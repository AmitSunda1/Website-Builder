import { z } from "zod";

const textSegmentSchema = z.object({
  text: z.string(),
  highlight: z.boolean().default(false)
});

export const webCohortHeaderSchema = z.object({
  logoUrl: z.string().describe("URL of the brand logo"),
  navLinks: z.array(z.object({
    label: z.string(),
    href: z.string()
  })).describe("Main navigation links"),
  ctaText: z.string().describe("Text for the primary CTA button")
});

export const webCohortHeroSchema = z.object({
  chipText: z.string(),
  title: z.array(textSegmentSchema),
  subtitle: z.string(),
  joinedCount: z.number(),
  joinedText: z.string(),
  emailPlaceholder: z.string(),
  emailCta: z.string(),
  video: z.object({
    title: z.string(),
    subtitle: z.string(),
    wistiaVideoId: z.string()
  }),
  valueProps: z.array(z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(["default", "carousel", "tech-stack"]).default("default"),
    carouselItems: z.array(z.object({ title: z.string(), description: z.string() })).optional(),
    items: z.array(z.string()).optional(),
  })).optional()
});

export const webCohortBenefitsSchema = z.object({
  title: z.array(textSegmentSchema),
  benefits: z.array(z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string()
  }))
});

export const webCohortCurriculumSchema = z.object({
  title: z.array(textSegmentSchema),
  subtitle: z.string(),
  modules: z.array(z.object({
    title: z.string(),
    duration: z.string(),
    lessons: z.array(z.string())
  })),
  perks: z.array(z.string()).describe("List of perks displayed on the right side").optional()
});

export const webCohortSpeakersSchema = z.object({
  title: z.array(textSegmentSchema),
  subtitle: z.string(),
  speakers: z.array(z.object({
    id: z.string(),
    name: z.string(),
    designation: z.string(),
    profilePhoto: z.string(),
    linkedinUrl: z.string()
  }))
});

export const webCohortWhyUsSchema = z.object({
  title: z.array(textSegmentSchema),
  subtitle: z.string(),
  othersPoints: z.array(z.string()),
  ourPoints: z.array(z.string())
});

export const webCohortNoteSchema = z.object({
  chipText: z.string(),
  title: z.array(textSegmentSchema),
  ctaText: z.string()
});

export const webCohortTestimonialsSchema = z.object({
  title: z.array(textSegmentSchema),
  subtitle: z.string(),
  testimonials: z.array(z.object({
    id: z.string(),
    name: z.string(),
    testimonialText: z.string(),
    rating: z.number().min(1).max(5),
    profilePhoto: z.string()
  }))
});

export const webCohortFAQSchema = z.object({
  title: z.array(textSegmentSchema),
  subtitle: z.string(),
  faqs: z.array(z.object({
    id: z.string(),
    question: z.string(),
    answer: z.string()
  }))
});

export const webCohortFooterSchema = z.object({
  title: z.array(textSegmentSchema),
  subtitle: z.string(),
  logoUrl: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  whatsappNumber: z.string().optional(),
  whatsappLink: z.string().optional(),
  copyright: z.string().optional(),
});

export const webCohortWhatsAppFloatSchema = z.object({
  whatsappLink: z.string().describe("Direct link to the WhatsApp group or chat").optional(),
});

export type WebCohortHeaderProps = z.infer<typeof webCohortHeaderSchema>;
export type WebCohortHeroProps = z.infer<typeof webCohortHeroSchema>;
export type WebCohortBenefitsProps = z.infer<typeof webCohortBenefitsSchema>;
export type WebCohortCurriculumProps = z.infer<typeof webCohortCurriculumSchema>;
export type WebCohortSpeakersProps = z.infer<typeof webCohortSpeakersSchema>;
export type WebCohortWhyUsProps = z.infer<typeof webCohortWhyUsSchema>;
export type WebCohortNoteProps = z.infer<typeof webCohortNoteSchema>;
export type WebCohortTestimonialsProps = z.infer<typeof webCohortTestimonialsSchema>;
export type WebCohortFAQProps = z.infer<typeof webCohortFAQSchema>;
export type WebCohortFooterProps = z.infer<typeof webCohortFooterSchema>;
export type WebCohortWhatsAppFloatProps = z.infer<typeof webCohortWhatsAppFloatSchema>;
