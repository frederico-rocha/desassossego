import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  // Prebundle React and the root providers together so adding a UI primitive
  // cannot leave an open preview mixing old and newly optimized React chunks.
  optimizeDeps: {
    include: [
      "react", "react-dom", "react-dom/client", "react/jsx-runtime",
      "@radix-ui/react-tooltip", "@radix-ui/react-dialog",
      "@radix-ui/react-toast", "@radix-ui/react-slot",
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
