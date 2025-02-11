import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import mdx from "@astrojs/mdx";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://dev.jeffercbs.tech/",
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap(), icon(), mdx(), preact()],
  redirects: {
    "/en/projects/[...slug]": "/projects/[...slug]",
    "/en/blog/p/[...slug]": "/blog/p/[...slug]",
    "/en/blog": "/blog",
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});