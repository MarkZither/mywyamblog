# Customizing Docusaurus Blog URLs to Match Statiq Structure

## Question

Can Docusaurus be configured to use the Statiq URL structure: `/posts/2025-10-08-day-5-normal-ward-progress` instead of the default `/blog/2025/10/08/day-5-normal-ward-progress`?

## Short Answer

**Yes**, Docusaurus blog URLs are highly customizable. You can configure it to match the Statiq structure exactly.

## Solution Options

### Option 1: Use `routeBasePath` to Change `/blog` to `/posts` (Recommended)

This changes the blog route from `/blog` to `/posts`:

```typescript
// src/docs/docusaurus.config.ts
presets: [
  [
    'classic',
    {
      blog: {
        routeBasePath: 'posts',  // ← Changes /blog to /posts
        showReadingTime: true,
        // ... rest of config
      },
    } satisfies Preset.Options,
  ],
],
```

**Result:** URLs become `/posts/2020/09/08/post-slug`

### Option 2: Remove Date Segments from URL

To get `/posts/post-slug` instead of `/posts/2020/09/08/post-slug`:

```typescript
// src/docs/docusaurus.config.ts
presets: [
  [
    'classic',
    {
      blog: {
        routeBasePath: 'posts',
        blogPostPermalink: '/:slug',  // ← Removes date segments
        showReadingTime: true,
        // ... rest of config
      },
    } satisfies Preset.Options,
  ],
],
```

**Result:** URLs become `/posts/post-slug`

### Option 3: Exact Statiq Match - `/posts/YYYY-MM-DD-slug`

To match the exact Statiq structure with date prefix in the slug:

```typescript
// src/docs/docusaurus.config.ts
presets: [
  [
    'classic',
    {
      blog: {
        routeBasePath: 'posts',
        blogPostPermalink: '/:year-:month-:day-:slug',
        showReadingTime: true,
        // ... rest of config
      },
    } satisfies Preset.Options,
  ],
],
```

**Result:** URLs become `/posts/2020-09-08-secure-asp-net-core-health-checks`

### Option 4: Custom Permalink Pattern

You can use any combination of these placeholders:

```typescript
blog: {
  routeBasePath: 'posts',
  // Available placeholders:
  // :year, :month, :day - from date frontmatter
  // :slug - from filename or slug frontmatter
  // :id - from id frontmatter
  blogPostPermalink: '/:year-:month-:day-:slug',
  // Or: '/:slug' (no date)
  // Or: '/:year/:slug' (year only)
  // Or: '/:year/:month/:slug' (year/month)
}
```

## Complete Configuration Examples

### Example 1: Match Statiq Exactly

```typescript
// src/docs/docusaurus.config.ts
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Mark Burton',
  tagline: 'Software Engineer & Technical Writer',
  favicon: 'img/favicon.ico',
  
  url: 'https://blog.mark-burton.com',
  baseUrl: '/',  // Changed from '/docs/'
  
  organizationName: 'MarkZither',
  projectName: 'mywyamblog',
  
  presets: [
    [
      'classic',
      {
        blog: {
          routeBasePath: 'posts',  // ← /blog → /posts
          blogPostPermalink: '/:year-:month-:day-:slug',  // ← Add date to slug
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/MarkZither/mywyamblog/tree/main/docs/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/MarkZither/mywyamblog/tree/main/docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  
  // ... rest of config
};

export default config;
```

**Result:**
- File: `2020-09-08-secure-asp-net-core-health-checks.md`
- URL: `https://blog.mark-burton.com/posts/2020-09-08-secure-asp-net-core-health-checks`

### Example 2: Simple `/posts/slug` Structure

```typescript
blog: {
  routeBasePath: 'posts',
  blogPostPermalink: '/:slug',  // No date in URL
  showReadingTime: true,
  // ... rest
}
```

**Result:**
- File: `2020-09-08-secure-asp-net-core-health-checks.md`
- URL: `https://blog.mark-burton.com/posts/secure-asp-net-core-health-checks`

## Handling Redirects

If you change the URL structure, you'll need to add redirects for the old URLs.

### Netlify Redirects

```toml
# netlify.toml

# Redirect old /docs/blog/* to new /posts/*
[[redirects]]
  from = "/docs/blog/:year/:month/:day/:slug"
  to = "/posts/:year-:month-:day-:slug"
  status = 301
  force = true

# Or if using simple /posts/:slug
[[redirects]]
  from = "/docs/blog/:year/:month/:day/:slug"
  to = "/posts/:slug"
  status = 301
  force = true

# Redirect old Statiq URLs (if they were different)
[[redirects]]
  from = "/posts/:slug"
  to = "/posts/:slug"  # Already correct!
  status = 200
```

### Docusaurus Client Redirects

```typescript
// src/docs/docusaurus.config.ts
plugins: [
  [
    '@docusaurus/plugin-client-redirects',
    {
      createRedirects(existingPath) {
        // Redirect from old /blog/* to new /posts/*
        if (existingPath.startsWith('/posts/')) {
          return [
            existingPath.replace('/posts/', '/blog/'),
            existingPath.replace('/posts/', '/docs/blog/'),
          ];
        }
        return undefined;
      },
    },
  ],
],
```

## Updated Migration Strategy

With this configuration, your migration becomes even simpler:

### Current State
```
blog.mark-burton.com/
├── /              → Statiq
│   └── /posts/YYYY-MM-DD-slug
└── /docs/         → Docusaurus
    └── /blog/YYYY/MM/DD/slug
```

