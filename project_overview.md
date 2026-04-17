# Website Builder v2 - Detailed Project Overview

## 🏗 Architecture Overview

Website Builder v2 is a modern, modular, full-stack monorepo application structured using **Turborepo**. It is designed to provide a highly customizable visual website-building experience with dynamic form generation, a live preview environment, and a dedicated backend for generating and deploying the final code.

The project is split into two main contexts: **Apps** (executable applications) and **Packages** (shared libraries and components).

---

## 📂 Project Structure Dive

### Apps

#### 1. `apps/builder` (React / Vite)
The visual frontend application where the user designs their website.

**Deep Dive - Core Mechanisms:**
- **State Management (`BuilderContext.tsx`)**:
  - Leverages React's `useReducer` and the Context API as a central store (`BuilderProvider`).
  - The state (`BuilderState`) tracks an array of active `SectionInstance` objects (with distinct UUIDs), dynamic theme overrides, tab routing states, and GitHub integration variables.
  - Automatically persists the builder state to `localStorage` to preserve progress across reloads.
- **Dynamic Prop Editor (`PropEditor.tsx`)**:
  - Introspects Zod schemas provided by the `registry` package to dynamically generate form fields.
  - Intercepts `schema._def.shape` to render corresponding UI components for `ZodBoolean` (checkboxes), `ZodString` (text inputs), `ZodEnum` (dropdowns), and `ZodArray` (JSON editing textareas).
- **Builder Interface**:
  - **Left Sidebar**: Panel switching mechanism for **Sections** (adding/reordering/modifying layout chunks), **Theme** (custom styling), and **Export** (GitHub payload delivery).
  - **Live Preview Pane**: Renders a live view of the layout at a simulated 1440px desktop breakpoint using the current Context state.

#### 2. `apps/api` (Node.js / Express)
The backend service responsible for compiling the visual configuration into a robust, standalone React codebase.

**Deep Dive - Code Generation Pipeline (`generate.ts` & `/codegen`):**
- **Endpoint validation**: Validates the incoming design payload against strict schemas (e.g. `generateRequestSchema` and individual section schemas) to ensure safe execution.
- **AST / Code Construction (`generatePage.ts`)**:
  - Dynamically builds the `src/pages/index.tsx` file for the resulting app.
  - Scans required sections and dynamically aggregates correct import paths.
  - Employs a custom `serializeProps` function that safeguards scalar mapping—converting numbers, booleans, and nested plain objects/arrays cleanly while avoiding dangerous function injections.
- **Theming Injection (`injectTheme.ts`)**:
  - Merges user overrides with `defaultTheme.ts`.
  - Transpiles the finalized design tokens into standard CSS variables globally injected into `theme.css`.
- **Git & GitHub Integration**:
  - Copies `templates/starter` to an OS temp directory, patches in `packages/sections` and `packages/ui`, and writes compilation results.
  - Uses `simple-git` to initialize the directory and `octokit` to mint an open repository on GitHub.
  - Seamlessly forces a `main` upstream push to deliver a deployed codebase back to the user.

---

### Packages

#### 1. `packages/registry`
The central brain of the page structural layout mapping.

**Deep Dive:**
- Defines the `registry.ts` configuration, effectively associating an internal ID (e.g., `hero-1`) with:
  - The literal React UI Component mapping.
  - Its exact import path required inside the generated starter code (`importPath`).
  - The `Zod` validation schema mapped directly to the component's TypeScript `props` interface.
  - Sensibly populated `defaultProps` so adding new components places completely filled out representations on-screen natively.

#### 2. `packages/sections`
The granular visual components users can pick from.
- Includes heavily parameterized layout sections: `Header`, `Hero`, `Features`, `Testimonials`, and `Footer`.
- Each section encapsulates its layout constraints and tightly couples to a Zod schema defining the interface of its customizable attributes (e.g. `heroSchema`).

#### 3. `packages/theme`
The core design system.
- Implements `ColorTokens`, `TypographyTokens`, `SpacingTokens`, `BorderTokens`, and `ShadowTokens`.
- Provides a robust generator (`generateCSSVariables.ts`) utilized to flip JSON theme objects into highly cascade-friendly `--var` CSS logic.

#### 4. `packages/ui`
Atomic elements utilized heavily by components in `packages/sections`.
- Exposes primitive foundation layouts like `Button.tsx`, `Container.tsx`, and `Input.tsx`.

---

### Templates

#### 1. `templates/starter` (React / Vite)
A purely functional Vite boilerplate that acts as the starting canvas.
- Stripped-down Vite shell providing only React and ReactDOM.
- During export, the backend moves this scaffold into a temporary zone, embeds the parsed structural data from `BuilderState` into new `start/src` assets, edits the `package.json` with the new module name, and acts as the literal repository structure pushed to GitHub.

---

## 🔄 Lifecycle Data Flow

1. **Introspection Payload** ➔ The UI queries `registry` to build its dragging panels.
2. **Abstract Syntax Building** ➔ A user manipulates Zod-defined objects via form handlers (`PropEditor`), dispatching state payloads to `useReducer` and pushing Live Preview updates.
3. **Payload Escaping** ➔ On hitting "Generate", stringified JSON representation of `[ComponentID, StateVars]` ships over `POST /generate`.
4. **Compilation** ➔ `express` drops payload variables into physical `fs-extra` manipulations arrayed across Vite files (JSX translation, theme processing).
5. **Upstream Commit** ➔ Code generation ends, turning temp artifacts into a committed Git repository pushed via Octokit API.

---

## 🛠 Tech Stack Snapshot

- **Monorepo**: Turborepo, nested npm workspaces.
- **Frontend App**: React 18, Vite, `@dnd-kit` (List/Drop actions), React Context.
- **Type Safety**: TypeScript, `Zod` (Data-to-UI formulation logic, API payload security).
- **Backend App**: Node.js, Express, `tsx` for execution.
- **OS/Git Operations**: `fs-extra` (FileSystem generation), `simple-git`, `@octokit/rest` (GitHub APIs), `uuid` (session state scoping).
