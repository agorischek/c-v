import { join } from 'desm';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: join(import.meta.url, 'src/index.ts'),
      name: 'cv',
      fileName: 'cv',
      formats: ['es', 'cjs'],
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
});
