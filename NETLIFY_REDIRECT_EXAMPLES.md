# Netlify Redirect Examples for Blog Migration

This document provides specific Netlify redirect examples for moving the Docusaurus blog from `/docs/` to root while preserving all existing URLs.

## Understanding Netlify Redirects

Netlify redirects are defined in `netlify.toml` and support:
- Pattern matching with wildcards (`*`, `:placeholder`)
- HTTP status codes (200, 301, 302, etc.)
- Query parameters
- Conditional redirects
- Proxy redirects (200 status)

## Redirect Syntax Overview

```toml
[[redirects]]
  from = "/old-path/*"      # Source URL pattern
  to = "/new-path/:splat"   # Destination URL pattern
  status = 301              # HTTP status code
  force = true              # Override existing files
  conditions = {}           # Optional conditions
```

### Placeholders

- `:splat` - Matches `/*` wildcard (everything after the path)
- `:placeholder` - Named placeholder for cleaner syntax
- Query params: `from = "/path?param=:value"`

## Recommended Redirects for Blog Migration

### Complete `netlify.toml` Configuration

```toml
[build]
  publish = "src/docs/build"  # Changed from combined-site
  command = "echo 'Built by GitHub Actions'"

[build.environment]
  NODE_VERSION = "20"

# ============================================================================
# DOCUSAURUS BLOG REDIRECTS
# Redirect old /docs/ URLs to new root URLs
# ============================================================================

# Redirect old Docusaurus blog posts: /docs/blog/* → /blog/*
[[redirects]]
  from = "/docs/blog/*"
  to = "/blog/:splat"
  status = 301
  force = true

# Redirect old Docusaurus docs: /docs/docs/* → /docs/*
[[redirects]]
  from = "/docs/docs/*"
  to = "/docs/:splat"
  status = 301
  force = true

# Redirect /docs/ root to /blog (main landing)
[[redirects]]
  from = "/docs"
  to = "/blog"
  status = 301

# Redirect /docs/blog root to /blog
[[redirects]]
  from = "/docs/blog"
  to = "/blog"
  status = 301

# ============================================================================
# STATIQ LEGACY REDIRECTS
# Redirect old Statiq URLs to new Docusaurus blog
# ============================================================================

# Generic Statiq post redirect (if URL structure matches)
# Note: This assumes Statiq uses /posts/slug and Docusaurus uses /blog/date/slug
# You may need to create specific redirects for each post if date structure differs
[[redirects]]
  from = "/posts/*"
  to = "/blog/:splat"
  status = 301

# If Statiq URLs need more specific mapping, use individual redirects:
# [[redirects]]
#   from = "/posts/secure-asp-net-core-health-checks-to-a-specific-port"
#   to = "/blog/2020/09/08/secure-asp-net-core-health-checks-to-a-specific-port"
#   status = 301

# ============================================================================
# CUSTOM POST RENAMES
# Add specific redirects for posts you want to rename
# ============================================================================

# Example: Rename a post with different filename
# [[redirects]]
#   from = "/blog/2020/09/08/old-post-name"
#   to = "/blog/2020/09/08/new-post-name"
#   status = 301

# Example: Short URL for popular post
# [[redirects]]
#   from = "/health-checks"
#   to = "/blog/2020/09/08/secure-asp-net-core-health-checks-to-a-specific-port"
#   status = 301

# ============================================================================
# SPA ROUTING FOR DOCUSAURUS
# Handle client-side routing (must be last)
# ============================================================================

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# ============================================================================
# CACHING HEADERS
# Optimize performance
# ============================================================================

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.woff2"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## Specific Redirect Scenarios

### Scenario 1: Map All Old Docusaurus URLs

All blog posts currently at `/docs/blog/[date]/[slug]` need to work at `/blog/[date]/[slug]`:

```toml
[[redirects]]
  from = "/docs/blog/*"
  to = "/blog/:splat"
  status = 301
  force = true
