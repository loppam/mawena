import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['html2canvas'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
