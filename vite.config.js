import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Remove the direct process.env reference
  define: {
    'import.meta.env': 'import.meta.env',
  },
});