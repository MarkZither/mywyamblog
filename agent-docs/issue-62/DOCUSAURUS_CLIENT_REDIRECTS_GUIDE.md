# Docusaurus Client Redirects Plugin Guide

This document explains how to use the `@docusaurus/plugin-client-redirects` plugin as an alternative or complement to Netlify server-side redirects.

## Overview

The Docusaurus client redirects plugin provides a way to handle redirects entirely within the Docusaurus application using client-side JavaScript.

### Pros
- ✅ No HTTP redirects (uses client-side routing)
- ✅ Configured entirely in Docusaurus
- ✅ Immediate redirect (no server round-trip for SPAs)
- ✅ Can complement Netlify redirects
- ✅ Good for non-critical redirects

### Cons
- ❌ Requires JavaScript (not accessible without JS)
- ❌ Not ideal for SEO (but acceptable)
- ❌ Only works for Docusaurus-generated pages
- ❌ Doesn't work for API requests or non-browser clients
- ❌ Can't redirect to external URLs

## Installation

```bash
cd src/docs
npm install @docusaurus/plugin-client-redirects
```

## Basic Configuration

Add to `docusaurus.config.ts`:

```typescript
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as ClientRedirects from '@docusaurus/plugin-client-redirects';

const config: Config = {
  // ... existing config
  
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Simple redirects
        redirects: [
          {
            from: '/docs/blog',
            to: '/blog',
          },
          {
            from: '/docs/docs/intro',
            to: '/docs/intro',
          },
        ],
        
        // Dynamic redirect generation
        createRedirects(existingPath) {
          // Redirect old /docs/* paths to new paths
          if (existingPath.startsWith('/blog/')) {
            // For every /blog/* path, also accept /docs/blog/*
            return [`/docs${existingPath}`];
          }
          
          if (existingPath.startsWith('/docs/')) {
            // For every /docs/* path, also accept /docs/docs/*
            return [`/docs${existingPath}`];
          }
          
          return undefined; // No redirect for other paths
        },
      } satisfies ClientRedirects.Options,
    ],
  ],
};

export default config;
```

## Configuration Options

### Static Redirects

Define exact redirects using the `redirects` array:

```typescript
redirects: [
  {
    from: '/old-path',
    to: '/new-path',
  },
  {
    from: ['/old-path-1', '/old-path-2'],
    to: '/new-path',
  },
  {
    from: '/docs/blog/old-post',
    to: '/blog/new-post',
  },
],
```

### Dynamic Redirect Generation

Use `createRedirects` to generate redirects programmatically:

```typescript
createRedirects(existingPath) {
  // existingPath is the path to the actual page
  // Return an array of paths that should redirect to existingPath
  
  // Example 1: Add /docs/ prefix to all blog posts
  if (existingPath.startsWith('/blog/')) {
    return [`/docs${existingPath}`];
  }
  
  // Example 2: Multiple source paths
  if (existingPath === '/blog/important-post') {
    return [
      '/docs/blog/important-post',
      '/old-blog/important-post',
      '/important',  // Short URL
    ];
  }
  
  // Example 3: Pattern matching
  const blogMatch = existingPath.match(/^\/blog\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)$/);
  if (blogMatch) {
    const [, year, month, day, slug] = blogMatch;
    return [
      `/docs/blog/${year}/${month}/${day}/${slug}`,
      `/posts/${slug}`,  // Old Statiq format
    ];
  }
  
  return undefined; // No redirect
},
```

## Complete Example for Blog Migration

Here's a complete configuration for migrating from `/docs/` to root:

