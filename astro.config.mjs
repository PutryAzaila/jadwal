// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
site: 'https://putryazaila.github.io/jadwal-2026/',
base: '/jadwal'
  vite: {
    // cast: @tailwindcss/vite & astro sempat memakai salinan tipe Vite yang berbeda
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
