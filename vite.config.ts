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
        find: "@components",
        replacement: path.resolve(__dirname, "src/components")
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
        find: "@store",
        replacement: path.resolve(__dirname, "src/store")
      },
      {
        find: "@api",
        replacement: path.resolve(__dirname, "src/api")
      }
    ]
  }
});
