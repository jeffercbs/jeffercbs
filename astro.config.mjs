import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { remarkReadingTime } from "./remark-reading-time.mjs";
import siteConfig from './src/data/site-config';

import icon from 'astro-icon';

import vercel from '@astrojs/vercel';

export default defineConfig({
    site: siteConfig.website,

    vite: {
        plugins: [tailwindcss()]
    },
    markdown: {
        rehypePlugins: [remarkReadingTime]
    },

    integrations: [mdx({
        remarkPlugins: [remarkReadingTime],

    }), sitemap(), icon()],
    adapter: vercel({
        webAnalytics: {
            enabled: true,
        },
    })
});