```

**Test URLs:**
- `/docs/blog/2020/09/08/secure-asp-net-core-health-checks-to-a-specific-port`
  → `/blog/2020/09/08/secure-asp-net-core-health-checks-to-a-specific-port`

### Scenario 2: Map All Old Documentation URLs

Documentation pages at `/docs/docs/intro` need to work at `/docs/intro`:

```toml
[[redirects]]
  from = "/docs/docs/*"
  to = "/docs/:splat"
  status = 301
  force = true
```

**Test URLs:**
- `/docs/docs/intro` → `/docs/intro`
- `/docs/docs/tutorial-basics/congratulations` → `/docs/tutorial-basics/congratulations`

### Scenario 3: Handle Statiq Legacy URLs

If Statiq used `/posts/[slug]` and you want to redirect to Docusaurus:

**Option A: Generic redirect (if slug matches)**
```toml
[[redirects]]
  from = "/posts/:slug"
  to = "/blog/:slug"
  status = 301
```

**Option B: Search-based redirect**
```toml
# Use Docusaurus built-in search to find posts
[[redirects]]
  from = "/posts/:slug"
  to = "/search?q=:slug"
  status = 302  # Temporary redirect to search
```

**Option C: Individual redirects (most accurate)**
```toml
# Manually map each Statiq post to its Docusaurus equivalent
[[redirects]]
  from = "/posts/secure-asp-net-core-health-checks-to-a-specific-port"
  to = "/blog/2020/09/08/secure-asp-net-core-health-checks-to-a-specific-port"
  status = 301

[[redirects]]
  from = "/posts/secure-swagger-on-asp-net-core-by-address-and-port"
  to = "/blog/2020/09/08/secure-swagger-on-asp-net-core-by-address-and-port"
  status = 301

# ... add more as needed
```

### Scenario 4: Custom Short URLs

Create memorable short URLs for important posts:

```toml
# Marketing/social media friendly URLs
[[redirects]]
  from = "/health-checks"
  to = "/blog/2020/09/08/secure-asp-net-core-health-checks-to-a-specific-port"
  status = 301

[[redirects]]
  from = "/swagger-security"
  to = "/blog/2020/09/08/secure-swagger-on-asp-net-core-by-address-and-port"
  status = 301

[[redirects]]
  from = "/yarp"
  to = "/blog/2020/09/14/experimenting-with-yarp-a-reverse-proxy"
  status = 301
```

### Scenario 5: Rename Post Files

If you rename a post file, redirect old URL to new:

```toml
# Renamed post: bad-filename.md → better-filename.md
[[redirects]]
  from = "/blog/2020/09/08/bad-filename"
  to = "/blog/2020/09/08/better-filename"
  status = 301

# Multiple renamed posts
[[redirects]]
  from = "/blog/2020/09/09/getting-the-most-out-of-swagger-in-your-asp-net-core-api"
  to = "/blog/2020/09/09/maximize-swagger-aspnet-core"
  status = 301
```

### Scenario 6: Category/Tag Redirects

If Statiq had category pages:

```toml
[[redirects]]
  from = "/category/:cat"
  to = "/blog/tags/:cat"
  status = 301

[[redirects]]
  from = "/tag/:tag"
  to = "/blog/tags/:tag"
  status = 301
```

## Testing Redirects

### Manual Testing with curl

```bash
# Test redirect exists and returns 301
curl -I https://blog.mark-burton.com/docs/blog/2020/09/08/test-post

# Should return:
# HTTP/2 301
# location: /blog/2020/09/08/test-post

# Test final destination returns 200
curl -I https://blog.mark-burton.com/blog/2020/09/08/test-post

# Should return:
# HTTP/2 200
```

### Testing with Browser DevTools

1. Open DevTools (F12)
2. Go to Network tab
3. Visit old URL
4. Check:
   - Status code (should be 301 or 200)
   - Response headers (Location header for 301)
   - Final URL after redirect

### Automated Testing Script

Create `test-redirects.sh`:

```bash
#!/bin/bash

