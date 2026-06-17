import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: "/kingmidi/",
  plugins: [
    react(),
    mode === "analyze" &&
      visualizer({
        filename: "dist/bundle-stats.html",
        gzipSize: true,
        open: false,
        template: "treemap",
      }),
  ],
}));
