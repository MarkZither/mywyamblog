# Move Blog to Root - Documentation Index

This directory contains comprehensive documentation for moving the Docusaurus blog from `/docs/` to the root of the site.

## 📚 Documentation Files

### 1. **QUICK_IMPLEMENTATION_GUIDE.md** ⚡ START HERE
   - **Purpose:** Step-by-step implementation guide
   - **Audience:** Developers implementing the change
   - **Time:** 10-minute read, 2-4 hour implementation
   - **Content:**
     - Pre-implementation checklist
     - Step-by-step instructions
     - Testing procedures
     - Rollback plan
     - Success criteria

### 2. **MOVE_BLOG_TO_ROOT_DESIGN.md** 📋 COMPLETE REFERENCE
   - **Purpose:** Comprehensive design document
   - **Audience:** Architects, decision-makers, implementers
   - **Time:** 30-minute read
   - **Content:**
     - Current vs. proposed architecture
     - URL preservation strategies
     - Multiple solution options with pros/cons
     - Implementation phases
     - Risk analysis
     - Testing strategy
     - Success metrics

### 3. **NETLIFY_REDIRECT_EXAMPLES.md** 🔀 REDIRECT REFERENCE
   - **Purpose:** Complete guide to Netlify redirects
   - **Audience:** Developers configuring redirects
   - **Time:** 20-minute read
   - **Content:**
     - Netlify redirect syntax
     - Pattern matching examples
     - Specific redirect scenarios
     - Testing procedures
     - Complete configuration example
     - Troubleshooting guide

### 4. **DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md** 🔌 PLUGIN GUIDE
   - **Purpose:** Guide to Docusaurus client-side redirects
   - **Audience:** Developers considering client-side redirects
   - **Time:** 15-minute read
   - **Content:**
     - Plugin installation
     - Configuration options
     - Dynamic redirect generation
     - Hybrid approach (Netlify + Docusaurus)
     - Performance considerations
     - Troubleshooting

### 5. **DOCUSAURUS_URL_CUSTOMIZATION.md** 🔧 URL STRUCTURE
   - **Purpose:** Guide to customizing Docusaurus blog URLs
   - **Audience:** Developers wanting to match Statiq URL structure
   - **Time:** 10-minute read
   - **Content:**
     - URL structure configuration options
     - Matching Statiq `/posts/YYYY-MM-DD-slug` format
     - `routeBasePath` and `blogPostPermalink` settings
     - Redirect strategies for URL changes
     - Complete configuration examples
     - Recommendations

## 🎯 Quick Start

### For Implementers
1. Read **QUICK_IMPLEMENTATION_GUIDE.md**
2. Decide on configuration options (Netlify-only vs. hybrid)
3. Follow step-by-step instructions
4. Reference other docs as needed

### For Decision Makers
1. Read **MOVE_BLOG_TO_ROOT_DESIGN.md** (Executive Summary)
2. Review "Recommended Approach" section
3. Answer questions in "Questions to Resolve"
4. Approve implementation plan

### For Troubleshooting
1. Check **QUICK_IMPLEMENTATION_GUIDE.md** "Common Issues"
2. Consult **NETLIFY_REDIRECT_EXAMPLES.md** "Troubleshooting"
3. Review **DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md** "Troubleshooting"

## 📊 Document Comparison

| Document | Length | Depth | Use Case |
|----------|--------|-------|----------|
| Quick Implementation Guide | Short | Practical | Implementing now |
| Move Blog Design | Long | Strategic | Planning, approvals |
| Netlify Redirects | Medium | Technical | Configuring redirects |
| Docusaurus Plugin | Medium | Technical | Client-side redirects |

## 🔑 Key Concepts

### baseUrl
The path prefix for all Docusaurus URLs. Currently `/docs/`, changing to `/`.

### Redirect Strategies
- **Server-side (Netlify):** Best for SEO, works without JavaScript
- **Client-side (Docusaurus):** Good for SPA navigation, requires JavaScript
- **Hybrid:** Use both for maximum compatibility

### URL Structure
- **Current:** `https://blog.mark-burton.com/docs/blog/2020/09/08/post`
- **Target:** `https://blog.mark-burton.com/blog/2020/09/08/post`

