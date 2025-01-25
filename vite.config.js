import { defineConfig } from "vite";
import { join } from "desm";

export default defineConfig({
  build: {
    lib: {
      entry: join(import.meta.url, "src/index.ts"),
      name: "cv",
      fileName: "bundle",
      formats: ["es", "cjs"],
    },
  },
});
