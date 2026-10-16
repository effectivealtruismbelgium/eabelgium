# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

**Astro 5** static site generator with:

- **Tailwind CSS 4** with custom design tokens
- **Astro content collections** (Markdown/YAML in `src/content/`) for all content
- **React** (used sparingly, ~10% of components for interactive features only)
- **Vercel** deployment platform

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:4321
npm run build        # Build for production
npm run preview      # Preview production build
npm run format       # Format code with Prettier
```

**Always run `npm run format` after making any code changes.**

## Architecture

### Component Philosophy

**Astro-first approach**: Prefer `.astro` components over React (`.tsx`) unless interactivity is required. React should only be used for interactive islands like forms or copy buttons.

### Content collections

All content lives in the repo as [Astro content collections](https://docs.astro.build/en/guides/content-collections/), defined in `src/content.config.ts`. The filename (without extension) is the entry `id` and URL slug.

| Collection   | Location                         | Format   | Route                |
| ------------ | -------------------------------- | -------- | -------------------- |
| `articles`   | `src/content/articles/*.md`      | Markdown | `/articles/[slug]/`  |
| `groups`     | `src/content/groups/*.md`        | Markdown | `/groups/[slug]/`    |
| `pages`      | `src/content/pages/*.md`         | Markdown | `/[slug]/`           |
| `charities`  | `src/content/charities/*.yaml`   | YAML     | `/charities/[slug]/` |
| `causeAreas` | `src/content/cause-areas/*.yaml` | YAML     | (charities grouping) |
| `team`       | `src/content/team/*.yaml`        | YAML     | (about page)         |

- Images live in `src/assets/<collection>/` and are referenced with a relative path (e.g. `coverImage: ../../assets/articles/donating.jpg`). They are optimised at build time with `astro:assets` (`<Image>` / `getImage`).
- `groups`, `charities`, `causeAreas` and `team` have an `order` field (ascending) controlling display order.
- Each charity references a cause area by its id (`causeArea: global-health-development`).
- Query helpers in `src/lib/content.ts` (`getSortedArticles`, `getSortedGroups`, `getSortedTeam`, `getCauseAreasWithCharities`, `getOgImageUrl`).

**Dynamic routing pattern**:

1. Use `[...slug].astro`
2. In `getStaticPaths()`, call `getCollection()` and pass each entry as a prop
3. Render the body with `const { Content } = await render(entry)`

### Styling System

Tailwind CSS 4 with custom design tokens in `src/styles/global.css`:

**Color variables** (use these instead of Tailwind defaults):

- `--color-primary-*` (Sophia Blue theme: 50-950)
- `--color-secondary-*` (Eunoia Orange accent: 50-950)
- `--color-tertiary-*` (Praxis Green: 50-950)
- `--color-base-*` (Zinc-based neutrals: 50-950)

Example: Use `text-primary-600` not `text-blue-600`

### Core Components

Reusable UI primitives in `src/components/core/`:

- `CardContainer.astro` - Standard card layout with hover states
- `ButtonLink.astro` - Consistent button styling
- `PageContainer.astro` - Page-level layout wrapper
- `PageTitle.astro` - Page title component
- `Pill.astro` - Tag/label component

### Icon Usage

```astro
import {Icon} from "astro-icon/components";
<Icon name="mdi:heart" class="h-6 w-6" />
```

Only use Material Design Icons (`mdi:` collection).

### Project Structure

```
src/
├── components/
│   ├── core/          # Reusable UI primitives
│   ├── home/          # Homepage components
│   ├── about/         # About page components
│   └── [Feature].astro
├── pages/             # Routes (static and dynamic)
│   ├── [...slug].astro # Generic pages from the `pages` collection
│   ├── articles/
│   │   ├── [...slug].astro
│   │   └── index.astro
│   ├── charities/
│   │   └── [...slug].astro
│   └── groups/
│       ├── [...slug].astro
│       └── index.astro
├── layouts/           # Page templates with <slot />
├── content/           # Content collections (Markdown/YAML)
├── content.config.ts  # Collection schemas
├── lib/
│   └── content.ts     # Collection query helpers
├── styles/
│   └── global.css     # Design tokens and base styles
├── assets/            # Images processed by Astro
└── types/             # TypeScript type definitions
```

`public/` - Static files served as-is (not optimized or bundled)

## Content Style Guidelines

Follow EA Belgium's editorial style:

- British spelling ("organise" not "organize")
- European date format (15 June 2025)
- Sentence case for titles ("Join our events" not "Join Our Events")
- "effective altruism" lowercase (movement), "Effective Altruism Belgium" capitalized (organisation)
- Avoid em-dashes (—), use commas or periods
- Friendly but professional tone
- Clear calls to action

## Deployment

Hosted on Vercel with automatic deployments on push to main. Preview deployments for pull requests. Redirects configured in `vercel.json`.
