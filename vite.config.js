// vite.config.js
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./", // 👈 rutas relativas en lugar de absolutas
  build: {
    chunkSizeWarningLimit: 1000, // 👈 ajusta el límite en KB
  },
});
