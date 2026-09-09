// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://jadwal-2026.local',
  vite: {
    // cast: @tailwindcss/vite & astro sempat memakai salinan tipe Vite yang berbeda
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
