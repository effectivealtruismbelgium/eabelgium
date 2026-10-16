# EA Belgium Website - Copilot Instructions

This is the website for Effective Altruism Belgium, built with Astro, Tailwind CSS 4, and Astro content collections.

## Architecture & Tech Stack

**Astro Static Site Generator** with hybrid routing:

- Static pages for most content (`src/pages/`)
- Dynamic routes for content collections (`[...slug].astro` patterns)
- React components used sparingly for interactive features only (~10% of components)
- Content collections in `src/content/` (Markdown/YAML) for articles, charities, team members, local groups

**Key Dependencies:**

- `astro-icon` with Material Design Icons (`mdi:` collection)
- `qrcode.react` for donation QR codes
- `sepa-payment-qr-code` for European banking integration

## Component Patterns

**Astro-First Philosophy:** Prefer Astro components (`.astro`) over React unless interactivity is needed.

**Core Component Library:**

- Use `src/components/core/` for reusable base components
- `CardContainer.astro` - Standard card layout with hover states
- `ButtonLink.astro` - Consistent button styling
- `PageContainer.astro` - Page-level layout wrapper

**Component Structure:**

```typescript
// Astro component props pattern
type Props = {
  title: string;
  description?: string;
  // Always include optional props with defaults
};
```

## Styling System

**Tailwind CSS 4** with custom design tokens defined in `src/styles/global.css`:

```css
/* Use semantic color variables, not Tailwind defaults */
--color-primary-*    /* Sophia Blue theme colors */
--color-secondary-*  /* Eunoia Orange accent colors */
--color-base-*       /* Zinc-based neutrals */
```

**Styling Rules:**

- Use custom color variables: `text-primary-600` not `text-blue-600`
- Extract reusable styles into core components
- Component-specific styles go in the component file
- Custom spacing/typography already configured in theme

## Content Management

**Content collections:**

- Collections defined in `src/content.config.ts`: `articles`, `groups`, `pages` (Markdown), `charities`, `causeAreas`, `team` (YAML)
- Files live in `src/content/<collection>/`; the filename is the entry id and URL slug
- Images in `src/assets/<collection>/`, referenced with relative paths and validated with `image()`
- Query helpers in `src/lib/content.ts` (`getSortedArticles`, `getSortedGroups`, `getSortedTeam`, `getCauseAreasWithCharities`)

**Dynamic Routing Pattern:**

- Use `[...slug].astro`
- `getStaticPaths()` calls `getCollection()` and passes each entry as a prop
- Render bodies with `const { Content } = await render(entry)`

**Content Types:**

- Static pages: `.astro`, `.mdx`, `.md` in `src/pages/`
- Collection pages: Dynamic routes rendering entries from `src/content/`
- Images: `src/assets/` for processed images, `public/` for static files

## Development Workflows

**npm Scripts:**

```bash
npm run dev      # Start dev server with hot reload
npm run build    # Static build for production
npm run preview  # Preview production build locally
npm run format   # Prettier formatting
```

**Deployment:**

- Hosted on Vercel with automatic deployments
- Static site generation with dynamic route pre-rendering
- Redirects configured in `vercel.json` for legacy URLs

## Content Guidelines

When writing content, follow EA Belgium's style guide:

- Friendly but professional tone
- British spelling ("organise" not "organize")
- European date format (15 June 2025)
- Sentence case for titles ("Join our events" not "Join Our Events")
- "effective altruism" lowercase, "Effective Altruism Belgium" capitalized
- Avoid em-dashes (—), use commas or periods

## File Organization

```
src/
├── components/
│   ├── core/          # Reusable UI primitives
│   ├── home/          # Page-specific components
│   ├── about/
│   └── [Feature].astro # Feature components
├── pages/
│   ├── [topic]/       # Content sections
│   └── [...slug].astro # Generic pages from the `pages` collection
├── content/           # Content collections (Markdown/YAML)
├── lib/content.ts     # Collection query helpers
├── layouts/           # Page templates
└── styles/global.css  # Design tokens & base styles
```

## Common Tasks

**Adding a new content collection:**

1. Define the collection and its schema in `src/content.config.ts`
2. Add entries in `src/content/<collection>/`
3. Create a `[...slug].astro` page template using `getCollection()` and `render()`

**Creating interactive components:**

- Use React only when necessary (forms, copy buttons, etc.)
- File extension: `.tsx` for React, `.astro` for static
- Import React components into Astro with `client:` directives

**Icon Usage:**

```astro
import {Icon} from "astro-icon/components";
<Icon name="mdi:heart" class="h-6 w-6" />
```
