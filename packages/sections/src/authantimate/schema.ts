import { z } from "zod";

// ─── Shared sub-schemas ──────────────────────────────────────────────────────

const navLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const featureItemSchema = z.object({
  icon: z.string().describe("URL for the feature icon image"),
  title: z.string(),
  description: z.string(),
});

const aboutItemSchema = z.object({
  number: z.string().describe("Step number e.g. 01, 02"),
  title: z.string(),
  description: z.string(),
});

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const testimonialItemSchema = z.object({
  name: z.string(),
  designation: z.string(),
  avatar: z.string().describe("URL for avatar image"),
  content: z.string(),
});

const pricingFeatureSchema = z.string();

const pricingPlanSchema = z.object({
  price: z.string().describe("e.g. $10"),
  period: z.string().describe("e.g. /month"),
  name: z.string().describe("e.g. Small Pack"),
  description: z.string(),
  features: z.array(pricingFeatureSchema),
  isPopular: z.boolean().default(false),
});

const footerLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

// ─── Component Schemas ───────────────────────────────────────────────────────

export const headerSchema = z.object({
  logoText: z.string().describe("Brand name shown as text logo"),
  logoUrl: z.string().optional().describe("URL for logo image (overrides text)"),
  navLinks: z.array(navLinkSchema),
  ctaText: z.string(),
  ctaHref: z.string(),
  githubUrl: z.string().optional(),
  githubLabel: z.string().optional(),
});

export const heroSchema = z.object({
  kicker: z.string().describe("Small eyebrow text above headline"),
  headline: z.string(),
  headlineHighlight: z.string().describe("The highlighted word(s) in the headline"),
  description: z.string(),
  emailPlaceholder: z.string(),
  ctaText: z.string(),
  ctaHref: z.string(),
  trustNote: z.string().describe("Short trust note below CTA, e.g. 'No credit card required'"),
  imageUrl: z.string().describe("URL for the hero screenshot / product image"),
});

export const featuresSchema = z.object({
  kicker: z.string().describe("Small label above section title"),
  title: z.string(),
  description: z.string(),
  items: z.array(featureItemSchema),
});

export const aboutSchema = z.object({
  badge: z.string().describe("Green badge label e.g. 'New'"),
  badgeLabel: z.string().describe("Text next to the badge"),
  heading: z.string(),
  headingHighlight: z.string(),
  description: z.string(),
  items: z.array(aboutItemSchema),
  imageUrl: z.string().describe("Left side image URL"),
  section2Kicker: z.string(),
  section2Heading: z.string(),
  section2Highlight: z.string(),
  section2Description: z.string(),
  ctaText: z.string(),
  ctaHref: z.string(),
  image2Url: z.string().describe("Right side image URL for second block"),
});

export const ctaSchema = z.object({
  heading: z.string(),
  description: z.string(),
  ctaText: z.string(),
  ctaHref: z.string(),
  imageUrl: z.string().describe("Decorative CTA banner image URL"),
});

export const faqSchema = z.object({
  kicker: z.string(),
  heading: z.string(),
  headingHighlight: z.string(),
  ctaText: z.string(),
  ctaHref: z.string(),
  items: z.array(faqItemSchema),
});

export const testimonialSchema = z.object({
  kicker: z.string(),
  title: z.string(),
  description: z.string(),
  items: z.array(testimonialItemSchema),
});

export const pricingSchema = z.object({
  kicker: z.string(),
  title: z.string(),
  description: z.string(),
  ctaText: z.string(),
  ctaHref: z.string(),
  plans: z.array(pricingPlanSchema),
});

export const contactSchema = z.object({
  heading: z.string(),
  address: z.string(),
  email: z.string(),
  phone: z.string(),
  primaryButtonText: z.string(),
  consentText: z.string(),
});

export const footerSchema = z.object({
  brandName: z.string(),
  tagline: z.string(),
  contactEmail: z.string(),
  quickLinks: z.array(footerLinkSchema),
  supportLinks: z.array(footerLinkSchema),
  newsletterPlaceholder: z.string(),
  copyright: z.string(),
});

export const brandsSchema = z.object({
  title: z.string().optional().describe("Optional short intro above logo strip"),
  logos: z.array(
    z.object({
      name: z.string(),
      imageUrl: z.string(),
    })
  ),
});
