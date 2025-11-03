// ======================================================
// ARCHIVO: vite.config.js
// ======================================================
import { defineConfig } from 'vite';

export default defineConfig({
  // Al no especificar 'root', Vite usará la raíz del proyecto por defecto.
  build: {
    // Los archivos de producción irán a una carpeta 'dist' en la raíz.
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    host: 'localhost',
    port: 80, // Puedes usar el puerto que prefieras
    open: true, // Abrirá el navegador automáticamente
  }
});