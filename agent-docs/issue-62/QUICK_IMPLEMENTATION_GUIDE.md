# Quick Implementation Guide: Move Blog to Root

This is a concise, actionable guide for implementing the blog migration. For full details, see `MOVE_BLOG_TO_ROOT_DESIGN.md`.

## TL;DR

**Goal:** Move Docusaurus from `/docs/` to `/` while preserving all existing URLs.

**Approach:** Change `baseUrl` to `/`, add Netlify redirects for old URLs.

**Timeline:** 2-4 hours for implementation, 1 week for monitoring.

## Pre-Implementation Questions

Before proceeding, decide:

1. **Keep Statiq content?**
   - [ ] No - Remove entirely, redirect to Docusaurus
   - [ ] Yes - Keep at `/statiq/` for reference

2. **Redirect strategy?**
   - [ ] Netlify server-side (recommended)
   - [ ] Docusaurus client-side
   - [ ] Hybrid (both)

3. **Posts to rename?**
   - [ ] None - Keep all URLs as-is
   - [ ] Some - List them in `POSTS_TO_RENAME.txt`

4. **Timeline?**
   - [ ] Immediate - Deploy to production ASAP
   - [ ] Phased - Test in preview first

## Implementation Steps

### Step 1: Change Docusaurus baseUrl (5 minutes)

**File: `src/docs/docusaurus.config.ts`**

```typescript
const config: Config = {
  url: 'https://blog.mark-burton.com',
  baseUrl: '/',  // ← Change from '/docs/'
  // ... rest stays the same
};
```

### Step 2: Test Locally (10 minutes)

```bash
cd src/docs
npm install
npm start
```

**Verify:**
- ✅ Blog loads at `http://localhost:3000/blog`
- ✅ Docs load at `http://localhost:3000/docs/intro`
- ✅ Navigation works
- ✅ Images load correctly

```bash
npm run build
npm run serve
```

**Verify production build:**
- ✅ Build succeeds
- ✅ All pages accessible
- ✅ No broken links

### Step 3: Update Netlify Configuration (10 minutes)

**File: `netlify.toml`**

**Option A: Docusaurus Only (Recommended)**

```toml
[build]
  publish = "src/docs/build"  # ← Change from combined-site
  command = "echo 'Built by GitHub Actions'"

[build.environment]
  NODE_VERSION = "20"

# Redirect old /docs/ URLs to new root URLs
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

[[redirects]]
  from = "/docs"
  to = "/blog"
  status = 301

# Redirect old Statiq URLs (adjust as needed)
[[redirects]]
  from = "/posts/*"
  to = "/blog/:splat"
  status = 301

# SPA routing (must be last)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Caching headers
[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

**Option B: Keep Statiq at /statiq/**

```toml
[build]
  publish = "combined-site"
  command = "echo 'Built by GitHub Actions'"

# Same redirects as Option A, plus:

[[redirects]]
  from = "/statiq/*"
  to = "/statiq/:splat"
  status = 200
```

### Step 4: Update GitHub Actions (10 minutes)

**File: `.github/workflows/deploy-docusaurus.yml`**

**Option A: Docusaurus Only**

```yaml
- name: Build Docusaurus site
  working-directory: ./src/docs
  run: npm run build

# Remove Statiq build steps

# Simplify deployment
- name: Deploy to Netlify
  uses: nwtgck/actions-netlify@v3.0
  with:
    publish-dir: './src/docs/build'  # ← Change from combined-site
    production-branch: main
    github-token: ${{ secrets.GITHUB_TOKEN }}
  env:
    NETLIFY_AUTH_TOKEN: ${{ secrets.DEPLOYNETLIFYACCESSTOKEN }}
    NETLIFY_SITE_ID: ${{ secrets.DEPLOYNETLIFYSITEID }}
```

**Option B: Keep Statiq**

```yaml
# After building both...

