import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { blockInjectedContent } from "./src/plugins/block-injected-content";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    blockInjectedContent(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
