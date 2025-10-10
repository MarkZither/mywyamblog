# Moving Docusaurus Blog to Root - Solution Summary

> **Status:** ✅ Planning Complete - Ready for Implementation  
> **Estimated Time:** 2-4 hours implementation + 1 week monitoring  
> **Risk Level:** 🟢 Low (with proper testing and redirects)

## 🎯 Goal

Move Docusaurus blog from `/docs/` to root (`/`) while preserving all existing URLs.

## 📐 Current vs. Proposed Architecture

### Current (Hybrid)
```
blog.mark-burton.com/
├── /              → Statiq blog (legacy .NET)
└── /docs/         → Docusaurus blog
    ├── /blog/     → Blog posts
    └── /docs/     → Documentation
```

### Proposed (Docusaurus Primary)
```
blog.mark-burton.com/
├── /              → Docusaurus blog (new primary)
│   ├── /blog/     → Blog posts
│   └── /docs/     → Documentation
└── /statiq/       → Statiq (optional, for reference)
```

## 🔄 URL Changes

| Current URL | New URL | How |
|-------------|---------|-----|
| `/docs/blog/2020/09/08/post` | `/blog/2020/09/08/post` | 301 redirect |
| `/docs/docs/intro` | `/docs/intro` | 301 redirect |
| `/docs/` | `/blog` | 301 redirect |
| `/posts/post` (Statiq) | `/blog/*/post` | 301 redirect |

## ✨ Key Benefits

- ✅ Cleaner URLs (`/blog/post` vs `/docs/blog/post`)
- ✅ Better SEO (no `/docs/` prefix)
- ✅ Simplified architecture (single primary system)
- ✅ All existing URLs preserved (via redirects)
- ✅ Zero downtime migration
- ✅ Easy to implement (3 file changes)

## 📝 Minimal Changes Required

### 1. Update Docusaurus Config (1 line)
```typescript
// src/docs/docusaurus.config.ts
baseUrl: '/',  // ← Change from '/docs/'
```

### 2. Add Netlify Redirects (~10 lines)
```toml
# netlify.toml
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
```

### 3. Update Deployment (optional)
```yaml
# .github/workflows/deploy-docusaurus.yml
publish-dir: './src/docs/build'  # ← Change from combined-site
```

## 📚 Documentation Suite

All documentation is in the repository root:

### 🚀 Start Here
- **[QUICK_IMPLEMENTATION_GUIDE.md](./QUICK_IMPLEMENTATION_GUIDE.md)** - Step-by-step guide (10-min read)

### 📖 Reference Guides
- **[BLOG_MIGRATION_DOCS_INDEX.md](./BLOG_MIGRATION_DOCS_INDEX.md)** - Documentation index
- **[MOVE_BLOG_TO_ROOT_DESIGN.md](./MOVE_BLOG_TO_ROOT_DESIGN.md)** - Complete design (30-min read)
- **[NETLIFY_REDIRECT_EXAMPLES.md](./NETLIFY_REDIRECT_EXAMPLES.md)** - Redirect patterns
- **[DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md](./DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md)** - Plugin guide
- **[DOCUSAURUS_URL_CUSTOMIZATION.md](./DOCUSAURUS_URL_CUSTOMIZATION.md)** - URL structure customization

## 🎬 Implementation Steps

### Quick Version (2-4 hours)

1. **Change config** (5 min)
   ```bash
   # Edit src/docs/docusaurus.config.ts
   # Change baseUrl to '/'
   ```

2. **Test locally** (10 min)
   ```bash
   cd src/docs
   npm start
   # Verify at http://localhost:3000/blog
   ```

3. **Add redirects** (10 min)
   ```bash
   # Edit netlify.toml
   # Add redirect rules (see NETLIFY_REDIRECT_EXAMPLES.md)
   ```

4. **Update deployment** (10 min)
   ```bash
   # Edit .github/workflows/deploy-docusaurus.yml
   # Update publish-dir
   ```

5. **Test in preview** (20 min)
   ```bash
   git commit -am "Move blog to root"
   git push
   # Wait for preview build
   # Test old URLs redirect correctly
   ```

6. **Deploy to production** (5 min)
   ```bash
   git push origin main
   # Monitor deployment
   ```

7. **Verify production** (15 min)
   ```bash
   # Test all critical URLs
   # Check redirects work
   # Monitor for 404s
   ```

## 🔍 Testing Checklist

### Before Deployment
- [ ] Local build succeeds
- [ ] `/blog/*` accessible locally
- [ ] `/docs/*` accessible locally
- [ ] Images load correctly
- [ ] Navigation works

### Preview Environment
- [ ] Old URLs return 301 status
- [ ] New URLs return 200 status
- [ ] Redirects point to correct destination
- [ ] No broken links
- [ ] Mobile responsive

### Production
- [ ] All old URLs work (via 301 or 200)
- [ ] New URLs work directly
- [ ] SEO meta tags present
- [ ] Sitemap updated
- [ ] Analytics tracking works

## 🚨 Risk Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Broken external links | High | Comprehensive 301 redirects |
| SEO ranking loss | Medium | Use 301 redirects (temporary impact) |
| Deployment failure | High | Test in preview, have rollback plan |
| Missing redirects | Medium | Monitor 404s, add as needed |

