# 📖 Blog Migration Documentation

> **Planning task for:** Moving Docusaurus blog from `/docs/` to root (`/`)  
> **Status:** ✅ Complete - Ready for implementation  
> **Issue:** Design a solution to move the docusaurus blog post to the root of the docusaurus site

## 🎯 Quick Start

**For implementers:** Read [SOLUTION_SUMMARY.md](./SOLUTION_SUMMARY.md) then [QUICK_IMPLEMENTATION_GUIDE.md](./QUICK_IMPLEMENTATION_GUIDE.md)

**For decision makers:** Read [SOLUTION_SUMMARY.md](./SOLUTION_SUMMARY.md) then [MOVE_BLOG_TO_ROOT_DESIGN.md](./MOVE_BLOG_TO_ROOT_DESIGN.md)

## 📚 Documentation Files

| File | Purpose | Audience | Time |
|------|---------|----------|------|
| **[SOLUTION_SUMMARY.md](./SOLUTION_SUMMARY.md)** | Visual overview with quick facts | Everyone | 10 min |
| **[QUICK_IMPLEMENTATION_GUIDE.md](./QUICK_IMPLEMENTATION_GUIDE.md)** | Step-by-step implementation | Developers | 10 min read<br>2-4 hrs work |
| **[MOVE_BLOG_TO_ROOT_DESIGN.md](./MOVE_BLOG_TO_ROOT_DESIGN.md)** | Complete design document | Architects | 30 min |
| **[NETLIFY_REDIRECT_EXAMPLES.md](./NETLIFY_REDIRECT_EXAMPLES.md)** | Redirect patterns & examples | DevOps | 20 min |
| **[DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md](./DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md)** | Plugin guide | Developers | 15 min |
| **[BLOG_MIGRATION_DOCS_INDEX.md](./BLOG_MIGRATION_DOCS_INDEX.md)** | Navigation hub | Everyone | 5 min |

## 🎬 Solution Summary

### The Problem
- Blog currently at `/docs/blog/[date]/[slug]`
- Want to move to `/blog/[date]/[slug]` (remove `/docs/` prefix)
- Must preserve all existing URLs
- Ideally without HTTP redirects (but 301s acceptable)
- Support for renaming specific posts

### The Solution

**Minimal changes (2-3 files, ~20 lines total):**

1. Change `baseUrl: '/docs/'` → `baseUrl: '/'` in `docusaurus.config.ts`
2. Add 301 redirects in `netlify.toml` for old URLs
3. Optionally update deployment workflow

**Results:**
- ✅ All existing URLs work (via 301 redirects)
- ✅ New clean URLs at root level
- ✅ Zero downtime migration
- ✅ 2-4 hour implementation time
- ✅ Standard SEO-friendly approach

### Architecture Change

```
BEFORE:
blog.mark-burton.com/
├── /              → Statiq (legacy)
└── /docs/         → Docusaurus
    ├── /blog/     → Blog posts
    └── /docs/     → Documentation

AFTER:
blog.mark-burton.com/
├── /              → Docusaurus (primary)
│   ├── /blog/     → Blog posts (no /docs/ prefix!)
│   └── /docs/     → Documentation
└── /statiq/       → Statiq (optional)
```

### URL Changes

| Current URL | New URL | Method |
|-------------|---------|--------|
| `/docs/blog/2020/09/08/post` | `/blog/2020/09/08/post` | 301 redirect |
| `/docs/docs/intro` | `/docs/intro` | 301 redirect |
| `/docs/` | `/blog` | 301 redirect |
| `/posts/post` | `/blog/*/post` | 301 redirect |

## ✅ Questions Answered

### ✓ Can all existing blog URLs work without 301/308?

**Answer:** Not for URLs that change paths, but 301 redirects are:
- SEO-friendly (standard practice)
- Well-handled by Google (1-2 week transition)
- Transparent to users (instant redirect)
- The industry-standard solution

**Recommendation:** Use Netlify 301 redirects (server-side)

### ✓ How to handle renamed files with working URLs?

**Answer:** Add specific redirects in `netlify.toml`:

```toml
[[redirects]]
  from = "/blog/old-name"
  to = "/blog/new-name"
  status = 301
```

Document renamed posts in comments or separate file.

### ✓ Handle redirects in Docusaurus or Netlify?

**Answer:** Three options:

1. **Netlify only** (recommended)
   - Server-side 301 redirects
   - Best for SEO
   - Works without JavaScript

2. **Docusaurus only** (alternative)
   - Client-side redirects
   - Requires JavaScript
   - Good for SPAs

3. **Hybrid** (maximum compatibility)
   - Use both
   - Netlify for SEO-critical
   - Docusaurus for convenience

**Recommendation:** Use Netlify redirects as primary, optionally add Docusaurus as fallback.

## 🚀 Implementation Timeline

| Phase | Duration | Activity |
|-------|----------|----------|
| **Planning** | 1-2 hours | Review docs, make decisions |
| **Implementation** | 2-4 hours | Code changes, testing |
| **Preview** | 1 hour | Deploy & test in preview |
| **Production** | 30 min | Deploy & verify |
| **Monitoring** | 1 week | Active monitoring, fixes |
| **Review** | 1 month | SEO impact assessment |

**Total:** ~1 week from planning to stable