```typescript
import type {Config} from '@docusaurus/types';
import type * as ClientRedirects from '@docusaurus/plugin-client-redirects';

const config: Config = {
  url: 'https://blog.mark-burton.com',
  baseUrl: '/',  // Changed from '/docs/'
  
  // ... other config
  
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Specific important redirects
        redirects: [
          // Main blog redirect
          {
            from: '/docs/blog',
            to: '/blog',
          },
          
          // Documentation root
          {
            from: '/docs/docs',
            to: '/docs',
          },
          
          // Old landing page
          {
            from: '/docs',
            to: '/',
          },
          
          // Custom renamed posts
          {
            from: '/blog/2020/09/08/old-name',
            to: '/blog/2020/09/08/new-name',
          },
        ],
        
        // Generate redirects for all content
        createRedirects(existingPath) {
          const redirectPaths: string[] = [];
          
          // 1. Redirect old /docs/blog/* to /blog/*
          if (existingPath.startsWith('/blog/')) {
            redirectPaths.push(`/docs${existingPath}`);
          }
          
          // 2. Redirect old /docs/docs/* to /docs/*
          if (existingPath.startsWith('/docs/') && !existingPath.startsWith('/docs/blog/')) {
            redirectPaths.push(`/docs${existingPath}`);
          }
          
          // 3. Handle old Statiq URLs: /posts/slug → /blog/date/slug
          // Note: This requires knowing the date structure
          const blogMatch = existingPath.match(/^\/blog\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)$/);
          if (blogMatch) {
            const [, year, month, day, slug] = blogMatch;
            redirectPaths.push(`/posts/${slug}`);
          }
          
          // 4. Add short URLs for specific posts (optional)
          if (existingPath === '/blog/2020/09/08/secure-asp-net-core-health-checks-to-a-specific-port') {
            redirectPaths.push('/health-checks');
          }
          
          if (existingPath === '/blog/2020/09/14/experimenting-with-yarp-a-reverse-proxy') {
            redirectPaths.push('/yarp');
          }
          
          return redirectPaths.length > 0 ? redirectPaths : undefined;
        },
      } satisfies ClientRedirects.Options,
    ],
  ],
};

export default config;
```

## Hybrid Approach: Netlify + Docusaurus Redirects

Best practice is to use **both** for maximum compatibility:

### Use Netlify for:
- SEO-critical redirects (old blog posts)
- External client redirects (bots, crawlers)
- API endpoints
- Non-HTML resources

### Use Docusaurus for:
- Internal navigation redirects
- Developer convenience
- Fallback for client-side routing
- Short URLs within the app

### Example Hybrid Configuration

**`netlify.toml`:**
```toml
# Critical SEO redirects (server-side)
[[redirects]]
  from = "/docs/blog/*"
  to = "/blog/:splat"
  status = 301
  force = true

[[redirects]]
  from = "/posts/:slug"
  to = "/blog/:slug"
  status = 301

# SPA catch-all (must be last)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**`docusaurus.config.ts`:**
```typescript
plugins: [
  [
    '@docusaurus/plugin-client-redirects',
    {
      createRedirects(existingPath) {
        // Docusaurus handles these for client-side navigation
        if (existingPath.startsWith('/blog/')) {
          return [`/docs${existingPath}`];
        }
        return undefined;
      },
    },
  ],
],
```

## Advanced Patterns

### Pattern 1: Year-Month-Day to Slug Only

If you want to support both `/blog/2020/09/08/post` and `/blog/post`:

```typescript
createRedirects(existingPath) {
  const match = existingPath.match(/^\/blog\/\d{4}\/\d{2}\/\d{2}\/(.+)$/);
  if (match) {
    const slug = match[1];
    return [`/blog/${slug}`];  // Short form
  }
  return undefined;
},
```

### Pattern 2: Case-Insensitive Redirects

Note: Docusaurus paths are case-sensitive. For case-insensitive URLs, use Netlify:

```toml
# In netlify.toml
[[redirects]]
  from = "/blog/My-Post"
  to = "/blog/my-post"
  status = 301
```

### Pattern 3: Query Parameter Handling

Client redirects don't preserve query parameters by default. Use Netlify for this:

```toml
[[redirects]]
  from = "/old-path"
  to = "/new-path"
  status = 301
  query = {preserve = true}
```

### Pattern 4: Conditional Redirects by User Agent

Only possible with Netlify:

```toml
[[redirects]]
  from = "/docs/blog/*"
  to = "/blog/:splat"
  status = 301
  conditions = {User-Agent = ["Googlebot"]}
