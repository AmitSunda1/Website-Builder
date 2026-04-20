# Website Builder v2 - Comprehensive Project Overview

## 🏗 Architecture Overview

Website Builder v2 is a high-fidelity, modular, full-stack monorepo designed to automate the creation of production-ready React applications. Structured with **Turborepo**, it bridges the gap between low-code visual editors and professional developer environments.

The system is optimized for **context-aware generation**, where user input and scraped business data are processed via **AI (Google Gemini)** to hydrate components with realistic, high-converting content.

---

## 📂 Project Structure

### 1. Apps (Core Execution)

#### 🚀 `apps/builder` (React / Vite)
The visual command center where users architect their sites.
- **Onboarding Flow**: captures business context and industry data to guide the AI hydration engine.
- **State Engine (`BuilderContext.tsx`)**:
  - Centralized store using React Context + `useReducer`.
  - Manages `SectionInstance` arrays, theme overrides, and deployment state.
  - **Persistence**: Auto-syncs to `localStorage` for session recovery.
- **Intelligent Prop Editor**: 
  - Uses Zod schemas from the `registry` package to dynamically generate UI forms.
  - Supports complex types: Boolean toggles, String inputs, Enum dropdowns, and Array/JSON editors.
- **Live Preview Pane**: Renders a real-time, responsive view of the target site using the shared components from `packages/sections`.

#### 🔌 `apps/api` (Node.js / Express / Mongoose)
The "Brain" of the operation, handling logic, AI, and deployment.
- **Persistence Layer**: Integrated with **MongoDB** via Mongoose.
  - **`Project` Model**: Stores `projectId`, form answers, raw scraped data, and processed image assets.
- **AI Hydration (`hydrateContent.ts`)**:
  - Leverages **Gemini Flash-Latest** to transform generic placeholder data into industry-specific copy.
  - Maps scraped images from source URLs directly into section props using semantic matching.
- **Codegen Pipeline**:
  - **Resolution Engine**: Dynamically resolves entry points (`App.tsx`, `index.tsx`), style files (`theme.css`, `globals.css`), and path aliases based on the selected **Template Preset**.
  - **AST Construction**: Builds optimized React code using valid Zod-proven payloads.
  - **Asset Patching**: Injects custom `packages/sections` and `packages/ui` source directly into the generated workspace to ensure zero-dependency portability.

---

### 2. Packages (Shared Logic)

#### 🗺 `packages/registry`
The configuration directory mapping technical IDs to visual interfaces.
- Defines **Section Families** (hero, features, faq, etc.) and **Template Presets** (Core, Authentimate, Blitz Clone, Web Cohort).
- Maps each ID (e.g., `hero-2`) to its component, import path, Zod schema, and default props.

#### 🧱 `packages/sections`
A library of heavily parameterized, theme-aware React components.
- Organized by family (e.g., `src/header`, `src/hero`).
- Each section includes a strict `schema.ts` defining its interface, ensuring consistency between the builder UI and the generated code.

#### 🎨 `packages/theme`
The Design System.
- Defines core tokens for Colors, Spacing, Typography, and Shadows.
- **Generator**: Includes `generateCSSVariables.ts` to transform design JSON into CSS Custom Properties (`--var`) used across all components.

#### 🛠 `packages/ui`
Atomic primitives (Buttons, Inputs, Containers) that form the foundation of higher-level sections.

---

### 3. Templates & Scaffolds

#### 🏗 `templates/starter`
The primary Vite + React boilerplate used as the foundation for most generated sites.

#### 🧪 `dummy-templates`
Specialized blueprints used for high-fidelity clones and specific UI layouts:
- **`blitz-clone`**: A Next.js-inspired landing page layout.
- **`Web-Cohort`**: A structured layout for educational or membership-based cohorts.

---

## 🔄 Lifecycle Data Flow

1. **Context Discovery**: User completes onboarding; API scrapes source URLs (if provided).
2. **AI Synthesis**: Gemini processes the context to create an **Abstract Design Payload**, choosing images and writing copy.
3. **Visual Curation**: User modifies the design in the Builder UI via Zod-generated forms.
4. **Code Compilation**: 
   - Backend creates a temporary OS workspace.
   - Foundation scaffold is copied based on the **Template Preset**.
   - Code is generated, theme variables injected, and shared packages are patched in.
5. **Deployment**:
   - Repository is initialized via `simple-git`.
   - New repository is minted on GitHub via **Octokit**.
   - Code is pushed to `main`, ready for production.

---

## 🛠 Tech Stack Snapshot

- **Monorepo**: Turborepo, npm Workspaces.
- **Frontend**: React 18, Vite, Context/State API, Zod.
- **AI Engine**: Google Generative AI (Gemini Flash).
- **Backend**: Node.js, Express, MongoDB (Atlas/Local), Mongoose.
- **DevOps/Git**: simple-git, Octokit, fs-extra, UUID.
- **Styling**: Vanilla CSS with Design Tokens (Scoped Variables).

