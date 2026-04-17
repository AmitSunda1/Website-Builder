import React, { useState } from "react";
import { useBuilderDispatch } from "../BuilderContext";

export function Onboarding() {
  const dispatch = useBuilderDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    industry: "",
    service: "",
    targetAudience: "",
    tone: "professional",
    sourceUrl: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { sourceUrl, ...formAnswers } = form;

    try {
      const res = await fetch("http://localhost:3001/project/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formAnswers, sourceUrl }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to initialize project");
      }

      dispatch({ type: "FINISH_ONBOARDING", projectId: data.projectId });
    } catch (err: unknown) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#0f0f13", color: "#e2e2f0", fontFamily: "sans-serif" }}>
      <div style={{ backgroundColor: "#14141a", padding: "40px", borderRadius: "12px", border: "1px solid #2a2a3a", width: "100%", maxWidth: "500px", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
        <h1 style={{ margin: "0 0 24px 0", fontSize: "24px", color: "#6366f1" }}>Initialize Project</h1>
        <p style={{ margin: "0 0 24px 0", fontSize: "14px", color: "#a0a0b8" }}>Tell us about your business. Our AI will automatically rewrite your website copy based on what you share here.</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <Field label="Industry / Niche">
            <input required type="text" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} placeholder="e.g. B2B SaaS, Coffee Shop, Digital Agency" style={inputStyle} />
          </Field>
          
          <Field label="Main Product / Service (1 sentence)">
            <input required type="text" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} placeholder="e.g. We build custom mechanical keyboards." style={inputStyle} />
          </Field>

          <Field label="Target Audience">
            <input type="text" value={form.targetAudience} onChange={(e) => setForm({ ...form, targetAudience: e.target.value })} placeholder="e.g. Software engineers, local families" style={inputStyle} />
          </Field>

          <Field label="Brand Tone">
            <select value={form.tone} onChange={(e) => setForm({ ...form, tone: e.target.value })} style={inputStyle}>
              <option value="professional">Professional & Direct</option>
              <option value="friendly">Friendly & Casual</option>
              <option value="luxury">Luxury & Premium</option>
              <option value="bold">Bold & Energetic</option>
            </select>
          </Field>

          <div style={{ height: "1px", backgroundColor: "#2a2a3a", margin: "8px 0" }} />

          <Field label="Existing Website URL (Optional, for AI Scraping)">
            <input type="url" value={form.sourceUrl} onChange={(e) => setForm({ ...form, sourceUrl: e.target.value })} placeholder="https://example.com" style={inputStyle} />
          </Field>

          {error && <div style={{ color: "#ef4444", fontSize: "13px", padding: "10px", backgroundColor: "#ef444415", borderRadius: "6px" }}>{error}</div>}

          <button disabled={loading} type="submit" style={{ marginTop: "12px", padding: "14px", backgroundColor: "#6366f1", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: loading ? "not-allowed" : "pointer", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {loading ? "Initializing..." : "Start Building →"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <label style={{ fontSize: "12px", fontWeight: "bold", color: "#c0c0d0", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  backgroundColor: "#0f0f13", border: "1px solid #2a2a3a", borderRadius: "6px", color: "#e2e2f0", fontSize: "14px", padding: "12px", outline: "none", width: "100%", boxSizing: "border-box", fontFamily: "inherit"
};
