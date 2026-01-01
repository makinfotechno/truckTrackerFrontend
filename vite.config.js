import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import eslint from "vite-plugin-eslint";

export default defineConfig({
  plugins: [react(), tailwindcss(), eslint({
    failOnError: false,   // set true if you want build to FAIL on lint error
    failOnWarning: false,
  }),],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
