import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: "https://dev.jeffercbs.tech/",
  integrations: [sitemap(), tailwind(), icon()],
  redirects: {
    "/en/projects/[...slug]": "/projects/[...slug]",
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
