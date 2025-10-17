# EA Belgium Website

The official website for [Effective Altruism Belgium](https://eabelgium.org), built with modern web technologies to promote effective giving and community building.

## Tech Stack

- **[Astro](https://astro.build/)** - Static site generator with hybrid routing
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework with custom design tokens
- **[Sanity CMS](https://www.sanity.io/)** - Headless CMS for dynamic content management
- **[React](https://react.dev/)** - Interactive components (used sparingly)
- **[Vercel](https://vercel.com/)** - Hosting and deployment platform

## Project Structure

```text
src/
├── components/         # Reusable UI components
│   ├── core/          # Base components (CardContainer, ButtonLink, etc.)
│   └── [feature]/     # Feature-specific components
├── pages/             # Static and dynamic routes
│   └── [...slug].astro # CMS-driven dynamic pages
├── layouts/           # Page templates
├── sanity/            # CMS integration and queries
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

Content is managed through [Sanity CMS](https://www.sanity.io/). The CMS handles:

- **Articles** - Blog posts and educational content
- **Charities** - Vetted organisations for donations
- **Local Groups** - Community chapters across Belgium
- **Team Members** - Organisation leadership and volunteers
- **Cause Areas** - Focus areas within effective altruism

Dynamic pages are generated using Astro's `[...slug].astro` pattern with data fetched from Sanity.

## Deployment

The site automatically deploys to Vercel when changes are pushed to the main branch. Preview deployments are created for pull requests.
