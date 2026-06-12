// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';

// Panel admina (Keystatic) działa tylko w trybie dev (npm run dev).
// Produkcyjny build jest w 100% statyczny.
const enableKeystatic = process.env.KEYSTATIC === 'true';

export default defineConfig({
  site: 'https://kajetan.ciunelis.com',
  integrations: [
    react(),
    markdoc(),
    ...(enableKeystatic ? [keystatic()] : []),
    sitemap({
      filter: (page) => !page.includes('/cv/') && !page.includes('.html'),
    }),
  ],
  // Stare URL-e Quarto (strony jako pliki .html) → nowe katalogowe.
  // Chroni pozycje w Google po migracji hostingu.
  redirects: {
    '/blog.html': '/blog/',
    '/publications.html': '/publications/',
    '/poetry.html': '/poetry/',
    '/en/blog.html': '/en/blog/',
    '/en/publications.html': '/en/publications/',
    '/en/poetry.html': '/en/poetry/',
  },
});
