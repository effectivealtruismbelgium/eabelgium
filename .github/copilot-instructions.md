# EA Belgium Website - Copilot Instructions

This is the website for Effective Altruism Belgium, built with Astro 5, Tailwind CSS 4, and Sanity CMS.

## Architecture & Tech Stack

**Astro Static Site Generator** with hybrid routing:

- Static pages for most content (`src/pages/`)
- Dynamic routes for CMS content (`[...slug].astro` patterns)
- React components used sparingly for interactive features only (~10% of components)
- Sanity CMS for structured content (articles, charities, team members, local groups)

**Key Dependencies:**

- `@sanity/astro` integration for CMS data fetching
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
- `PortableText.astro` - Renders Sanity rich text content

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

**Sanity CMS Integration:**

- Content types: `Article`, `Charity`, `LocalGroup`, `TeamMember`, `CauseArea`
- Query helper functions in `src/sanity/query.ts`:
  ```typescript
  fetchOne("charity", Astro.params); // Single item by slug
  fetchAll("charity"); // All items of type
  getStaticPathsForType("charity"); // Static paths for [slug] routes
  ```

**Dynamic Routing Pattern:**

- Use `[...slug].astro` for CMS-driven pages
- `getStaticPaths()` must call `getStaticPathsForType()`
- Access data with `fetchOne()` in page frontmatter

**Content Types:**

- Static pages: `.astro`, `.mdx`, `.md` in `src/pages/`
- CMS pages: Dynamic routes fetching from Sanity
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
│   └── [...slug].astro # CMS dynamic routes
├── sanity/            # CMS integration
├── layouts/           # Page templates
└── styles/global.css  # Design tokens & base styles
```

## Common Tasks

**Adding a new CMS content type:**

1. Update `sanity.types.ts` with TypeScript interface
2. Add to `ReturnTypes` in `src/sanity/query.ts`
3. Create `[...slug].astro` page template
4. Use `getStaticPathsForType()` and `fetchOne()` pattern

**Creating interactive components:**

- Use React only when necessary (forms, copy buttons, etc.)
- File extension: `.tsx` for React, `.astro` for static
- Import React components into Astro with `client:` directives

**Icon Usage:**

```astro
import {Icon} from "astro-icon/components";
<Icon name="mdi:heart" class="h-6 w-6" />
```
