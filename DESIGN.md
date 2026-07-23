# Design Principles

## Character

The site should feel personal, calm, and built by an experienced product engineer. It should be polished without looking like a startup landing page. The About page is the reference: quiet borders, soft surfaces, generous spacing, large rounded corners, and concise copy.

## Layout

- Keep the reading column narrow. Use the existing centered container and let whitespace do most of the work.
- Group related content inside subtle surfaces: `rounded-[2rem] border bg-muted/20` for page introductions and `rounded-2xl border bg-muted/20` for cards.
- Use `gap-*` for rhythm. Default to 8–12 between major sections, 4–6 inside sections, and 2–3 inside compact components.
- Prefer responsive grids over measured layouts. One column on small screens, two columns when the content benefits from comparison.

## Type

- Every page gets one clear `h1` with balanced wrapping.
- Use a small uppercase eyebrow (`text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground`) to identify a section without adding visual weight.
- Body copy stays plainspoken, short, and comfortably spaced.
- Metadata is small, muted, and uses tabular numerals where values are compared.

## Surfaces

- Borders define structure; shadows are reserved for lifted or interactive content.
- Use semantic theme colors only: `background`, `foreground`, `muted`, `card`, `border`, and their foreground variants.
- Images sit inside the same corner language as their cards. Avoid isolated rectangles with unrelated radii.
- Hover states should lift contrast or move by a pixel or two. Avoid dramatic scaling.

## Interaction

- Links navigate; buttons perform actions.
- Every interactive element needs a visible focus state and a useful accessible name.
- Icon-only controls use `aria-label` and a native title or tooltip when the meaning is not universal.
- Animate only opacity and transforms, and disable decorative motion when reduced motion is requested.
- Search, filtering, and sorting stay reflected in the URL.

## Reuse

- Use shadcn components already in the repository before creating another primitive.
- Keep pages server-rendered unless interaction requires a client component.
- Build repeated page framing and section labels as shared components; keep page-specific copy and content in the page.
