import { defineCollection, reference } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/articles" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.string().optional(),
      pinned: z.boolean().optional(),
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),
      coverImageCredit: z.string().optional(),
    }),
});

const groups = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/groups" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      location: z.string(),
      lumaUrl: z.url().optional(),
      facebookUrl: z.url().optional(),
      coverImage: image().optional(),
      coverImageAlt: z.string().optional(),
      coverImageCredit: z.string().optional(),
      order: z.number(),
    }),
});

const pages = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/pages" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const causeAreas = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/cause-areas" }),
  schema: z.object({
    name: z.string(),
    order: z.number(),
  }),
});

const charities = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/charities" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      program: z.string(),
      description: z.string(),
      causeArea: reference("causeAreas"),
      logo: image().optional(),
      website: z.url().optional(),
      recommendedBy: z.string().optional(),
      isTaxDeductible: z.boolean().default(false),
      // "hia": donate via Effectief Geven, "tge": donate via KBF / Transnational Giving Europe
      donationPartner: z.enum(["hia", "tge"]).optional(),
      kbfBankReference: z.string().optional(),
      order: z.number(),
    }),
});

const team = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/team" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      role: z.string(),
      description: z.string(),
      image: image().optional(),
      linkedinUrl: z.url().optional(),
      order: z.number(),
    }),
});

export const collections = {
  articles,
  groups,
  pages,
  causeAreas,
  charities,
  team,
};
