import { defineConfig } from "astro/config";

import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import auth from "auth-astro";

import vercel from "@astrojs/vercel";
import markdownConfig from "./mardown.config";

// https://astro.build/config
export default defineConfig({
  site: "https://jeffercbs.tech/",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap(),
    icon(),
    mdx({
      gfm: false,
      extendPlugins: false,
      ...markdownConfig,
    }),
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
    fallbackLocale: {
      es: "es",
      en: "en",
    },
    routing: {
      prefixDefaultLocale: false,
    },
  },

  devToolbar: {
    enabled: false,
  },
  adapter: vercel(),
  markdown: {
    gfm: true,
    syntaxHighlight: "prism",
    ...markdownConfig,
  },
});
