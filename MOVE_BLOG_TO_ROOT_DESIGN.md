# Design: Moving Docusaurus Blog to Root

## Executive Summary

This document outlines a comprehensive solution for moving the Docusaurus blog from `/docs/` to the root (`/`) of the site while preserving all existing blog URLs and maintaining zero downtime during the transition.

## Current Architecture

```
blog.mark-burton.com/
├── /                    # Statiq blog (legacy .NET-based system)
│   └── /posts/[slug]    # Blog post URLs
└── /docs/               # Docusaurus blog (Node.js/React)
    ├── /blog/[slug]     # Blog post URLs
    └── /docs/[slug]     # Documentation pages
```

### Current Configuration

**Docusaurus (`src/docs/docusaurus.config.ts`):**
- `url`: `https://blog.mark-burton.com`
- `baseUrl`: `/docs/`
- Blog posts: `/docs/blog/[date]/[slug]`
- Docs pages: `/docs/docs/intro`, etc.

**Netlify (`netlify.toml`):**
- Publish directory: `combined-site`
- Statiq output at root
- Docusaurus output at `/docs/` subdirectory

**GitHub Actions (`.github/workflows/deploy-docusaurus.yml`):**
- Builds both Statiq and Docusaurus
- Combines outputs into `combined-site/`
- Deploys to Netlify

## Proposed Architecture

```
blog.mark-burton.com/
├── /                    # Docusaurus blog (primary)
│   ├── /blog/[slug]     # Blog post URLs (no /docs/ prefix)
│   └── /docs/[slug]     # Documentation pages
└── /statiq/             # Statiq blog (legacy, optional)
    └── /posts/[slug]    # Old blog posts (redirected)
```

## Key Requirements

1. **Preserve existing URLs** - All current blog URLs must continue to work
2. **No HTTP redirects** - Ideally avoid 301/308 redirects for existing URLs
3. **Support renamed files** - Allow specific posts to have custom URLs with redirects
4. **Zero downtime** - Gradual migration with no service interruption
5. **Maintain SEO** - Preserve search engine rankings and link equity

## URL Preservation Strategy

### Docusaurus Blog URL Generation

Docusaurus blog posts use this URL pattern by default:
```
/blog/[YYYY]/[MM]/[DD]/[slug]
```

Where:
- `[YYYY]/[MM]/[DD]` comes from the `date` frontmatter or filename
- `[slug]` comes from the filename (without date prefix)

Example:
- File: `2020-09-08-secure-asp-net-core-health-checks-to-a-specific-port.md`
- URL: `/blog/2020/09/08/secure-asp-net-core-health-checks-to-a-specific-port`

### Current URLs to Preserve

**Statiq URLs (legacy):**
```
/posts/[slug]
/posts/[slug]/index.html
```

**Docusaurus URLs (current at /docs/):**
```
/docs/blog/[YYYY]/[MM]/[DD]/[slug]
/docs/docs/intro
```

**Docusaurus URLs (target at root):**
```
/blog/[YYYY]/[MM]/[DD]/[slug]    # New blog posts
/docs/intro                        # Documentation
```

## Solution Components

### 1. Docusaurus Configuration Changes

**File: `src/docs/docusaurus.config.ts`**

Change `baseUrl` from `/docs/` to `/`:

```typescript
const config: Config = {
  url: 'https://blog.mark-burton.com',
  baseUrl: '/',  // Changed from '/docs/'
  // ... rest of config
};
```

**Impact:**
- All Docusaurus URLs will be at root level
- Blog posts: `/blog/[date]/[slug]` instead of `/docs/blog/[date]/[slug]`
- Docs pages: `/docs/intro` instead of `/docs/docs/intro`

### 2. Redirect Strategy

There are **three** approaches to handle redirects, each with trade-offs:

#### Option A: Netlify Redirects (Recommended)

**Pros:**
- Server-side redirects (no JavaScript required)
- SEO-friendly
- Works for all content types
- Centralized configuration

**Cons:**
- Requires 301/308 HTTP redirects
- One-time SEO impact (but Google handles well)

**Implementation in `netlify.toml`:**

