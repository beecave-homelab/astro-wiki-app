import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import react from '@astrojs/react';

export default defineConfig({
  output: 'server', // Enable server-side rendering
  server: {
    host: '0.0.0.0',
    port: 4321
  },
  integrations: [tailwind(), mdx(), react()],
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
    ],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  vite: {
    assetsInclude: ['**/*.md']
  }
});