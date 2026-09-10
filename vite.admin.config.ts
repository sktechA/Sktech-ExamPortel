import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

/**
 * Vite Configuration for Vercel Project 2: Admin App (sktech-exam-admin.vercel.app)
 * Bundles exclusively the administrative console, question bank CRUD, and pricing controls.
 */
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'admin.html'),
        },
      },
    },
  };
});
