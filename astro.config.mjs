// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import icon from "astro-icon";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkToc from "remark-toc";
import rehypeExternalLinks from "rehype-external-links";

import robotsTxt from "astro-robots-txt";

import react from "@astrojs/react";

import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
  site: "https://eabelgium.org",
  integrations: [
    mdx(),
    sitemap(),
    icon(),
    robotsTxt(),
    react(),
    sanity({
      projectId: "37spwj8l",
      dataset: "production",
      useCdn: false, // for static builds
    }),
  ],
  markdown: {
    remarkPlugins: [[remarkToc, { heading: "toc", maxDepth: 3 }]],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: "append" }],
      [
        rehypeExternalLinks,
        {
          properties: {
            className: "external",
          },
          rel: ["nofollow"],
          target: "_blank",
        },
      ],
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
