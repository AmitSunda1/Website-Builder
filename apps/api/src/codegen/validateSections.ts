import { getComponent } from "@website-builder/registry";
import type { SectionConfig } from "../schemas/generate.schema";

/**
 * Validates all section props against their registry schemas.
 * Throws a descriptive error on any validation failure.
 * Returns the validated (typed) props per section.
 */
export function validateSections(sections: SectionConfig[]): Array<{ type: string; props: Record<string, unknown> }> {
  return sections.map((section, idx) => {
    const entry = getComponent(section.type); // throws if type is unregistered

    const result = entry.schema.safeParse(section.props);
    if (!result.success) {
      const issues = result.error.issues.map((i) => `  [${i.path.join(".")}] ${i.message}`).join("\n");
      throw new Error(`Section[${idx}] type="${section.type}" validation failed:\n${issues}`);
    }

    return { type: section.type, props: result.data as Record<string, unknown> };
  });
}
