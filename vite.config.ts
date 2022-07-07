import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
      }
    ]
  }
});