# Test redirect URLs
URLS=(
  "/docs/blog/2020/09/08/secure-asp-net-core-health-checks-to-a-specific-port"
  "/docs/blog/2020/09/08/secure-swagger-on-asp-net-core-by-address-and-port"
  "/docs/docs/intro"
  "/posts/test-post"
)

for url in "${URLS[@]}"; do
  echo "Testing: $url"
  curl -I "https://blog.mark-burton.com$url" 2>&1 | grep -E "HTTP|location:"
  echo "---"
done
```

## Migration Checklist

Use this checklist when implementing redirects:

### Pre-Migration
- [ ] List all current URLs (use sitemap or crawl)
- [ ] Identify posts to rename
- [ ] Plan custom short URLs
- [ ] Create redirect rules in `netlify.toml`

### Testing (Preview Environment)
- [ ] Deploy to Netlify preview
- [ ] Test each redirect with curl
- [ ] Check browser behavior
- [ ] Verify 301 status codes
- [ ] Check redirect chains (shouldn't exceed 1-2 hops)
- [ ] Test 404 pages for non-existent URLs

### Production Deployment
- [ ] Deploy new configuration
- [ ] Test all old URLs immediately
- [ ] Monitor server logs for 404s
- [ ] Check Google Search Console for errors
- [ ] Update sitemap (Docusaurus auto-generates)

### Post-Migration (Week 1)
- [ ] Monitor analytics for broken links
- [ ] Check external referrers work
- [ ] Update social media links
- [ ] Submit new sitemap to search engines
- [ ] Monitor Search Console for crawl errors

### Post-Migration (Month 1)
- [ ] Check SEO rankings (allow time for re-indexing)
- [ ] Review redirect usage (can remove unused rules)
- [ ] Update documentation
- [ ] Archive old Statiq codebase

## Common Issues and Solutions

### Issue 1: Redirect Loop

**Symptom:** Browser shows "Too many redirects"

**Cause:** Circular redirect pattern

**Solution:** Check redirect order and ensure no A→B→A loops

### Issue 2: Redirect Not Working

**Symptom:** Old URL returns 404

**Causes:**
1. Redirect rule comes after SPA rule
2. Syntax error in `netlify.toml`
3. `force = true` not set

**Solution:** 
- Ensure redirects come before SPA catch-all
- Validate TOML syntax
- Add `force = true` to override files

### Issue 3: Wrong Redirect Target

**Symptom:** Redirect goes to wrong page

**Cause:** Pattern matching error

**Solution:** Test regex patterns, use specific rules before generic ones

### Issue 4: Search Engines Not Updating

**Symptom:** Google still shows old URLs

**Solution:**
- Wait 1-2 weeks for re-crawling
- Submit new sitemap to Search Console
- Use "Request Indexing" for important pages
- Check robots.txt doesn't block new URLs

## Best Practices

1. **Order matters:** Put specific redirects before generic ones
2. **Use 301 for permanent:** 301 for permanent moves, 302 for temporary
3. **Avoid chains:** Don't redirect A→B→C, redirect A→C directly
4. **Test thoroughly:** Use preview deployments before production
5. **Monitor 404s:** Set up logging/monitoring for broken links
6. **Document redirects:** Add comments in `netlify.toml` explaining why
7. **Keep it simple:** Fewer redirect rules = better performance
8. **Update links:** Update internal links rather than relying on redirects

## Maintenance

### Monthly Review
- Check redirect usage in Netlify analytics
- Remove unused redirects
- Update documentation

### Annual Review
- Consider removing very old redirects (>1 year)
- Update for new URL patterns
- Optimize for performance

## Resources

- [Netlify Redirect Documentation](https://docs.netlify.com/routing/redirects/)
- [Netlify Redirect Playground](https://redirect-tester.netlify.app/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Google SEO: 301 Redirects](https://developers.google.com/search/docs/crawling-indexing/301-redirects)

---

**Last Updated:** 2025-10-10
