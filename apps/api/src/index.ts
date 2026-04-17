import "dotenv/config";
import express from "express";
import cors from "cors";
import generateRouter from "./routes/generate";
import projectRouter from "./routes/project";
import mongoose from "mongoose";

const app = express();
const PORT = process.env["PORT"] ?? 3001;

// ─── Middleware ───────────────────────────────────────────────────────────────

app.use(
  cors({
    origin: process.env["CORS_ORIGIN"] ?? "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json({ limit: "2mb" }));

// ─── Health check ──────────────────────────────────────────────────────────────

app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use("/", generateRouter);
app.use("/project", projectRouter);

// ─── 404 ──────────────────────────────────────────────────────────────────────

app.use((_req, res) => {
  res.status(404).json({ status: "error", message: "Not found" });
});

// ─── DB & Start ───────────────────────────────────────────────────────────────

async function main() {
  if (process.env.MONGO_URI) {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("📦 Connected to MongoDB");
    } catch (err) {
      console.error("❌ MongoDB connection error:", err);
    }
  } else {
    console.warn("⚠ No MONGO_URI provided in .env");
  }

  app.listen(PORT, () => {
    console.log(`\n🚀 Website Builder API running at http://localhost:${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/health`);
    console.log(`   Generate: POST http://localhost:${PORT}/generate\n`);
  });
}

main();