- name: Combine sites
  run: |
    mkdir -p combined-site
    
    # Docusaurus at root
    cp -r src/docs/build/* combined-site/
    
    # Statiq at /statiq/
    if [ -d "output" ]; then
      mkdir -p combined-site/statiq
      cp -r output/* combined-site/statiq/
    fi
```

### Step 5: Add Custom Redirects (Optional, 5-15 minutes)

**File: `netlify.toml`**

Add any custom redirects for renamed posts:

```toml
# Example: Renamed posts
[[redirects]]
  from = "/blog/2020/09/08/old-name"
  to = "/blog/2020/09/08/new-name"
  status = 301

# Example: Short URLs
[[redirects]]
  from = "/health-checks"
  to = "/blog/2020/09/08/secure-asp-net-core-health-checks-to-a-specific-port"
  status = 301
```

### Step 6: Test in Preview (20 minutes)

```bash
# Commit changes
git add -A
git commit -m "Move Docusaurus blog to root"
git push
```

**Wait for GitHub Actions to build and deploy to preview.**

**Test all critical URLs:**

```bash
# Test old Docusaurus URLs redirect
curl -I https://deploy-preview-XX--your-site.netlify.app/docs/blog/2020/09/08/secure-asp-net-core-health-checks-to-a-specific-port
# Should return: HTTP/2 301 and Location: /blog/2020/09/08/...

# Test new URLs work
curl -I https://deploy-preview-XX--your-site.netlify.app/blog/2020/09/08/secure-asp-net-core-health-checks-to-a-specific-port
# Should return: HTTP/2 200

# Test docs pages
curl -I https://deploy-preview-XX--your-site.netlify.app/docs/intro
# Should return: HTTP/2 200
```

**Manual testing:**
- Visit preview URL in browser
- Test navigation
- Check old URLs redirect correctly
- Verify all images load
- Test on mobile

### Step 7: Deploy to Production (5 minutes)

If preview looks good:

```bash
# Merge to main (or push to main if working directly)
git checkout main
git merge your-branch
git push origin main
```

**Monitor deployment:**
- Watch GitHub Actions
- Check Netlify deploy log
- Test production URLs immediately

### Step 8: Verify Production (15 minutes)

**Test critical URLs:**

```bash
# Old Docusaurus URLs
https://blog.mark-burton.com/docs/blog/2020/09/08/secure-asp-net-core-health-checks-to-a-specific-port
→ Should redirect to: /blog/2020/09/08/...

# Old Statiq URLs (if applicable)
https://blog.mark-burton.com/posts/some-post
→ Should redirect to appropriate blog post

# New URLs
https://blog.mark-burton.com/blog/2020/09/08/secure-asp-net-core-health-checks-to-a-specific-port
→ Should work directly

# Documentation
https://blog.mark-burton.com/docs/intro
→ Should work directly
```

**Check:**
- [ ] All old URLs return 301 or 200 (not 404)
- [ ] New URLs load correctly
- [ ] Navigation works
- [ ] Images display
- [ ] Mobile responsive
- [ ] SEO meta tags present

### Step 9: Update External Links (Optional, ongoing)

Update any external references:
- [ ] Social media profile links
- [ ] GitHub README links
- [ ] Email signature
- [ ] Other websites linking to your blog

Note: Not urgent since redirects handle this, but cleaner to update.

### Step 10: Monitor (1 week)

**Day 1-3: Active monitoring**
- Check Google Search Console for crawl errors
- Monitor Netlify analytics for 404s
- Check server logs
- Test random old URLs

**Week 1: Ongoing monitoring**
- Review analytics for drop in traffic
- Check search engine rankings
- Monitor for broken link reports
- Add redirects for any missed URLs

## Quick Reference: What Changes

### Configuration Files

| File | Change |
|------|--------|
| `src/docs/docusaurus.config.ts` | `baseUrl: '/docs/'` → `baseUrl: '/'` |
| `netlify.toml` | Add redirects, change publish dir (optional) |
| `.github/workflows/deploy-docusaurus.yml` | Change publish-dir (optional) |

### URLs

| Before | After |
|--------|-------|
| `/docs/blog/2020/09/08/post` | `/blog/2020/09/08/post` (301 redirect) |
| `/docs/docs/intro` | `/docs/intro` (301 redirect) |
| `/docs/` | `/blog` (301 redirect) |
| `/posts/post` | `/blog/*/post` (301 redirect, if Statiq) |

### Build Output

| Before | After |
|--------|-------|
| `combined-site/` with Statiq at root | `src/docs/build/` at root (Option A) |
| `combined-site/docs/` with Docusaurus | OR `combined-site/` with Docusaurus at root (Option B) |

## Rollback Plan

If something goes wrong:

1. **Revert Git commit:**
   ```bash
   git revert HEAD
   git push
   ```

2. **Or restore previous Netlify deployment:**
   - Go to Netlify dashboard
   - Find previous deployment
   - Click "Publish deploy"

3. **Emergency fix:**
   - Change `baseUrl` back to `/docs/`
   - Remove new redirects from `netlify.toml`
   - Push and deploy

## Common Issues

### Issue: All pages return 404

**Cause:** SPA redirect rule not at the end

**Fix:** Move SPA rule (`from = "/*"`) to the end of redirects in `netlify.toml`

### Issue: Redirect loop

**Cause:** Circular redirect

**Fix:** Check redirect rules don't create A→B→A loop

### Issue: Images not loading

**Cause:** Image paths still reference `/docs/`

**Fix:** Check `docusaurus.config.ts` has `baseUrl: '/'` and rebuild

### Issue: CSS/JS not loading

**Cause:** Incorrect `baseUrl`

**Fix:** Ensure `baseUrl: '/'` and clear cache

## Success Checklist

- [ ] `baseUrl` changed to `/`
- [ ] Site builds locally without errors
- [ ] All pages accessible at new URLs
- [ ] Redirects added to `netlify.toml`
- [ ] GitHub Actions updated (if needed)
- [ ] Tested in preview environment
- [ ] All old URLs redirect correctly
- [ ] Deployed to production
- [ ] Production URLs verified
- [ ] Monitoring in place
- [ ] Documentation updated

## Next Steps

After successful deployment:

1. **Week 1:** Monitor closely for issues
2. **Week 2-4:** Continue monitoring, add missing redirects
3. **Month 1:** Review SEO impact in Search Console
4. **Month 2:** Consider removing old redirects (if any)
5. **Month 3+:** Archive or remove Statiq code (if not needed)

## Get Help

If you encounter issues:

1. Check the detailed guides:
   - `MOVE_BLOG_TO_ROOT_DESIGN.md` - Full design document
   - `NETLIFY_REDIRECT_EXAMPLES.md` - Redirect examples
   - `DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md` - Client redirects

2. Test with:
   - `curl -I <url>` - Check HTTP status and redirects
   - Browser DevTools - Check network requests
   - Netlify deploy log - Check build errors

3. Useful resources:
   - [Docusaurus Documentation](https://docusaurus.io/docs)
   - [Netlify Redirects](https://docs.netlify.com/routing/redirects/)
   - [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## Files Created

This implementation creates these documentation files:

- `MOVE_BLOG_TO_ROOT_DESIGN.md` - Complete design document
- `NETLIFY_REDIRECT_EXAMPLES.md` - Netlify redirect guide
- `DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md` - Docusaurus plugin guide
- `QUICK_IMPLEMENTATION_GUIDE.md` - This file

---

**Created:** 2025-10-10  
**For Issue:** Move blog to root of Docusaurus site  
**Estimated Time:** 2-4 hours implementation + 1 week monitoring
