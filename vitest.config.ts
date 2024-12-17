import { defineConfig } from 'vitest/config'
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true, // Use global test APIs (e.g., `describe`, `it`, etc.)
    environment: "jsdom", // Simulate a browser environment
    setupFiles: ["./src/setupTests.ts"], // Add setup file for Vitest
    coverage: {
      provider: 'istanbul'
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})