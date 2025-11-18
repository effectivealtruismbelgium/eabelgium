# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Tech Stack

**Astro 5** static site generator with:
- **Tailwind CSS 4** with custom design tokens
- **Sanity CMS** for headless content management
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

## Architecture

### Component Philosophy

**Astro-first approach**: Prefer `.astro` components over React (`.tsx`) unless interactivity is required. React should only be used for interactive islands like forms or copy buttons.

### Sanity CMS Integration

Content types managed in Sanity:
- `Article` - Blog posts and educational content
- `Charity` - Vetted organisations with donation info
- `LocalGroup` - Community chapters across Belgium
- `TeamMember` - Organisation leadership
- `CauseArea` - EA focus areas
- `Page` - General pages

**Query helper functions** (`src/sanity/query.ts`):
```typescript
fetchOne("charity", Astro.params)           // Single item by slug
fetchAll("charity")                         // All items of type
fetchAllOrdered("charity")                  // All items ordered by orderRank
getStaticPathsForType("charity", Astro.params) // For getStaticPaths()
fetchAllCauseAreasWithCharities()          // Special query with references
```

**Dynamic routing pattern**:
1. Use `[...slug].astro` for CMS-driven pages
2. In `getStaticPaths()`, call `getStaticPathsForType()`
3. Fetch data with `fetchOne()` in page frontmatter
4. Example: `src/pages/[...slug].astro` for generic pages

**Adding a new content type**:
1. Generate types with `sanity typegen generate` (updates `src/sanity/sanity.types.ts`)
2. Add to `ReturnTypes` in `src/sanity/query.ts`
3. Create corresponding `[...slug].astro` page template

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
- `PortableText.astro` - Renders Sanity rich text content
- `Pill.astro` - Tag/label component

### Icon Usage

```astro
import { Icon } from "astro-icon/components";
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
│   ├── [...slug].astro # CMS-driven generic pages
│   ├── articles/
│   │   ├── [...slug].astro
│   │   └── index.astro
│   ├── charities/
│   │   └── [...slug].astro
│   └── groups/
│       ├── [...slug].astro
│       └── index.astro
├── layouts/           # Page templates with <slot />
├── sanity/            # CMS integration
│   ├── query.ts       # Helper functions
│   ├── sanity.types.ts # Generated TypeScript types
│   └── lib/
│       └── url-for-image.ts
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
