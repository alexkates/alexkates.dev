# Copilot Instructions for alexkates.dev

## Project Overview

This is a Next.js 14 (App Router) personal blog and portfolio site powered by Hashnode's headless CMS. The architecture follows a GraphQL-first approach with generated types and server-side data fetching.

## Architecture & Data Flow

### Hashnode GraphQL Integration

- All blog content comes from Hashnode's GraphQL API (`https://gql.hashnode.com`)
- GraphQL schema lives in `codegen.yml` and generates TypeScript types to `src/hashnode/generated/`
- **Critical**: Run `bun hashnode-codegen` after modifying any `.graphql` files in `src/hashnode/queries/` or `src/hashnode/fragments/`
- Query pattern: Define queries in `src/hashnode/queries/*.graphql` → Reference fragments from `src/hashnode/fragments/` → Use generated typed document nodes in server functions
- Example flow: `GetPosts.graphql` → generates `GetPostsDocument` → used in `src/server/get-blog-posts.ts` with `graphql-request`

### Server Functions Pattern

- All Hashnode API calls are isolated in `src/server/*.ts` functions (never in components)
- These are async server functions that return typed data from the generated GraphQL schema
- Functions like `getBlogPosts()`, `getBlogPost()`, `getPublication()` handle request logic with proper error handling
- Components import and await these functions directly (App Router server components)

### Environment Variables

- `HASHNODE_HOST`: Required - your Hashnode blog domain (e.g., `blog.example.com`)
- No API key needed for public queries; add `HASHNODE_API_KEY` only if using authenticated queries like `GetUser`

## Development Workflow

### Essential Commands

```bash
bun dev              # Start dev server (runs predev script: install + codegen)
bun hashnode-codegen # Regenerate GraphQL types after schema changes
bun build           # Production build (runs prebuild: codegen first)
bun format          # Run Prettier with import sorting
```

### Pre-execution Hooks

- `predev` and `prebuild` scripts automatically run `hashnode-codegen`
- If you manually edit GraphQL files, regenerate types before the dev server picks up changes

## Component Conventions

### UI Components (shadcn/ui)

- All base UI components in `src/components/ui/` are from shadcn/ui library (New York style)
- Use `components.json` config for adding new shadcn components
- Import path pattern: `@/components/ui/[component]`
- Utility function `cn()` from `@/lib/utils` merges Tailwind classes (uses `clsx` + `tailwind-merge`)

### Component Structure

- Feature components in `src/components/` (e.g., `blog-post-list-item.tsx`, `project-list.tsx`)
- Components receive generated Hashnode types: `Post`, `Publication`, etc. from `@/hashnode/generated/graphql`
- Example: `BlogPostListItem` expects `{ post: Post }` where `Post` is the generated type

### Styling Patterns

- Tailwind CSS with CSS variables for theming (see `tailwind.config.ts` and `src/app/globals.css`)
- Dark mode via `next-themes` with class-based switching (`ThemeProvider` in `src/components/providers.tsx`)
- Custom animation helper: `fadeIn` constant in `@/lib/utils` for consistent fade-in animations
- Container max-width: `700px` at `2xl` breakpoint (defined in Tailwind config)

## MDX & Content Rendering

### Markdown Processing (`src/components/mdx.tsx`)

- Uses `react-markdown` with multiple rehype/remark plugins:
  - `rehype-highlight`: Code syntax highlighting with highlight.js (GitHub Dark Dimmed theme)
  - `rehype-slug`: Auto-generate heading IDs
  - `rehype-autolink-headings`: Linkable headings
  - `remark-gfm`: GitHub Flavored Markdown support
- Custom component mappings:
  - Twitter links auto-embed as `<Tweet>` components (via `react-tweet`)
  - YouTube links auto-embed as iframes
  - All external links open in new tabs

## File Organization

- **`src/app/`**: Next.js App Router pages (layout, page, error components)
- **`src/server/`**: Server-side data fetching functions (all Hashnode API calls)
- **`src/components/`**: React components (feature components + ui subdirectory)
- **`src/data/`**: Static data like projects list (`projects.ts`)
- **`src/hashnode/`**: GraphQL queries, fragments, generated types
- **`src/lib/`**: Utilities (utils, JSON-LD creators)
- **`src/types/`**: Custom TypeScript types

## Key Patterns to Follow

1. **Type Safety**: Use generated GraphQL types - never `any` types for Hashnode data
2. **Server Components First**: Default to server components; only add `"use client"` when needed (forms, theme toggle, etc.)
3. **Path Aliases**: Always use `@/*` imports (e.g., `@/components/ui/button`)
4. **Metadata Generation**: Use Next.js `generateMetadata()` for SEO - see `src/app/blog/[slug]/page.tsx` example
5. **Image Optimization**: Remote images from `cdn.hashnode.com` and `avatars.githubusercontent.com` are configured in `next.config.js`

## Analytics & External Services

- Vercel Analytics integrated via `<Analytics />` component in `Providers`
- Hashnode analytics proxied through Next.js rewrites (`/ping/*` routes in `next.config.js`)
- Custom analytics component: `src/components/analytics.tsx` for tracking page views

## Common Tasks

### Adding a New GraphQL Query

1. Create `.graphql` file in `src/hashnode/queries/`
2. Reference existing fragments from `src/hashnode/fragments/`
3. Run `bun hashnode-codegen` to generate types
4. Create server function in `src/server/` using generated document node
5. Import and use in page/component

### Adding a New Page

1. Create route in `src/app/[route]/page.tsx`
2. Add `generateMetadata()` for SEO (use existing pages as template)
3. Fetch data using server functions from `src/server/`
4. Style with Tailwind + existing component patterns

### Adding UI Components

- Use shadcn/ui CLI: Check `components.json` for config
- Components automatically scaffold to `src/components/ui/`
- Customize with Tailwind classes and theme variables
