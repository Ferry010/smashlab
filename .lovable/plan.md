

# Blog Admin Dashboard

## Summary
Build an in-app admin dashboard where you can create, edit, and publish SEO-heavy blog articles. Blog content moves from static React components to a database table with a rich text editor and full SEO metadata fields.

## Database

### New table: `blog_posts`
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, default gen_random_uuid() |
| slug | text | unique, not null |
| title | text | not null |
| seo_title | text | |
| meta_description | text | |
| excerpt | text | |
| content | text | Rich HTML content |
| category | text | |
| reading_time | text | |
| author | text | default 'Smashlab Redactie' |
| published_at | timestamptz | nullable (null = draft) |
| status | text | 'draft' or 'published', default 'draft' |
| focus_keyword | text | |
| secondary_keywords | text[] | |
| og_title | text | |
| og_description | text | |
| canonical | text | |
| level_tags | text[] | |
| image_url | text | nullable |
| created_at | timestamptz | default now() |
| updated_at | timestamptz | default now() |
| author_id | uuid | references profiles(id) |

**RLS policies:**
- SELECT: public (everyone can read published posts)
- INSERT/UPDATE/DELETE: only authenticated users with admin role

### New table: `user_roles`
| Column | Type |
|--------|------|
| id | uuid | PK |
| user_id | uuid | references auth.users(id) on delete cascade |
| role | app_role enum ('admin', 'moderator', 'user') |

With `has_role()` security definer function per the standard pattern.

### Seed data
Migrate the 3 existing static blogs into `blog_posts` as published articles.

### Storage
New `blog-images` public bucket for blog header images.

## Admin Pages

### `/admin/blogs` - Blog overview
- Table listing all posts (title, status, category, published date)
- "Nieuw artikel" button
- Quick actions: edit, duplicate, delete, toggle publish/draft
- Protected route: only accessible to admin role users

### `/admin/blogs/nieuw` and `/admin/blogs/:id/bewerken` - Blog editor
- **SEO tab**: slug (auto-generated from title), seo_title, meta_description, focus_keyword, secondary_keywords, og_title, og_description, canonical URL
- **Content tab**: title, excerpt, category dropdown, level tags multi-select, reading time, rich text editor for content body
- **Media tab**: header image upload (to blog-images bucket)
- **Settings tab**: author, status (draft/published), published_at date picker
- Preview button (opens article in new tab)
- Save draft / Publish buttons

### Rich text editor
Use TipTap (already React-friendly, no heavy deps). Features: headings (h2, h3), bold, italic, links, ordered/unordered lists, blockquotes, tables, code blocks, tip/callout blocks.

## Frontend changes

### Updated `BlogArticlePage.tsx`
- Fetch blog post from database by slug instead of static data
- Render HTML content from database using `dangerouslySetInnerHTML` with DOMPurify sanitization
- Keep existing SEO meta tag updates
- Fallback: if slug matches old static blogs and DB is empty, show static content (migration safety)

### Updated `Blogs.tsx` (homepage)
- Fetch latest 3 published posts from database
- Replace static blog cards with dynamic data

### Updated `BlogPostPage.tsx`
- Accept HTML content string instead of React children
- Render sanitized HTML with existing Smashlab styling classes

### Navbar
- Add "Admin" link visible only to users with admin role

## New files
- `src/pages/AdminBlogsPage.tsx` - blog list
- `src/pages/AdminBlogEditorPage.tsx` - create/edit
- `src/components/admin/BlogEditor.tsx` - rich text editor component
- `src/components/admin/SeoFields.tsx` - SEO metadata form
- `src/components/admin/AdminLayout.tsx` - sidebar layout for admin

## Modified files
- `src/App.tsx` - add admin routes
- `src/pages/BlogArticlePage.tsx` - fetch from DB
- `src/pages/BlogPostPage.tsx` - render HTML content
- `src/components/Blogs.tsx` - fetch from DB
- `src/components/Navbar.tsx` - admin link for admins

## Build order
1. Database migration (blog_posts table, user_roles, has_role function, RLS, seed 3 existing blogs, storage bucket)
2. Admin layout + protected route wrapper
3. Blog list page (`/admin/blogs`)
4. Blog editor with TipTap rich text + SEO fields
5. Update frontend to read from database
6. Assign your user the admin role

