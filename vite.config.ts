import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { weddingConfig } from "./src/config/wedding.config";

const { seo } = weddingConfig;

export default defineConfig({
  base: "./",
  resolve: { tsconfigPaths: true },
  plugins: [
    react(),
    {
      name: "wedding-metadata",
      transformIndexHtml() {
        return [
          {
            tag: "title",
            children: seo.title.replaceAll("&", "&amp;").replaceAll("<", "&lt;"),
          },
          { tag: "meta", attrs: { name: "description", content: seo.description } },
          { tag: "meta", attrs: { property: "og:type", content: "website" } },
          { tag: "meta", attrs: { property: "og:title", content: seo.socialTitle } },
          { tag: "meta", attrs: { property: "og:description", content: seo.socialDescription } },
          { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
          { tag: "meta", attrs: { name: "twitter:title", content: seo.socialTitle } },
          { tag: "meta", attrs: { name: "twitter:description", content: seo.socialDescription } },
          ...(seo.socialImage
            ? [
                { tag: "meta", attrs: { property: "og:image", content: seo.socialImage } },
                { tag: "meta", attrs: { name: "twitter:image", content: seo.socialImage } },
              ]
            : []),
        ];
      },
    },
  ],
});
