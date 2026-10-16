# EA Belgium Website

The official website for [Effective Altruism Belgium](https://eabelgium.org), built with modern web technologies to promote effective giving and community building.

## Tech Stack

- **[Astro](https://astro.build/)** - Static site generator with hybrid routing
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework with custom design tokens
- **[Astro content collections](https://docs.astro.build/en/guides/content-collections/)** - All content stored as Markdown/YAML in the repo
- **[React](https://react.dev/)** - Interactive components (used sparingly)
- **[Vercel](https://vercel.com/)** - Hosting and deployment platform

## Project Structure

```text
src/
├── components/         # Reusable UI components
│   ├── core/          # Base components (CardContainer, ButtonLink, etc.)
│   └── [feature]/     # Feature-specific components
├── pages/             # Static and dynamic routes
│   └── [...slug].astro # Generic pages from the `pages` collection
├── layouts/           # Page templates
├── content/           # Content collections (Markdown/YAML)
├── content.config.ts  # Collection schemas
├── lib/content.ts     # Collection query helpers
└── styles/            # Global styles and design tokens
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/tomdug/eabelgium.git
   cd eabelgium
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:4321` to see the site

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run format` - Format code with Prettier

## Content Management

All content lives in this repository as [Astro content collections](https://docs.astro.build/en/guides/content-collections/) in `src/content/`, with schemas in `src/content.config.ts`:

- **Articles** (`src/content/articles/*.md`) - Blog posts and educational content
- **Local groups** (`src/content/groups/*.md`) - Community chapters across Belgium
- **Pages** (`src/content/pages/*.md`) - Generic pages such as the privacy policy
- **Charities** (`src/content/charities/*.yaml`) - Vetted organisations for donations
- **Cause areas** (`src/content/cause-areas/*.yaml`) - Focus areas used to group charities
- **Team members** (`src/content/team/*.yaml`) - Organisation leadership and volunteers

The filename is the URL slug. Images go in `src/assets/<collection>/` and are referenced with a relative path, e.g. `coverImage: ../../assets/articles/donating.jpg`. Entries in groups, charities, cause areas and team are sorted by their `order` field.

To edit content, change the files directly. Every change to `main` triggers a new deployment.

## Deployment

The site automatically deploys to Vercel when changes are pushed to the main branch. Preview deployments are created for pull requests.