## 🔄 Rollback Plan

If something goes wrong:

```bash
# Quick rollback
git revert HEAD
git push

# Or restore previous Netlify deployment
# Via Netlify dashboard → Find previous deployment → Publish
```

## 📊 Success Metrics

After deployment, verify:
- [ ] All old URLs return 200 or 301 (not 404)
- [ ] New URLs at root level work
- [ ] Zero broken internal links
- [ ] Build succeeds without errors
- [ ] Page load time maintained
- [ ] SEO maintained (after transition period)

## ⏱️ Timeline

| Phase | Duration | Activity |
|-------|----------|----------|
| **Planning** | 1-2 hours | Read docs, make decisions |
| **Implementation** | 2-4 hours | Code changes, local testing |
| **Preview Testing** | 1 hour | Deploy to preview, test |
| **Production** | 30 min | Deploy, verify |
| **Monitoring** | 1 week | Active monitoring, fixes |
| **Review** | 1 month | SEO impact, analytics |

**Total:** ~1 week from planning to stable

## 💡 Recommendations

### Recommended Approach
1. ✅ Use Netlify server-side redirects (primary)
2. ✅ Optionally add Docusaurus client redirects (fallback)
3. ✅ Keep implementation simple
4. ✅ Test thoroughly in preview
5. ✅ Monitor after deployment

### Alternative Approaches
- **Client-only redirects:** Use `@docusaurus/plugin-client-redirects` (requires JS)
- **Keep Statiq:** Deploy Statiq at `/statiq/` for reference
- **Phased migration:** Migrate content gradually over time

See [MOVE_BLOG_TO_ROOT_DESIGN.md](./MOVE_BLOG_TO_ROOT_DESIGN.md) for detailed comparison.

## 🎓 Decision Points

Before implementing, decide:

### 1. Redirect Strategy
- [ ] **Netlify only** (recommended - SEO-friendly)
- [ ] **Docusaurus only** (client-side, requires JS)
- [ ] **Hybrid** (both - maximum compatibility)

### 2. Statiq Content
- [ ] **Remove completely** (simpler deployment)
- [ ] **Keep at /statiq/** (transitional reference)

### 3. Custom Redirects
- [ ] **None** (keep all URLs as-is)
- [ ] **Some** (list posts to rename)

### 4. Timeline
- [ ] **Immediate** (deploy to production ASAP)
- [ ] **Phased** (test in preview for 1-2 weeks)

## 📞 Support

### Documentation
- Start with [QUICK_IMPLEMENTATION_GUIDE.md](./QUICK_IMPLEMENTATION_GUIDE.md)
- Reference [NETLIFY_REDIRECT_EXAMPLES.md](./NETLIFY_REDIRECT_EXAMPLES.md) for redirects
- Consult [MOVE_BLOG_TO_ROOT_DESIGN.md](./MOVE_BLOG_TO_ROOT_DESIGN.md) for details

### External Resources
- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Netlify Redirects](https://docs.netlify.com/routing/redirects/)
- [Google: 301 Redirects](https://developers.google.com/search/docs/crawling-indexing/301-redirects)

## 🏁 Next Steps

1. **Review this summary** and the [QUICK_IMPLEMENTATION_GUIDE.md](./QUICK_IMPLEMENTATION_GUIDE.md)
2. **Make decisions** on redirect strategy, Statiq handling, timeline
3. **Implement changes** following the quick guide
4. **Test in preview** thoroughly before production
5. **Deploy to production** with monitoring
6. **Monitor for 1 week** and fix any issues

## ✅ Completion Checklist

- [ ] Read documentation (QUICK_IMPLEMENTATION_GUIDE.md)
- [ ] Make implementation decisions
- [ ] Change `baseUrl` to `/`
- [ ] Add redirects to `netlify.toml`
- [ ] Update deployment workflow (optional)
- [ ] Test locally
- [ ] Test in preview environment
- [ ] Deploy to production
- [ ] Verify all URLs work
- [ ] Monitor for issues
- [ ] Update external references (optional)
- [ ] Archive this documentation

---

## 📊 At a Glance

| Aspect | Details |
|--------|---------|
| **Files to Change** | 2-3 files (docusaurus.config.ts, netlify.toml, optionally workflow) |
| **Lines of Code** | ~20 lines total |
| **Implementation Time** | 2-4 hours |
| **Testing Time** | 1-2 hours |
| **Risk Level** | Low (with proper testing) |
| **SEO Impact** | Temporary (1-2 weeks) |
| **Downtime** | Zero |
| **Rollback Difficulty** | Easy (git revert or Netlify UI) |

---

**Created:** 2025-10-10  
**For Issue:** Design solution to move blog to root  
**Status:** ✅ Planning complete, ready to implement  
**Owner:** Development team

---

## 🎉 Why This Is a Great Solution

1. **Simple:** Only 2-3 files need changes
2. **Safe:** 301 redirects preserve all existing URLs
3. **Fast:** 2-4 hours to implement
4. **Reversible:** Easy rollback if needed
5. **SEO-friendly:** Standard 301 redirects
6. **Zero downtime:** No service interruption
7. **Well-documented:** Comprehensive guides available
8. **Tested approach:** Standard practice for site migrations
