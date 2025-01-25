import { defineConfig } from "vite";
import { join } from "desm";

export default defineConfig({
  build: {
    lib: {
      entry: join(import.meta.url, "src/index.ts"),
      // outDir: join(import.meta.url, "lib"),
      name: "cv",
      fileName: "cv",
      formats: ["es", "cjs"],
    },
  },
});