### Target State (Option A: Keep Statiq Structure)
```
blog.mark-burton.com/
└── /              → Docusaurus
    └── /posts/YYYY-MM-DD-slug  ← Matches Statiq!
```

### Target State (Option B: Docusaurus Default)
```
blog.mark-burton.com/
└── /              → Docusaurus
    └── /blog/YYYY/MM/DD/slug  ← Docusaurus default
```

## Advantages of Each Option

### Option A: `/posts/YYYY-MM-DD-slug` (Match Statiq)

**Pros:**
- ✅ Zero URL changes for migrated posts
- ✅ All existing external links continue to work
- ✅ No redirects needed for Statiq → Docusaurus migration
- ✅ Shorter URLs than Docusaurus default
- ✅ Date visible in URL

**Cons:**
- ❌ Less common URL structure
- ❌ Slightly harder to read (dashes vs slashes)

### Option B: `/blog/YYYY/MM/DD/slug` (Docusaurus Default)

**Pros:**
- ✅ Standard Docusaurus structure
- ✅ Cleaner date segmentation
- ✅ More common blog URL pattern
- ✅ SEO-friendly hierarchical structure

**Cons:**
- ❌ Requires redirects from old Statiq URLs
- ❌ Longer URLs
- ❌ Need to update internal links

### Option C: `/posts/slug` (No Date)

**Pros:**
- ✅ Shortest URLs
- ✅ Clean and simple
- ✅ Easy to share

**Cons:**
- ❌ No date in URL (harder to understand post age)
- ❌ Requires redirects from both Statiq and Docusaurus
- ❌ Potential slug conflicts over time

## Recommendation for Your Case

**Use Option A: `/posts/YYYY-MM-DD-slug`** to match Statiq exactly.

### Why?

1. **Zero migration pain** - All existing Statiq URLs work immediately
2. **No redirects needed** - Statiq posts at `/posts/*` move to Docusaurus at `/posts/*`
3. **Preserves date** - Date is visible in URL for context
4. **Shorter than Docusaurus default** - One line vs four segments
5. **Only need redirects for old `/docs/blog/*`** - The Docusaurus preview URLs

### Configuration

```typescript
// src/docs/docusaurus.config.ts
const config: Config = {
  url: 'https://blog.mark-burton.com',
  baseUrl: '/',  // Changed from '/docs/'
  
  presets: [
    [
      'classic',
      {
        blog: {
          routeBasePath: 'posts',  // /blog → /posts
          blogPostPermalink: '/:year-:month-:day-:slug',  // Match Statiq
          showReadingTime: true,
          // ... rest of blog config
        },
        // ... rest of config
      } satisfies Preset.Options,
    ],
  ],
};
```

### Redirects Needed

```toml
# netlify.toml

# Only need to redirect old Docusaurus preview URLs
[[redirects]]
  from = "/docs/blog/:year/:month/:day/:slug"
  to = "/posts/:year-:month-:day-:slug"
  status = 301
  force = true

[[redirects]]
  from = "/docs/blog"
  to = "/posts"
  status = 301

# SPA routing (must be last)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Testing

Test the configuration locally:

```bash
cd src/docs
npm start
```

Visit: `http://localhost:3000/posts/2020-09-08-secure-asp-net-core-health-checks`

## File Naming

Blog post files should match the URL structure:

### For `/posts/YYYY-MM-DD-slug`
```
src/docs/blog/
├── 2020-09-08-secure-asp-net-core-health-checks.md
├── 2020-09-08-secure-swagger-on-asp-net-core.md
└── 2025-10-08-day-5-normal-ward-progress.md
```

Docusaurus will:
1. Extract date from filename: `2020-09-08`
2. Extract slug from remainder: `secure-asp-net-core-health-checks`
3. Generate URL: `/posts/2020-09-08-secure-asp-net-core-health-checks`

### Alternative: Use Frontmatter

You can also specify the slug in frontmatter:

```yaml
---
title: "Post Title"
date: 2020-09-08
slug: /2020-09-08-custom-slug
---
```

## Navigation Updates

Don't forget to update navigation links:

```typescript
// docusaurus.config.ts
navbar: {
  items: [
    {to: '/posts', label: 'Blog', position: 'left'},  // Changed from /blog
    // ... rest
  ],
},
footer: {
  links: [
    {
      title: 'More',
      items: [
        {
          label: 'Blog',
          to: '/posts',  // Changed from /blog
        },
      ],
    },
  ],
},
```

## Summary

**Yes, Docusaurus can match the Statiq URL structure exactly** using:

```typescript
blog: {
  routeBasePath: 'posts',
  blogPostPermalink: '/:year-:month-:day-:slug',
}
```

This gives you URLs like: `https://blog.mark-burton.com/posts/2025-10-08-day-5-normal-ward-progress`

This is the **recommended approach** for your migration as it:
- Preserves all Statiq URLs
- Requires minimal redirects
- Maintains date visibility
- Simplifies the migration process

## References

- [Docusaurus Blog Configuration](https://docusaurus.io/docs/blog)
- [Blog Permalink Configuration](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog#blogPostPermalink)
- [Route Base Path](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog#routeBasePath)

---

**Created:** 2025-10-10  
**In response to:** Comment on BLOG_MIGRATION_DOCS_INDEX.md  
**Question:** Can Docusaurus match Statiq URL structure `/posts/YYYY-MM-DD-slug`?  
**Answer:** Yes, fully configurable via `routeBasePath` and `blogPostPermalink`
