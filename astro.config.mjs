// @ts-check
import mdx from "@astrojs/mdx"
import { defineConfig } from "astro/config"
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./src/lib/i18n"

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [ ...SUPPORTED_LOCALES ],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
    },
  },
  integrations: [ mdx() ],
  vite: {
    resolve: {
      alias: {
        "@assets": "/src/assets",
        "@styles": "/src/styles",
      },
    },
  },
})
