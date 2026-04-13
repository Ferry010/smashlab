

# Publish 3 Blog Articles

## What we're building
Three full blog article pages with SEO metadata, proper routing, and updated homepage blog cards linking to them. All content as provided, with em dashes replaced throughout.

## Approach
Static React pages (no database table needed for 3 articles). Blog content lives in components directly. This keeps it simple and fast-loading with full SEO control.

## Files to create

### 1. `src/pages/BlogPostPage.tsx`
Generic blog post layout component:
- Full-width header with court-line overlay, category pill, title (Bebas Neue), reading time, author, date
- Max-width 720px content area with proper typography (DM Sans 16px body, proper heading hierarchy)
- Glass-card styling for callout boxes (tips, tables)
- Responsive tables for the racket overview and level checklist
- "Lees ook" links at the bottom for internal linking
- Back link to homepage `#blogs`

### 2. `src/lib/blogData.ts`
All 3 blog articles as structured data objects:
- `slug`, `title`, `seoTitle`, `metaDescription`, `excerpt`, `category`, `readingTime`, `author`, `publishedAt`, `content` (React nodes or markdown)
- No em dashes anywhere

### 3. `src/pages/BlogArticlePage.tsx`
Route handler that reads slug from URL params, looks up blog data, renders BlogPostPage with content. 404 if slug not found.

## Files to modify

### 4. `src/App.tsx`
Add route: `/blogs/:slug` -> `BlogArticlePage`

### 5. `src/components/Blogs.tsx`
- Update the 3 blog card entries to match actual blog titles/categories/times
- Blog 1 (featured): "Padel beginnen in Nederland" (Beginners, 9 min)
- Blog 2: "Padelniveau uitgelegd: wat betekent jouw Playtomic score?" (Techniek, 7 min)
- Blog 3: "Beste padelracket per niveau in 2026" (Rackets, 8 min)
- Link each card to `/blogs/[slug]`
- Remove em dashes from any text

### 6. `index.html`
Keep existing SEO. No em dashes.

### 7. `.lovable/memory/index.md`
Add note about blog system and no-em-dash rule.

## Content details
Each blog rendered as rich React content with:
- Proper `h2`/`h3` headings
- Styled tables (glass-card background)
- Callout boxes for tips/warnings
- Internal links between the 3 blogs
- Affiliate link placeholders (styled lime buttons)
- No images needed (court-line pattern headers)

## Blog-to-blog internal links
- Blog 3 (beginnen) links to Blog 1 (niveau) and Blog 2 (racket)
- Blog 1 (niveau) links to Blog 2 (racket)
- Blog 2 (racket) links to Blog 1 (niveau) and Blog 3 (beginnen/schoenen teaser)

