import { defineConfig, envField } from "astro/config";

import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import preact from "@astrojs/preact";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";

import vercel from "@astrojs/vercel";
import markdownConfig from "./mardown.config";

// https://astro.build/config
export default defineConfig({
  site: "https://jeffercbs.tech/",

  vite: {
    plugins: [tailwindcss()],
  },

  output: "server",

  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
    },
  },

  integrations: [
    sitemap(),
    icon(),
    mdx({
      gfm: true,
      syntaxHighlight: "prism",
      extendMarkdownConfig: false,
      ...markdownConfig,
    }),
    preact({ compat: true, devtools: true }),
    db(),
  ],

  redirects: {
    "/blog/p/anuncio-de-compilador-en-go-que-hara-a-typescript-10x-mas-rapido":
      "/blog/p/compilador-go-typescript-10x-mas-rapido",
    "/blog/p/arbelleza-primera-parte":
      "/blog/p/arquitectura-tecnologia-desarrollo-ecommerce-guia-parte-1",
    "/blog/p/como-funciona-internet":
      "/blog/p/guia-completa-funcionamiento-internet-explicado",
    "/blog/p/hello-word":
      "/blog/p/bienvenida-blog-programacion-tutoriales-desarrollo-web",
    "/blog/p/mejores-practicas-para-apis-seguras-en-nestjs":
      "/blog/p/nestjs-apis-seguras-mejores-practicas-tutorial",
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
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
  markdown: {
    gfm: true,
    syntaxHighlight: "prism",
    ...markdownConfig,
  },
});