```toml
# Redirect old Docusaurus URLs to new root URLs
[[redirects]]
  from = "/docs/blog/*"
  to = "/blog/:splat"
  status = 301
  force = true

[[redirects]]
  from = "/docs/docs/*"
  to = "/docs/:splat"
  status = 301
  force = true

# Redirect old Statiq URLs to new Docusaurus blog
[[redirects]]
  from = "/posts/:slug"
  to = "/blog/:slug"
  status = 301
  force = true

# Custom redirects for renamed posts
[[redirects]]
  from = "/blog/old-post-name"
  to = "/blog/new-post-name"
  status = 301
```

#### Option B: Docusaurus Client Redirects

**Pros:**
- No HTTP redirects (uses client-side routing)
- Configured within Docusaurus
- Can use `@docusaurus/plugin-client-redirects`

**Cons:**
- Requires JavaScript
- Not ideal for SEO (but acceptable)
- Only works for Docusaurus-generated pages

**Implementation:**

Install plugin:
```bash
npm install @docusaurus/plugin-client-redirects
```

Add to `docusaurus.config.ts`:
```typescript
plugins: [
  [
    '@docusaurus/plugin-client-redirects',
    {
      redirects: [
        {
          from: '/docs/blog',
          to: '/blog',
        },
        // Add more as needed
      ],
      createRedirects(existingPath) {
        // Redirect old /docs/* paths to new paths
        if (existingPath.startsWith('/blog/')) {
          return [`/docs${existingPath}`];
        }
        if (existingPath.startsWith('/docs/')) {
          return [`/docs${existingPath}`];
        }
        return undefined;
      },
    },
  ],
],
```

#### Option C: Custom Slug Configuration

**Pros:**
- No redirects at all for new URLs
- Clean URLs from the start
- Full control over URL structure

**Cons:**
- Requires frontmatter changes in each post
- Must handle old URLs separately
- More manual work

**Implementation:**

Add `slug` to frontmatter:
```yaml
---
title: "Post Title"
slug: /custom-url-path
---
```

### 3. Deployment Changes

**File: `.github/workflows/deploy-docusaurus.yml`**

Options for deployment:

#### Phase 1: Docusaurus-Only Deployment

Remove Statiq build entirely and deploy only Docusaurus:

```yaml
- name: Build Docusaurus site
  working-directory: ./src/docs
  run: npm run build

- name: Deploy to Netlify
  uses: nwtgck/actions-netlify@v3.0
  with:
    publish-dir: './src/docs/build'  # Changed from combined-site
    production-branch: main
    github-token: ${{ secrets.GITHUB_TOKEN }}
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.DEPLOYNETLIFYACCESSTOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.DEPLOYNETLIFYSITEID }}
```

#### Phase 2: Hybrid with Statiq at Subdirectory

Keep Statiq available at `/statiq/` for reference:

```yaml
- name: Combine sites
  run: |
    # Copy Docusaurus to root
    cp -r src/docs/build/* combined-site/
    
    # Copy Statiq to /statiq subdirectory
    if [ -d "output" ]; then
      mkdir -p combined-site/statiq
      cp -r output/* combined-site/statiq/
    fi
```

**Update `netlify.toml`:**
```toml
[[redirects]]
  from = "/statiq/*"
  to = "/statiq/:splat"
  status = 200

# Redirect old root URLs to /statiq/
[[redirects]]
  from = "/posts/:slug"
  to = "/statiq/posts/:slug"
  status = 301
```

## Implementation Plan

### Phase 1: Configuration Update (No Content Changes)

**Goal:** Change baseUrl to `/` and test

**Steps:**
1. Update `docusaurus.config.ts`:
   - Change `baseUrl: '/docs/'` → `baseUrl: '/'`
   - Update `editUrl` if needed
   - Update internal links in navbar/footer

2. Test locally:
   ```bash
   cd src/docs
   npm start
   ```
   - Verify blog posts at `/blog/[date]/[slug]`
   - Verify docs at `/docs/intro`
   - Check all internal links

3. Update `netlify.toml`:
   - Change publish directory
   - Add redirects for old URLs
   - Test redirect rules locally

