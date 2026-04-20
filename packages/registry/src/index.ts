import { registry, ALLOWED_SECTION_TYPES } from "./registry";
import type { RegistryEntry } from "./registry";

// ─── getComponent helper ──────────────────────────────────────────────────────

/**
 * Returns the registry entry for a given section type.
 * Throws if the type is not in the registry (enforces strict section whitelist).
 */
export function getComponent(type: string): RegistryEntry {
  const entry = registry[type];
  if (!entry) {
    throw new Error(
      `[Registry] Unknown section type: "${type}". Allowed types: ${ALLOWED_SECTION_TYPES.join(", ")}`
    );
  }
  return entry;
}

/**
 * Validates and returns the section type if it is registered.
 * Returns null if the type is not found (non-throwing variant).
 */
export function findComponent(type: string): RegistryEntry | null {
  return registry[type] ?? null;
}

/**
 * Returns all registered section entries as an array of [id, entry] pairs.
 */
export function listComponents(): Array<[string, RegistryEntry]> {
  return Object.entries(registry);
}

// ─── Re-exports ───────────────────────────────────────────────────────────────

export { registry, ALLOWED_SECTION_TYPES, TEMPLATE_PRESETS } from "./registry";
export type { RegistryEntry, TemplateDefinition } from "./registry";