## 📋 Pre-Implementation Decisions

Before implementing, decide:

1. **Redirect strategy:**
   - [ ] Netlify only (recommended)
   - [ ] Docusaurus only (requires JS)
   - [ ] Hybrid (both)

2. **Statiq content:**
   - [ ] Remove completely
   - [ ] Keep at `/statiq/` for reference

3. **Posts to rename:**
   - [ ] None - keep all URLs as-is
   - [ ] List specific posts to rename

4. **Timeline:**
   - [ ] Immediate deployment
   - [ ] Phased testing (1-2 weeks preview)

## 🔧 Files to Modify

### Required Changes

1. **`src/docs/docusaurus.config.ts`** (1 line)
   ```typescript
   baseUrl: '/',  // ← Change from '/docs/'
   ```

2. **`netlify.toml`** (~10 lines)
   ```toml
   [[redirects]]
     from = "/docs/blog/*"
     to = "/blog/:splat"
     status = 301
     force = true
   ```

### Optional Changes

3. **`.github/workflows/deploy-docusaurus.yml`** (1 line)
   ```yaml
   publish-dir: './src/docs/build'  # ← From combined-site
   ```

## ✅ Success Criteria

After implementation:
- [ ] All existing URLs return 200 or 301 (not 404)
- [ ] New URLs at root level work correctly
- [ ] No broken internal links
- [ ] Site builds without errors
- [ ] Performance maintained
- [ ] SEO maintained (after transition)

## 🎓 Learning Resources

### Internal Documentation
- [SOLUTION_SUMMARY.md](./SOLUTION_SUMMARY.md) - Start here
- [QUICK_IMPLEMENTATION_GUIDE.md](./QUICK_IMPLEMENTATION_GUIDE.md) - Implementation steps
- [MOVE_BLOG_TO_ROOT_DESIGN.md](./MOVE_BLOG_TO_ROOT_DESIGN.md) - Complete design
- [NETLIFY_REDIRECT_EXAMPLES.md](./NETLIFY_REDIRECT_EXAMPLES.md) - Redirect patterns
- [DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md](./DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md) - Plugin guide
- [BLOG_MIGRATION_DOCS_INDEX.md](./BLOG_MIGRATION_DOCS_INDEX.md) - Documentation index

### External Resources
- [Docusaurus Configuration](https://docusaurus.io/docs/configuration)
- [Docusaurus Blog](https://docusaurus.io/docs/blog)
- [Netlify Redirects](https://docs.netlify.com/routing/redirects/)
- [Google on 301 Redirects](https://developers.google.com/search/docs/crawling-indexing/301-redirects)

## 🚨 Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Broken external links | High | Low | Comprehensive redirects |
| SEO ranking loss | Medium | Low | 301 redirects (temporary) |
| Deployment failure | High | Low | Test in preview |
| Missing redirects | Medium | Medium | Monitor 404s, add as needed |

**Overall Risk:** 🟢 Low (with proper testing)

## 📊 At a Glance

| Metric | Value |
|--------|-------|
| **Files to change** | 2-3 files |
| **Lines of code** | ~20 lines |
| **Implementation** | 2-4 hours |
| **Testing** | 1-2 hours |
| **Risk level** | Low |
| **SEO impact** | Temporary (1-2 weeks) |
| **Downtime** | Zero |
| **Rollback** | Easy (git revert) |

## 🎉 Why This Solution Works

1. **Simple:** Only 2-3 files need changes
2. **Safe:** 301 redirects preserve all URLs
3. **Fast:** 2-4 hours to implement
4. **Reversible:** Easy rollback if needed
5. **SEO-friendly:** Standard 301 redirects
6. **Zero downtime:** No service interruption
7. **Well-documented:** 6 comprehensive guides
8. **Proven approach:** Standard practice for site migrations

## 🏁 Next Steps

1. **Review:** Read [SOLUTION_SUMMARY.md](./SOLUTION_SUMMARY.md)
2. **Decide:** Answer pre-implementation questions above
3. **Implement:** Follow [QUICK_IMPLEMENTATION_GUIDE.md](./QUICK_IMPLEMENTATION_GUIDE.md)
4. **Test:** Deploy to preview environment
5. **Deploy:** Push to production with monitoring
6. **Monitor:** Check for issues over 1 week
7. **Complete:** Archive this documentation

---

## 📞 Support

### Getting Help
- Check [QUICK_IMPLEMENTATION_GUIDE.md](./QUICK_IMPLEMENTATION_GUIDE.md) "Common Issues"
- Review [NETLIFY_REDIRECT_EXAMPLES.md](./NETLIFY_REDIRECT_EXAMPLES.md) "Troubleshooting"
- Consult [DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md](./DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md) "Troubleshooting"

### Contact
- Repository issues: [GitHub Issues](https://github.com/MarkZither/mywyamblog/issues)
- Original issue: Design solution to move blog to root

---

**Created:** 2025-10-10  
**Status:** ✅ Planning complete - Ready for implementation  
**Documentation:** 6 files, 60+ pages  
**Estimated effort:** 2-4 hours implementation + 1 week monitoring

---

*This planning task provides everything needed to successfully migrate the Docusaurus blog from `/docs/` to root while preserving all existing URLs and maintaining zero downtime.*