```

## Testing Client Redirects

### Local Development

```bash
cd src/docs
npm run build
npm run serve
```

Visit old URLs in browser:
- Open DevTools → Network tab
- Navigate to old URL (e.g., `/docs/blog/post`)
- Check:
  - No network request (client-side redirect)
  - URL bar updates to new URL
  - Page loads correctly

### Test Cases

```typescript
// Test these URLs in browser after build
const testUrls = [
  '/docs/blog',                          // → /blog
  '/docs/docs/intro',                    // → /docs/intro
  '/docs/blog/2020/09/08/test-post',    // → /blog/2020/09/08/test-post
  '/posts/test-post',                    // → /blog/*/test-post
];
```

### Debug Mode

Enable debug logging:

```typescript
// In docusaurus.config.ts
export default {
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
};
```

Check browser console for redirect messages.

## Performance Considerations

### Build Time Impact

Client redirects are generated at build time:
- **Small impact:** < 100 redirects
- **Medium impact:** 100-1000 redirects
- **Large impact:** > 1000 redirects (consider Netlify only)

### Runtime Impact

Client redirects are handled by JavaScript:
- **Minimal impact:** Redirects are instant (no server round-trip)
- **SEO impact:** Mild (Google can handle client redirects)
- **Accessibility:** None if JS disabled (404 error)

## Troubleshooting

### Redirect Not Working

**Check 1: Build output**
```bash
npm run build
# Look for "Generating client redirects" in output
```

**Check 2: Browser console**
- Open DevTools
- Check for JavaScript errors
- Look for Docusaurus routing messages

**Check 3: Build artifacts**
```bash
# Check if redirect files were created
ls -la src/docs/build/docs/blog/
```

### Redirect Loop

**Cause:** Circular redirect (A → B → A)

**Solution:** Review `createRedirects` logic:
```typescript
createRedirects(existingPath) {
  // DON'T DO THIS: Creates loop
  if (existingPath === '/blog') {
    return ['/blog'];  // ❌ Loops to itself
  }
  
  // DO THIS: Redirect from different paths
  if (existingPath === '/blog') {
    return ['/docs/blog', '/old-blog'];  // ✅ Redirects from other paths
  }
  
  return undefined;
},
```

### Redirect Not Generated

**Cause:** `createRedirects` returns undefined

**Solution:** Add logging:
```typescript
createRedirects(existingPath) {
  const redirects = [];
  
  if (existingPath.startsWith('/blog/')) {
    redirects.push(`/docs${existingPath}`);
  }
  
  // Debug logging (remove in production)
  if (redirects.length > 0) {
    console.log(`Redirects for ${existingPath}:`, redirects);
  }
  
  return redirects.length > 0 ? redirects : undefined;
},
```

## Migration Strategy

### Phase 1: Add Plugin

1. Install plugin
2. Add basic configuration
3. Test locally
4. Deploy to preview

### Phase 2: Add Netlify Redirects

1. Add server-side redirects to `netlify.toml`
2. Keep client redirects as fallback
3. Test both work together

### Phase 3: Optimize

1. Monitor which redirects are used
2. Keep critical ones in Netlify
3. Use Docusaurus for convenience redirects
4. Remove unused redirects

## Recommendations

### For This Project

Given the requirements:
1. **Use Netlify redirects as primary** (SEO-critical)
2. **Add Docusaurus client redirects as fallback** (developer convenience)
3. **Keep configuration simple** (maintainability)

### Example Configuration

**Minimal, reliable setup:**

```typescript
// docusaurus.config.ts - Keep it simple
plugins: [
  [
    '@docusaurus/plugin-client-redirects',
    {
      createRedirects(existingPath) {
        // Only handle /docs/ prefix removal
        if (existingPath.startsWith('/blog/')) {
          return [`/docs${existingPath}`];
        }
        if (existingPath.startsWith('/docs/') && !existingPath.startsWith('/docs/blog/')) {
          return [`/docs${existingPath}`];
        }
        return undefined;
      },
    },
  ],
],
```

```toml
# netlify.toml - Handle everything else
[[redirects]]
  from = "/docs/blog/*"
  to = "/blog/:splat"
  status = 301
  force = true

[[redirects]]
  from = "/posts/*"
  to = "/blog/:splat"  # Or specific mapping
  status = 301
```

## Resources

- [Official Plugin Documentation](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects)
- [Docusaurus Redirect Examples](https://github.com/facebook/docusaurus/blob/main/website/docusaurus.config.ts)
- [Client vs Server Redirects Discussion](https://github.com/facebook/docusaurus/discussions/6195)

---

**Last Updated:** 2025-10-10
