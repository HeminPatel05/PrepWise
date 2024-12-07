import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ProxyOptions } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/flashcards": {
        target: "http://localhost:3000", // Backend API endpoint
        changeOrigin: true, // Handle CORS by making the backend think the request originates from the same server
        rewrite: (path: string) => path.replace(/^\/flashcards/, "/flashcards"), // Optional: Rewrite the path if needed
      } as ProxyOptions,
      "/api": {
        target: "http://localhost:3000", // Same backend API endpoint
        changeOrigin: true, // Handle CORS
        rewrite: (path: string) => path.replace(/^\/api\/users/, "/api"), // Optional rewrite
      } as ProxyOptions,
    },
  },
});
