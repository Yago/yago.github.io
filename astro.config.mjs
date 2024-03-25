import vercel from '@astrojs/vercel/static';
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import alpinejs from "@astrojs/alpinejs";
import clickDirective from './directives/astro-click-directive/register.js'

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'night-owl',
      langs: ['apache', 'bash', 'css', 'html', 'javascript', 'js', 'json', 'jsx', 'markdown', 'php', 'ruby', 'scss', 'shell', 'typescript'],
      wrap: false,
      transformers: [],
    },
  },
  server: {
    port: 3000,
    host: true
  },
  integrations: [tailwind(), mdx(), alpinejs(), react(), clickDirective()],
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      domains: ['yago.io'],
      sizes: [256, 384, 640, 750, 828, 1080, 1200, 1920, 2560],
      formats: ['image/avif']
    }
  })
});