4. Update GitHub Actions workflow:
   - Simplify to Docusaurus-only deployment
   - Or maintain hybrid with Statiq at subdirectory

### Phase 2: Add Redirects

**Goal:** Ensure all old URLs work

**Option A: Netlify Redirects**

1. Add redirect rules to `netlify.toml`:
   ```toml
   # Old Docusaurus URLs
   [[redirects]]
     from = "/docs/blog/*"
     to = "/blog/:splat"
     status = 301
   
   # Old Statiq URLs
   [[redirects]]
     from = "/posts/:slug"
     to = "/blog/:slug"
     status = 301
   ```

2. Test redirects:
   - Deploy to preview environment
   - Test all old URLs
   - Verify 301 status codes

**Option B: Docusaurus Client Redirects**

1. Install plugin:
   ```bash
   npm install @docusaurus/plugin-client-redirects
   ```

2. Configure in `docusaurus.config.ts`:
   ```typescript
   plugins: [
     [
       '@docusaurus/plugin-client-redirects',
       {
         createRedirects(existingPath) {
           if (existingPath.startsWith('/blog/')) {
             return [`/docs${existingPath}`];
           }
           return undefined;
         },
       },
     ],
   ],
   ```

3. Build and test

### Phase 3: Handle Custom Renames

**Goal:** Allow specific posts to have custom URLs

**For posts you want to rename:**

1. **Option A: Use slug frontmatter**
   ```yaml
   ---
   title: "Better Post Title"
   slug: /new-url-path
   ---
   ```

2. **Option B: Add specific Netlify redirects**
   ```toml
   [[redirects]]
     from = "/blog/old-name"
     to = "/blog/new-name"
     status = 301
   ```

3. Keep a list of renamed posts in a separate file for tracking

### Phase 4: Cleanup

**Goal:** Remove Statiq components (optional)

1. Archive or remove `src/blog/` directory
2. Remove Statiq workflow: `.github/workflows/deploy-prod.yml`
3. Update documentation to remove Statiq references
4. Simplify `netlify.toml`

## Recommended Approach

Based on the requirements, I recommend:

1. **Use Netlify Redirects (Option A)** for URL preservation
   - Most reliable and SEO-friendly
   - Server-side redirects are standard practice
   - Google handles 301s well if done once
   - Centralized configuration

2. **Phase 1 Implementation:**
   - Change `baseUrl` to `/`
   - Deploy Docusaurus at root
   - Add Netlify redirects for old URLs
   - Keep Statiq in repo but not deployed (or at `/statiq/`)

3. **Custom Renames:**
   - Use Netlify redirects for specific renamed posts
   - Maintain a "redirects.txt" file listing all custom redirects
   - Add comments in `netlify.toml` explaining each redirect

## Testing Strategy

### Local Testing

1. **Test Docusaurus with baseUrl: '/'**
   ```bash
   cd src/docs
   npm start
   ```
   Verify:
   - Blog posts accessible at `/blog/[date]/[slug]`
   - Docs accessible at `/docs/intro`
   - All internal links work
   - Images load correctly

2. **Test build output**
   ```bash
   npm run build
   npm run serve
   ```
   Verify production build works

### Deploy Preview Testing

1. Deploy to Netlify preview
2. Test all redirect rules:
   - Old Docusaurus URLs: `/docs/blog/*` → `/blog/*`
   - Old Statiq URLs: `/posts/*` → appropriate destination
   - Custom renamed posts
3. Test with tools:
   - `curl -I https://preview-url/docs/blog/post` (check 301)
   - Browser DevTools Network tab
   - Screaming Frog or similar crawler

### Production Testing

1. Monitor after deployment:
   - Check Google Search Console for 404 errors
   - Monitor server logs
   - Check external links still work

2. Update:
   - XML sitemap (Docusaurus generates automatically)
   - Search engine submission
   - Social media links

## Migration Timeline

**Week 1: Planning & Configuration**
- Review this design document
- Make decisions on redirect approach
- Test locally

**Week 2: Implementation**
- Update Docusaurus config
- Add redirect rules
- Update deployment workflow
- Test in preview environment

