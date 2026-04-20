import { z } from "zod";

const navLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

export const blitzHeaderSchema = z.object({
  logoText: z.string().optional(),
  logoUrl: z.string().optional(),
  navLinks: z.array(navLinkSchema),
  ctaText: z.string(),
  ctaHref: z.string(),
  loginText: z.string().default("Login"),
  loginHref: z.string().default("#login"),
});

export const blitzHeroSchema = z.object({
  eyebrowBadge: z.object({
    label: z.string(),
    text: z.string(),
    emoji: z.string(),
    href: z.string(),
  }),
  title: z.string(),
  subtitle: z.string(),
  highlightWord: z.string().optional(),
  primaryCta: z.object({
    text: z.string(),
    href: z.string(),
  }),
  secondaryCta: z.object({
    text: z.string(),
    href: z.string(),
  }),
  bottomText: z.string(),
  mockup: z.object({
    mainLabel: z.string().optional().default("No outdated data"),
    mainHighlight: z.string().optional().default("outdated"),
    cardLabels: z.array(z.string()).optional().default(["People Search", "Email Validation", "Company Enrich"]),
    gridLabels: z.array(z.string()).optional().default(["Contact record", "Enriched profile", "Validated email", "Company data"]),
  }).optional(),
});

export const blitzBrandsSchema = z.object({
  logos: z.array(z.object({
    name: z.string(),
    src: z.string(),
    width: z.number().optional().default(100),
    height: z.number().optional().default(32),
  })),
  speed: z.number().default(25),
});

export const blitzFeaturesSchema = z.object({
  title: z.string(),
  highlightWord: z.string().optional(),
  description: z.array(z.string()),
  cta: z.object({
    text: z.string(),
    href: z.string(),
  }),
  featureCards: z.array(z.object({
    iconSrc: z.string(),
    title: z.string(),
  })),
  visualImageSrc: z.string(),
});

export const blitzUseCasesSchema = z.object({
  title: z.string(),
  highlightWord: z.string().optional(),
  useCases: z.array(z.object({
    icon: z.string(),
    title: z.string(),
    desc: z.string(),
  })),
  cta: z.object({
    text: z.string(),
    href: z.string(),
  }),
});

export const blitzIntegrationsSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  integrations: z.array(z.object({
    name: z.string(),
    src: z.string(),
    width: z.number().optional().default(80),
    height: z.number().optional().default(26),
  })),
});

export const blitzPricingSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  stats: z.array(z.object({
    value: z.string(),
    label: z.string(),
    emoji: z.string().optional(),
  })),
  highlightWord: z.string().optional(),
  costLabel: z.string().default("Cost:"),
  costValue: z.string().default("250 €"),
  mockup: z.object({
    labels: z.array(z.string()).optional().default(["Contact Sync", "Lead Score", "Enrichment"]),
  }).optional(),
});

export const blitzPricingPlansSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  highlightWord: z.string().optional(),
  plans: z.array(z.object({
    name: z.string(),
    price: z.string(),
    period: z.string(),
    desc: z.string(),
    highlight: z.boolean(),
    badge: z.string().optional(),
    features: z.array(z.string()),
    ctaText: z.string().optional().default("Get 1,000 credits free"),
    ctaHref: z.string().optional().default("#signup"),
  })),
  footerNote: z.string().optional().default("Join leading companies who trust our platform to power their business."),
  footerLogos: z.array(z.string()).optional().default(["classpass", "DocuSign", "Webflow", "codecademy"]),
});

export const blitzFAQSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  faqs: z.array(z.object({
    q: z.string(),
    a: z.string(),
  })),
});

export const blitzCTASchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  cta: z.object({
    text: z.string(),
    href: z.string(),
  }),
  benefits: z.array(z.object({
    icon: z.string(),
    label: z.string(),
  })).optional(),
});

export const blitzFooterSchema = z.object({
  logoSrc: z.string(),
  brandName: z.string().default("Brand"),
  description: z.string(),
  copyright: z.string(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    href: z.string(),
    icon: z.string(), // name or svg path
  })),
  links: z.record(z.array(z.string())),
  watermark: z.string().default("Brand"),
});

export type BlitzHeaderProps = z.infer<typeof blitzHeaderSchema>;
export type BlitzHeroProps = z.infer<typeof blitzHeroSchema>;
export type BlitzBrandsProps = z.infer<typeof blitzBrandsSchema>;
export type BlitzFeaturesProps = z.infer<typeof blitzFeaturesSchema>;
export type BlitzUseCasesProps = z.infer<typeof blitzUseCasesSchema>;
export type BlitzIntegrationsProps = z.infer<typeof blitzIntegrationsSchema>;
export type BlitzPricingProps = z.infer<typeof blitzPricingSchema>;
export type BlitzPricingPlansProps = z.infer<typeof blitzPricingPlansSchema>;
export type BlitzFAQProps = z.infer<typeof blitzFAQSchema>;
export type BlitzCTAProps = z.infer<typeof blitzCTASchema>;
export type BlitzFooterProps = z.infer<typeof blitzFooterSchema>;

// Shared schemas for Blitz will be added here
