import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
/*
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //base: '/avisos-push/', // Base del proyecto en el servidor
})*/

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Carpeta de salida para la build
  },
  server: {
    port: 3000, // Puerto para desarrollo
  },
  preview: {
    port: 3000, // Puerto para preview en producción
  },
});