## 🎬 Implementation Overview

### Minimal Changes Required
1. Change `baseUrl: '/docs/'` → `baseUrl: '/'` in `docusaurus.config.ts`
2. Add redirects to `netlify.toml`
3. Update deployment workflow (optional)

### Impact
- ✅ All new URLs at root level
- ✅ Old URLs redirected via 301
- ✅ No content changes needed
- ✅ Zero downtime deployment
- ⚠️ Temporary SEO impact (1-2 weeks)

## 📋 Decision Matrix

### Choose Your Approach

#### Option A: Netlify Redirects Only (Recommended)
- **Pros:** Simple, SEO-friendly, works everywhere
- **Cons:** Uses HTTP redirects
- **Best for:** Production, SEO-critical sites
- **See:** NETLIFY_REDIRECT_EXAMPLES.md

#### Option B: Docusaurus Client Redirects Only
- **Pros:** No HTTP redirects, client-side routing
- **Cons:** Requires JavaScript, not ideal for SEO
- **Best for:** SPAs, internal tools
- **See:** DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md

#### Option C: Hybrid (Both)
- **Pros:** Maximum compatibility, best user experience
- **Cons:** More complex configuration
- **Best for:** Public sites with high traffic
- **See:** Both redirect guides

### Choose Your Deployment

#### Option 1: Docusaurus Only
- Remove Statiq completely
- Simpler deployment
- Single build process
- **Recommended for:** New implementations

#### Option 2: Keep Statiq at /statiq/
- Keep old content accessible
- Reference for migration
- More complex deployment
- **Recommended for:** Transitional period

## ✅ Success Criteria Summary

After implementation:
1. All existing URLs work (via 200 or 301)
2. New URLs at root level work
3. No broken internal links
4. Site builds without errors
5. SEO maintained (after transition period)
6. Performance maintained

## 🚨 Important Notes

### Do This
- ✅ Test thoroughly in preview environment
- ✅ Monitor 404s after deployment
- ✅ Keep redirects simple and documented
- ✅ Test on multiple devices/browsers
- ✅ Have rollback plan ready

### Don't Do This
- ❌ Remove redirects too soon (keep 6-12 months)
- ❌ Create redirect chains (A→B→C)
- ❌ Deploy without testing
- ❌ Forget to update internal documentation
- ❌ Ignore monitoring after deployment

## 🔍 Finding Information

### By Task

| Task | Document |
|------|----------|
| Implementing the change | QUICK_IMPLEMENTATION_GUIDE.md |
| Understanding the architecture | MOVE_BLOG_TO_ROOT_DESIGN.md |
| Writing redirect rules | NETLIFY_REDIRECT_EXAMPLES.md |
| Using Docusaurus plugin | DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md |

### By Question

| Question | Answer Location |
|----------|-----------------|
| How long will this take? | QUICK_IMPLEMENTATION_GUIDE.md (Timeline) |
| What are the risks? | MOVE_BLOG_TO_ROOT_DESIGN.md (Risks section) |
| How do I write redirects? | NETLIFY_REDIRECT_EXAMPLES.md (Examples) |
| Can I avoid HTTP redirects? | DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md |
| How do I test? | QUICK_IMPLEMENTATION_GUIDE.md (Step 6) |
| What if it breaks? | QUICK_IMPLEMENTATION_GUIDE.md (Rollback) |

### By Role

| Role | Start With |
|------|------------|
| Developer | QUICK_IMPLEMENTATION_GUIDE.md |
| Architect | MOVE_BLOG_TO_ROOT_DESIGN.md |
| DevOps | NETLIFY_REDIRECT_EXAMPLES.md |
| Manager | MOVE_BLOG_TO_ROOT_DESIGN.md (Executive Summary) |

## 📞 Support Resources

### Internal
- `MIGRATION.md` - Overall migration strategy (Statiq → Docusaurus)
- `.github/copilot-instructions.md` - Development guidelines
- `README.md` - Repository overview

