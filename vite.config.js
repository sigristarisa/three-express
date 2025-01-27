import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/client/main.js"), // Entry point
      }
    },
  },
  assetsInclude: ["**/*.ejs"],
})
