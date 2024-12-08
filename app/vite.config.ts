import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ProxyOptions } from "vite";
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate', // Automatically updates the service worker
      manifest: {
        name: 'GRE Test Prep',
        short_name: 'GRE Prep',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#4a90e2',
        icons: [
          {
            src: 'icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      devOptions: {
        enabled: true, // Enables PWA functionality in development mode
      },
    }),
  ],
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