### External
- [Docusaurus Documentation](https://docusaurus.io/docs)
- [Netlify Redirect Documentation](https://docs.netlify.com/routing/redirects/)
- [Google SEO: 301 Redirects](https://developers.google.com/search/docs/crawling-indexing/301-redirects)

## 🎓 Learning Path

### For New Team Members
1. **Week 1:** Read MOVE_BLOG_TO_ROOT_DESIGN.md
2. **Week 2:** Study NETLIFY_REDIRECT_EXAMPLES.md
3. **Week 3:** Review DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md
4. **Week 4:** Practice with QUICK_IMPLEMENTATION_GUIDE.md in dev environment

### For Quick Onboarding
1. Read QUICK_IMPLEMENTATION_GUIDE.md (10 minutes)
2. Skim NETLIFY_REDIRECT_EXAMPLES.md (5 minutes)
3. Implement in preview environment (1 hour)
4. Deploy to production (30 minutes)

## 📝 Document Maintenance

### When to Update

Update these documents when:
- URL structure changes
- New redirect patterns emerge
- Docusaurus version upgrades
- Netlify features change
- Issues discovered during implementation

### Ownership

These documents are maintained by the development team and should be reviewed:
- **Quarterly:** For accuracy
- **On major changes:** Docusaurus/Netlify updates
- **After implementation:** Lessons learned

## 🏆 Best Practices

### Documentation
- Keep examples up-to-date
- Document all decisions
- Include troubleshooting guides
- Provide test cases

### Implementation
- Test in preview first
- Monitor after deployment
- Keep redirects for 6-12 months
- Document all custom redirects

### Maintenance
- Review redirect usage quarterly
- Remove unused redirects
- Update documentation
- Share lessons learned

## 📅 Timeline

Based on QUICK_IMPLEMENTATION_GUIDE.md:

| Phase | Duration | Tasks |
|-------|----------|-------|
| Planning | 1-2 hours | Read docs, make decisions |
| Implementation | 2-4 hours | Code changes, testing |
| Preview Testing | 1 hour | Test in preview environment |
| Production Deploy | 30 minutes | Deploy and verify |
| Monitoring | 1 week | Active monitoring, fixes |
| Review | 1 month | SEO impact, analytics |

**Total:** ~1 week from start to stable

## 🎉 Success Stories

After successful implementation:
- ✅ All URLs at root level (`/blog/*` instead of `/docs/blog/*`)
- ✅ Cleaner URLs for users and SEO
- ✅ Simplified architecture (optional: remove Statiq)
- ✅ Maintained all existing links
- ✅ Zero downtime migration

## 📌 Quick Reference

### Key Files to Modify
1. `src/docs/docusaurus.config.ts` - Change baseUrl
2. `netlify.toml` - Add redirects
3. `.github/workflows/deploy-docusaurus.yml` - Update deployment (optional)

### Key Commands
```bash
# Test locally
cd src/docs && npm start

# Build and test
npm run build && npm run serve

# Test redirect
curl -I https://site.com/old-url

# Deploy
git push origin main
```

### Key URLs to Test
- Old: `/docs/blog/2020/09/08/post` → New: `/blog/2020/09/08/post`
- Old: `/docs/docs/intro` → New: `/docs/intro`
- Old: `/posts/post` → New: `/blog/*/post`

---

## 📖 Reading Order

### For Quick Implementation
1. QUICK_IMPLEMENTATION_GUIDE.md
2. NETLIFY_REDIRECT_EXAMPLES.md (as reference)

### For Comprehensive Understanding
1. MOVE_BLOG_TO_ROOT_DESIGN.md (overview)
2. NETLIFY_REDIRECT_EXAMPLES.md (redirects)
3. DOCUSAURUS_CLIENT_REDIRECTS_GUIDE.md (plugin)
4. QUICK_IMPLEMENTATION_GUIDE.md (implementation)

### For Troubleshooting
1. QUICK_IMPLEMENTATION_GUIDE.md (common issues)
2. Relevant specific guide (Netlify or Docusaurus)
3. MOVE_BLOG_TO_ROOT_DESIGN.md (risks section)

---

**Last Updated:** 2025-10-10  
**Issue:** Design solution to move blog to root  
**Status:** Documentation complete, ready for implementation
