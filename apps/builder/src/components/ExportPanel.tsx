import React, { useState } from "react";
import { useBuilderState, useBuilderDispatch } from "../BuilderContext";
import type { GenerateResponse } from "../types";

export function ExportPanel() {
  const state = useBuilderState();
  const dispatch = useBuilderDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isHydrating, setIsHydrating] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (state.sections.length === 0) {
      setError("Add at least one section before generating.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const body = {
        projectName: state.projectName,
        repoName: state.repoName,
        config: {
          templatePreset: state.templatePreset,
          sections: state.sections.map((s) => ({
            type: s.type,
            props: s.props,
          })),
          theme: state.theme,
        },
        projectId: state.projectId,
        ...(state.githubToken && { githubToken: state.githubToken }),
        ...(state.githubOwner && { githubOwner: state.githubOwner }),
      };

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = (await res.json()) as GenerateResponse;
      if (!res.ok) {
        throw new Error(data.detail ?? data.message ?? "Generation failed");
      }
      setResult(data);
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleHydrate = async () => {
    if (!state.projectId) {
      setError("No project AI context found. Did you complete onboarding?");
      return;
    }
    if (state.sections.length === 0) {
      setError("Add at least one section to hydrate.");
      return;
    }

    setIsHydrating(true);
    setError(null);

    try {
      const res = await fetch("/api/project/hydrate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: state.projectId,
          sections: state.sections.map((s) => ({
            type: s.type,
            props: s.props,
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message ?? "Hydration failed");
      }

      dispatch({ type: "HYDRATE_SECTIONS", sections: data.sections });
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setIsHydrating(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div>
        <h3
          style={{
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#6b7280",
            margin: "0 0 8px 0",
          }}
        >
          Project Settings
        </h3>
      </div>

      {/* Project Name */}
      <Field label="Project Name" id="project-name">
        <input
          id="project-name"
          type="text"
          value={state.projectName}
          onChange={(e) =>
            dispatch({ type: "SET_PROJECT_NAME", name: e.target.value })
          }
          placeholder="my-website"
          style={inputStyle}
        />
      </Field>

      {/* Repo Name */}
      <Field label="GitHub Repo Name" id="repo-name">
        <input
          id="repo-name"
          type="text"
          value={state.repoName}
          onChange={(e) =>
            dispatch({ type: "SET_REPO_NAME", name: e.target.value })
          }
          placeholder="my-website"
          style={inputStyle}
        />
      </Field>
      <Field label="Template Shell" id="template-shell">
        <select
          id="template-shell"
          value={state.templatePreset}
          onChange={(e) =>
            dispatch({
              type: "SET_TEMPLATE_PRESET",
              preset: e.target.value as typeof state.templatePreset,
            })
          }
          style={inputStyle}
        >
          <option value="starter">Starter</option>
          <option value="authantimate">AuthentiMATE</option>
          <option value="blitz-clone">Blitz Clone</option>
          <option value="web-cohort">Web Cohort</option>
        </select>
      </Field>

      {/* GitHub section */}
      <div
        style={{
          padding: "16px",
          backgroundColor: "#1a1a24",
          borderRadius: "8px",
          border: "1px solid #2a2a3a",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            fontWeight: 700,
            color: "#6b7280",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "12px",
          }}
        >
          GitHub Integration (optional)
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Field label="GitHub Owner" id="gh-owner">
            <input
              id="gh-owner"
              type="text"
              value={state.githubOwner}
              onChange={(e) =>
                dispatch({ type: "SET_GITHUB_OWNER", owner: e.target.value })
              }
              placeholder="username or org"
              style={inputStyle}
            />
          </Field>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#ef444415",
            border: "1px solid #ef444440",
            borderRadius: "8px",
            fontSize: "12px",
            color: "#fca5a5",
            lineHeight: "1.5",
          }}
        >
          ⚠ {error}
        </div>
      )}

      {/* Success */}
      {result && (
        <div
          style={{
            padding: "16px",
            backgroundColor: "#22c55e15",
            border: "1px solid #22c55e40",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#4ade80" }}>
            ✓ Generated successfully!
          </div>
          <div style={{ fontSize: "11px", color: "#6b7280" }}>
            {result.sectionsCount} section
            {(result.sectionsCount ?? 0) > 1 ? "s" : ""} • Project:{" "}
            {state.projectName}
          </div>
          {result.repoUrl && !result.repoUrl.startsWith("local://") && (
            <a
              href={result.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "12px",
                color: "#6366f1",
                textDecoration: "none",
                wordBreak: "break-all",
              }}
            >
              {result.repoUrl} ↗
            </a>
          )}
          {result.workspaceDir && (
            <code
              style={{
                fontSize: "10px",
                color: "#6b7280",
                wordBreak: "break-all",
              }}
            >
              {result.workspaceDir}
            </code>
          )}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {/* Hydrate button */}
        {state.projectId && (
          <button
            id="hydrate-btn"
            onClick={() => void handleHydrate()}
            disabled={isHydrating || isLoading || state.sections.length === 0}
            style={{
              padding: "14px",
              backgroundColor:
                state.sections.length === 0 ? "#2a2a3a" : "#22c55e",
              color: state.sections.length === 0 ? "#4a4a6a" : "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontSize: "14px",
              fontWeight: 700,
              cursor: state.sections.length === 0 ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {isHydrating ? (
              <>
                <Spinner /> Enhancing Content with AI...
              </>
            ) : (
              <>✨ Preview AI Enhanced Content</>
            )}
          </button>
        )}

        {/* Generate button */}
        <button
          id="generate-btn"
          onClick={() => void handleGenerate()}
          disabled={isLoading || isHydrating || state.sections.length === 0}
          style={{
            padding: "14px",
            backgroundColor:
              state.sections.length === 0 ? "#2a2a3a" : "#6366f1",
            color: state.sections.length === 0 ? "#4a4a6a" : "#ffffff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: state.sections.length === 0 ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {isLoading ? (
            <>
              <Spinner /> Generating project…
            </>
          ) : (
            <>🚀 Export & Deploy</>
          )}
        </button>
      </div>

      <p
        style={{
          fontSize: "11px",
          color: "#4a4a6a",
          textAlign: "center",
          lineHeight: "1.5",
        }}
      >
        Creates a local Vite project. With GitHub credentials, also creates a
        repo and pushes.
      </p>
    </div>
  );
}

function Field({
  label,
  id,
  children,
}: {
  label: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label
        htmlFor={id}
        style={{
          fontSize: "11px",
          fontWeight: 600,
          color: "#a0a0b8",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <span
      style={{
        width: "14px",
        height: "14px",
        border: "2px solid rgba(255,255,255,0.3)",
        borderTopColor: "#ffffff",
        borderRadius: "50%",
        display: "inline-block",
        animation: "spin 0.6s linear infinite",
      }}
    />
  );
}

const inputStyle: React.CSSProperties = {
  backgroundColor: "#0f0f13",
  border: "1px solid #2a2a3a",
  borderRadius: "6px",
  color: "#e2e2f0",
  fontSize: "13px",
  padding: "8px 10px",
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
};
