import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint(),
    // VitePWA({
    //   registerType: 'autoUpdate',
    //   injectRegister: 'auto',
    //   workbox: {
    //     globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
    //   },
    //   devOptions: { enabled: true },
    // }),
  ],
  server: {
    open: false,
    port: 3000,
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      {
        find: '@assets',
        replacement: fileURLToPath(new URL('./src/shared/assets', import.meta.url)),
      },
      { find: '@cmp', replacement: fileURLToPath(new URL('./src/shared/cmp', import.meta.url)) },
      {
        find: '@stores',
        replacement: fileURLToPath(new URL('./src/stores', import.meta.url)),
      },
      { find: '@use', replacement: fileURLToPath(new URL('./src/shared/use', import.meta.url)) },
    ],
  },

  //   esbuildOptions: {
  //     loader: {
  //       '.ts': 'tsx',
  //     },
  //   },
  // },
});
