import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://dev.jeffercbs.tech/",
  integrations: [sitemap(), tailwind(), icon(), mdx()],
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