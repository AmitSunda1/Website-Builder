import { defineConfig } from "vite";
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
