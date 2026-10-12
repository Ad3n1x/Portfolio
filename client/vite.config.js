import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Vercel serves from the domain root; GitHub Pages serves this repo under /Portfolio/.
  base: process.env.GITHUB_PAGES === "true" ? "./" : "/",
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  }
});
