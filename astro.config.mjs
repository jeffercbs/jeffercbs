import { defineConfig } from "astro/config";

import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import auth from "auth-astro";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  site: "https://jeffercbs.tech/",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap(),
    icon(),
    mdx(),
    preact({ compat: true, devtools: true }),
    db(),
    auth(),
  ],

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

  adapter: vercel(),
});
