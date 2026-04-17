import type { ZodTypeAny } from "zod";
import {
  headerSchema,
  heroSchema,
  featuresSchema,
  testimonialsSchema,
  footerSchema,
} from "@website-builder/sections";

// ─── Registry Entry Type ───────────────────────────────────────────────────────

export interface RegistryEntry {
  /** The exported component name in the sections package */
  component: string;
  /** Import path used inside generated files */
  importPath: string;
  /** Zod schema for props validation */
  schema: ZodTypeAny;
  /** Human-readable display name for the builder UI */
  displayName: string;
  /** Short description for the builder UI */
  description: string;
  /** Section category */
  category: "layout" | "content" | "social" | "conversion";
  /** Default props pre-populated in the builder */
  defaultProps: Record<string, unknown>;
}

// ─── Registry Map ─────────────────────────────────────────────────────────────

export const registry: Record<string, RegistryEntry> = {
  "header-1": {
    component: "Header",
    importPath: "@/sections/header/Header",
    schema: headerSchema,
    displayName: "Header / Navigation",
    description: "Sticky top navigation bar with brand name and optional CTA button.",
    category: "layout",
    defaultProps: {
      title: "My Brand",
      showCTA: true,
      ctaText: "Get Started",
      ctaHref: "#",
      variant: "light",
    },
  },
  "hero-1": {
    component: "Hero",
    importPath: "@/sections/hero/Hero",
    schema: heroSchema,
    displayName: "Hero Section",
    description: "Full-width hero with headline, description, and CTA buttons.",
    category: "conversion",
    defaultProps: {
      headline: "Build Something Amazing",
      description: "The fastest way to launch your next product.",
      primaryCTAText: "Get Started",
      primaryCTAHref: "#",
      secondaryCTAText: "Learn More",
      secondaryCTAHref: "#",
      backgroundStyle: "gradient",
      align: "center",
    },
  },
  "features-1": {
    component: "Features",
    importPath: "@/sections/features/Features",
    schema: featuresSchema,
    displayName: "Features Grid",
    description: "Showcase your product features in a responsive grid layout.",
    category: "content",
    defaultProps: {
      heading: "Why Choose Us",
      subheading: "Everything you need to build, launch, and grow.",
      features: [
        { title: "Fast", description: "Blazing fast performance out of the box." },
        { title: "Secure", description: "Enterprise-grade security by default." },
        { title: "Scalable", description: "Grows with your business needs." },
      ],
      columns: "3",
      variant: "light",
    },
  },
  "testimonials-1": {
    component: "Testimonials",
    importPath: "@/sections/testimonials/Testimonials",
    schema: testimonialsSchema,
    displayName: "Testimonials",
    description: "Social proof section with customer quotes and ratings.",
    category: "social",
    defaultProps: {
      heading: "Loved by Thousands",
      subheading: "Don't just take our word for it.",
      testimonials: [
        { quote: "This changed how we build products.", name: "Sarah Kim", title: "CTO", company: "TechCorp", rating: 5 },
        { quote: "Incredibly intuitive and powerful.", name: "John Doe", title: "Founder", company: "StartupXYZ", rating: 5 },
      ],
      variant: "accent",
    },
  },
  "footer-1": {
    component: "Footer",
    importPath: "@/sections/footer/Footer",
    schema: footerSchema,
    displayName: "Footer",
    description: "Full-featured footer with links, social icons, and copyright.",
    category: "layout",
    defaultProps: {
      brandName: "My Brand",
      tagline: "Building the future, one commit at a time.",
      showYear: true,
      columns: [],
      socialLinks: [],
      variant: "dark",
    },
  },
};

// ─── Allowed Section Types (enforced constraint) ──────────────────────────────

export const ALLOWED_SECTION_TYPES = Object.keys(registry) as Array<keyof typeof registry>;
