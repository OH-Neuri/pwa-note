import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  server: {
    port: 5173, // ← 이 값을 5713으로 바꿔주세요
    host: '0.0.0.0', // ← 이것도 명시적으로 설정해 주세요
  },
  build: {
    sourcemap: true,
    assetsDir: 'code',
    target: ['esnext'],
    cssMinify: true,
    lib: false,
  },
  plugins: [
    VitePWA({
      strategies: 'injectManifest',
      injectManifest: {
        swSrc: 'public/sw.js',
        swDest: 'dist/sw.js',
        globDirectory: 'dist',
        globPatterns: ['**/*.{html,js,css,json,png}'],
      },
      injectRegister: false,
      manifest: false,
      devOptions: {
        enabled: true,
      },
    }),
  ],
});

