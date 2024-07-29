import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // Use polling for file changes (useful for certain environments)
    },
  },
});
