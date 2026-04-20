import { Router, type Request, type Response } from "express";
import { v4 as uuidv4 } from "uuid";
import fse from "fs-extra";
import path from "node:path";
import os from "node:os";
import simpleGit from "simple-git";
import { Octokit } from "@octokit/rest";

import { generateRequestSchema } from "../schemas/generate.schema";
import { validateSections } from "../codegen/validateSections";
import { generatePage } from "../codegen/generatePage";
import { injectTheme } from "../codegen/injectTheme";

const router = Router();

// ─── Resolve paths relative to the monorepo root ──────────────────────────────

// When running via tsx in the monorepo, __dirname is apps/api/src/routes
// so we walk up to monorepo root: 4 levels up
const MONOREPO_ROOT = path.resolve(__dirname, "../../../../");
const TEMPLATES_STARTER = path.join(MONOREPO_ROOT, "templates", "starter");
const DUMMY_BLITZ_CLONE = path.join(
  MONOREPO_ROOT,
  "dummy-templates",
  "blitz-clone",
);
const DUMMY_WEB_COHORT = path.join(
  MONOREPO_ROOT,
  "dummy-templates",
  "Web-Cohort",
);
const PACKAGES_SECTIONS = path.join(
  MONOREPO_ROOT,
  "packages",
  "sections",
  "src",
);
const PACKAGES_UI = path.join(MONOREPO_ROOT, "packages", "ui", "src");

function resolveTemplateScaffold(templatePreset: string): string {
  switch (templatePreset) {
    case "blitz-clone":
      return DUMMY_BLITZ_CLONE;
    case "web-cohort":
      return DUMMY_WEB_COHORT;
    case "starter":
    case "authantimate":
    default:
      return TEMPLATES_STARTER;
  }
}

function resolveTemplateEntryPoint(templatePreset: string): string {
  switch (templatePreset) {
    case "blitz-clone":
      return path.join("src", "app", "page.tsx");
    case "web-cohort":
      return path.join("src", "App.tsx");
    case "starter":
    case "authantimate":
    default:
      return path.join("src", "pages", "index.tsx");
  }
}

function resolveTemplateThemeFile(templatePreset: string): string {
  switch (templatePreset) {
    case "blitz-clone":
      return path.join("src", "app", "globals.css");
    case "web-cohort":
      return path.join("src", "index.css");
    case "starter":
    case "authantimate":
    default:
      return path.join("src", "styles", "theme.css");
  }
}

async function patchWebCohortAliases(workspaceDir: string) {
  const viteConfig = `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/sections": fileURLToPath(new URL("./src/sections", import.meta.url)),
      "@/ui": fileURLToPath(new URL("./src/ui", import.meta.url)),
    },
  },
});
`;

  const tsconfigApp = `{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/sections/*": ["./src/sections/*"],
      "@/ui/*": ["./src/ui/*"]
    }
  },
  "include": ["src"]
}
`;

  await fse.outputFile(
    path.join(workspaceDir, "vite.config.ts"),
    viteConfig,
    "utf-8",
  );
  await fse.outputFile(
    path.join(workspaceDir, "tsconfig.app.json"),
    tsconfigApp,
    "utf-8",
  );
}

// ─── POST /generate ────────────────────────────────────────────────────────────

router.post("/generate", async (req: Request, res: Response) => {
  // 1. Parse & validate top-level request schema
  const parseResult = generateRequestSchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      status: "error",
      message: "Invalid request body",
      issues: parseResult.error.issues,
    });
    return;
  }

  const { projectName, repoName, config, githubToken, githubOwner, projectId } =
    parseResult.data;
  const templatePreset = config.templatePreset ?? "starter";

  // 2. Validate section props against per-section schemas
  let validatedSections: Array<{
    type: string;
    props: Record<string, unknown>;
  }>;
  try {
    validatedSections = validateSections(config.sections);
  } catch (err: unknown) {
    res.status(422).json({
      status: "error",
      message: "Section validation failed",
      detail: (err as Error).message,
    });
    return;
  }

  // 3. Create temp workspace
  const workspaceId = uuidv4();
  const workspaceDir = path.join(os.tmpdir(), `wb-project-${workspaceId}`);

  try {
    // 4. Copy starter template
    await fse.ensureDir(workspaceDir);
    await fse.copy(resolveTemplateScaffold(templatePreset), workspaceDir, {
      overwrite: true,
    });

    if (templatePreset === "web-cohort") {
      await patchWebCohortAliases(workspaceDir);
    }

    // 5. Copy packages/sections + packages/ui into the workspace
    await fse.copy(
      PACKAGES_SECTIONS,
      path.join(workspaceDir, "src", "sections"),
      { overwrite: true },
    );
    await fse.copy(PACKAGES_UI, path.join(workspaceDir, "src", "ui"), {
      overwrite: true,
    });

    // 6. Generate page file
    const pageContent = generatePage(validatedSections);
    await fse.outputFile(
      path.join(workspaceDir, resolveTemplateEntryPoint(templatePreset)),
      pageContent,
      "utf-8",
    );

    // 7. Inject theme CSS
    const themeCSS = injectTheme(config.theme);
    const themeFile = path.join(
      workspaceDir,
      resolveTemplateThemeFile(templatePreset),
    );
    if (templatePreset === "starter" || templatePreset === "authantimate") {
      await fse.outputFile(themeFile, themeCSS, "utf-8");
    } else {
      await fse.appendFile(themeFile, `\n\n${themeCSS}`, "utf-8");
    }

    // 8. Write package.json with project name
    const pkgJson = (await fse.readJson(
      path.join(workspaceDir, "package.json"),
    )) as Record<string, unknown>;
    pkgJson["name"] = projectName;
    await fse.writeJson(path.join(workspaceDir, "package.json"), pkgJson, {
      spaces: 2,
    });

    // 9. GitHub integration
    let repoUrl = `local://${workspaceDir}`;

    const finalGithubToken = githubToken || process.env.GITHUB_TOKEN;

    if (finalGithubToken && githubOwner) {
      try {
        // Init git
        const git = simpleGit(workspaceDir);
        await git.init();
        await git.addConfig("user.email", "builder@website-builder-v2.local");
        await git.addConfig("user.name", "Website Builder v2");
        await git.add(".");
        await git.commit("Initial commit — generated by Website Builder v2");

        // Create GitHub repo
        const octokit = new Octokit({ auth: finalGithubToken });
        const { data: repo } = await octokit.repos.createForAuthenticatedUser({
          name: repoName,
          private: false,
          description: `Generated by Website Builder v2 — ${projectName}`,
          auto_init: false,
        });

        repoUrl = repo.html_url;

        // Push
        await git.addRemote(
          "origin",
          `https://${finalGithubToken}@github.com/${githubOwner}/${repoName}.git`,
        );
        await git.push("origin", "main", ["--set-upstream"]);
      } catch (gitErr: unknown) {
        // GitHub push failed — still return local success
        console.error(
          "[generate] GitHub push failed:",
          (gitErr as Error).message,
        );
        repoUrl = `local://${workspaceDir}`;
      }
    }

    res.status(200).json({
      status: "created",
      repoUrl,
      projectId: projectId || workspaceId,
      workspaceDir,
      sectionsCount: validatedSections.length,
    });
  } catch (err: unknown) {
    // Cleanup on error
    await fse.remove(workspaceDir).catch(() => undefined);
    console.error("[generate] Pipeline error:", err);
    res.status(500).json({
      status: "error",
      message: "Code generation failed",
      detail: (err as Error).message,
    });
  }
});

export default router;
