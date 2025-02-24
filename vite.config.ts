/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    watch: false,
    include: ["./src/*.test.ts", "./src/*.test.tsx"],
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",
  },
});