**Week 3: Deployment**
- Deploy to production
- Monitor for issues
- Fix any broken links

**Week 4: Verification**
- Check all old URLs
- Monitor analytics
- Update any external references

## Files to Modify

### Required Changes

1. **`src/docs/docusaurus.config.ts`**
   - Change `baseUrl: '/docs/'` to `baseUrl: '/'`
   - Review and update all internal paths

2. **`netlify.toml`**
   - Change `publish = "combined-site"` to appropriate directory
   - Add redirect rules for old URLs
   - Update headers if needed

3. **`.github/workflows/deploy-docusaurus.yml`**
   - Update build and deploy steps
   - Change publish directory
   - Optionally remove Statiq build

### Optional Changes

4. **Individual blog post files**
   - Add `slug` frontmatter for custom URLs (if needed)

5. **Documentation files**
   - Update any references to `/docs/` prefix
   - Check internal links

## Handling Specific Scenarios

### Scenario 1: Post with Different Filename

**Example:** Want to rename `2020-09-08-bad-name.md` to have URL `/blog/2020/09/08/better-name`

**Solution:**
1. Rename file: `2020-09-08-better-name.md`
2. Add Netlify redirect:
   ```toml
   [[redirects]]
     from = "/blog/2020/09/08/bad-name"
     to = "/blog/2020/09/08/better-name"
     status = 301
   ```

### Scenario 2: Post URL Without Date

**Example:** Want `/blog/my-awesome-post` instead of `/blog/2020/09/08/my-awesome-post`

**Solution:**
Add to frontmatter:
```yaml
---
slug: /my-awesome-post
---
```

### Scenario 3: Preserve Statiq URL Structure

**Example:** Keep `/posts/my-post` working

**Solution:**
Add Netlify redirect:
```toml
[[redirects]]
  from = "/posts/:slug"
  to = "/blog/:slug"  # Or search for matching post
  status = 301
```

Note: This may require custom redirect rules for each post since date structure differs.

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Broken external links | High | Implement comprehensive redirects |
| SEO ranking loss | Medium | Use 301 redirects (temporary SEO impact) |
| Internal link breakage | Medium | Test thoroughly, update links |
| Deployment failure | High | Test in preview, have rollback plan |
| Missing edge cases | Medium | Monitor 404s, add redirects as needed |

## Success Criteria

1. ✅ All existing blog URLs return 200 or 301 (not 404)
2. ✅ Blog posts accessible at `/blog/[date]/[slug]`
3. ✅ Documentation accessible at `/docs/[slug]`
4. ✅ Custom renamed posts have working redirects
5. ✅ No broken internal links
6. ✅ Site builds and deploys successfully
7. ✅ Performance maintained or improved
8. ✅ SEO maintained (within reasonable transition period)

## Questions to Resolve

1. **Do you want to keep Statiq content accessible?**
   - If yes, at what URL? (suggest `/statiq/`)
   - If no, just use redirects to Docusaurus

2. **Which redirect approach do you prefer?**
   - Netlify server-side redirects (recommended)
   - Docusaurus client-side redirects
   - Hybrid approach

3. **Are there specific posts you want to rename now?**
   - Provide list for custom redirects

4. **Timeline for migration?**
   - Immediate or phased?

## Next Steps

1. Review this design document
2. Answer the questions above
3. Make decision on redirect approach
4. Proceed with Phase 1 implementation
5. Test thoroughly in preview environment
6. Deploy to production with monitoring

## References

- [Docusaurus Blog Configuration](https://docusaurus.io/docs/blog)
- [Docusaurus baseUrl Configuration](https://docusaurus.io/docs/configuration#baseUrl)
- [Docusaurus Client Redirects Plugin](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-client-redirects)
- [Netlify Redirect Rules](https://docs.netlify.com/routing/redirects/)
- [Netlify Redirect Options](https://docs.netlify.com/routing/redirects/redirect-options/)
- [Google on 301 Redirects and SEO](https://developers.google.com/search/docs/crawling-indexing/301-redirects)

---

**Document Version:** 1.0  
**Last Updated:** 2025-10-10  
**Author:** GitHub Copilot
