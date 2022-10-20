import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";
import * as path from "path";
// @ts-ignore
import { dependencies } from "./package.json";

function renderChunks(deps: Record<string, string>) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (["react", "react-router-dom", "react-dom"].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://goat-dev.plan4better.de/api/v1",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  plugins: [
    react(),
    viteCompression({
      ext: ".br",
      algorithm: "brotliCompress"
    })
  ],
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-router-dom", "react-dom"],
          ...renderChunks(dependencies)
        }
      }
    },
    target: "es2021",
    cssTarget: "chrome80",
    brotliSize: false,
    chunkSizeWarningLimit: 1000
  },
  resolve: {
    alias: [
      {
        find: "@types",
        replacement: path.resolve(__dirname, "src/types")
      },
      {
        find: "@common",
        replacement: path.resolve(__dirname, "src/common")
      },
      {
        find: "@assets",
        replacement: path.resolve(__dirname, "src/assets")
      },
      {
        find: "@utils",
        replacement: path.resolve(__dirname, "src/utils")
      },
      {
        find: "@pages",
        replacement: path.resolve(__dirname, "src/pages")
      },
      {
        find: "@styles",
        replacement: path.resolve(__dirname, "src/styles")
      },
      {
        find: "@context",
        replacement: path.resolve(__dirname, "src/context")
      },
      {
        find: "@api",
        replacement: path.resolve(__dirname, "src/api")
      },
      {
        find: "@hooks",
        replacement: path.resolve(__dirname, "src/hooks")
      },
      {
        find: "@resources",
        replacement: path.resolve(__dirname, "src/resources")
      }
    ]
  },
  define: {
    "process.env": process.env
  }
});
