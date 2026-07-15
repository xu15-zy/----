import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps all asset URLs relative so the built site works whether it is
// served from the domain root or a sub-folder (e.g. a CloudStudio sandbox).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { host: true, port: 5173, strictPort: false },
  build: { outDir: 'dist', emptyOutDir: true },
});
