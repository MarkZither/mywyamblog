# Hybrid Blog Migration: Statiq → Docusaurus

This repository demonstrates a hybrid approach to migrating from Statiq to Docusaurus, allowing both systems to run side by side during the transition.

## 🏗️ Architecture

```
blog.mark-burton.com/
├── /                    # Statiq blog (original content)
└── /docs/               # Docusaurus blog (new content)
```

## 🚀 Quick Start

### Local Development

1. **Start both development servers:**
   ```bash
   # Terminal 1: Statiq (if needed)
   cd src/blog
   dotnet run

   # Terminal 2: Docusaurus
   cd docs
   npm start
   ```

2. **Or use the build script:**
   ```powershell
   # Build both
   .\build.ps1

   # Build only Docusaurus
   .\build.ps1 -OnlyDocusaurus

   # Build only Statiq
   .\build.ps1 -OnlyStatiq
   ```

### Migration Tools

**Migrate posts from Statiq to Docusaurus:**
```bash
cd docs
npm run migrate-posts
```

## 📂 Directory Structure

```
mywyamblog/
├── src/blog/                    # 🏠 Original Statiq blog
│   ├── input/posts/            # Statiq blog posts
│   ├── input/assets/           # Statiq assets
│   └── ...
├── docs/                        # 🆕 New Docusaurus setup
│   ├── blog/                   # Migrated + new blog posts
│   ├── docs/                   # Documentation
│   ├── static/                 # Static assets
│   ├── migrate-posts.js        # Migration script
│   └── ...
├── .github/workflows/           # GitHub Actions
│   ├── deploy-prod.yml         # Original Statiq deployment
│   └── deploy-docusaurus.yml   # New hybrid deployment
├── netlify.toml                # Netlify configuration
└── build.ps1                  # Build script
```

## 🔄 Migration Strategy

### Phase 1: Hybrid Setup ✅ (Current)
- [x] Docusaurus installed alongside Statiq
- [x] Both systems configured and running
- [x] GitHub Actions updated for hybrid deployment
- [x] Migration script created
- [x] Netlify configuration updated

### Phase 2: Content Migration (In Progress)
- [ ] Migrate existing blog posts using migration script
- [ ] Update internal links and references
- [ ] Migrate static assets (images, files)
- [ ] Test all functionality in Docusaurus

### Phase 3: Complete Migration (Future)
- [ ] Switch main domain to Docusaurus
- [ ] Set up redirects from old Statiq URLs
- [ ] Remove Statiq components
- [ ] Update GitHub Actions to Docusaurus-only

## 🛠️ Migration Tools

### Post Migration Script
Located at `docs/migrate-posts.js`, this script:
- ✅ Converts Statiq frontmatter to Docusaurus format
- ✅ Handles multi-line YAML values
- ✅ Extracts tags and metadata
- ✅ Preserves dates from filenames
- ✅ Maps author information

**Usage:**
```bash
cd docs
npm run migrate-posts
```

### What gets migrated:
- ✅ **Title**: Statiq `Title` → Docusaurus `title`
- ✅ **Author**: Statiq `Author` → Docusaurus `authors`
- ✅ **Tags**: Statiq `Tags` → Docusaurus `tags`
- ✅ **Description**: Statiq `Lead` → Docusaurus `description`
- ✅ **Date**: Extracted from filename or frontmatter

### Manual migration needed:
- 🔧 **Images**: Update image paths from `/assets/` to `/img/`
- 🔧 **Internal links**: Update links to other posts
- 🔧 **Code blocks**: May need syntax highlighting adjustments

## 🌐 Deployment

### GitHub Actions + Netlify
The repository includes GitHub Actions workflows that:
1. **Build Statiq blog** using .NET
2. **Build Docusaurus** using Node.js
3. **Combine outputs** into a single deployment
4. **Deploy to Netlify** with proper routing

### Netlify Configuration
The `netlify.toml` handles:
- Routing for both `/` (Statiq) and `/docs/` (Docusaurus)
- SPA routing for Docusaurus
- Caching headers for optimal performance
- Redirects and proxy rules

## 🎯 Benefits of This Approach

### For Migration:
- ✅ **Zero downtime** - both systems work simultaneously
- ✅ **Gradual transition** - migrate content at your own pace
- ✅ **Fallback option** - can always revert to Statiq if needed
- ✅ **Testing** - thoroughly test Docusaurus before full switch

### Docusaurus Advantages:
- ✅ **Active development** - Maintained by Meta with regular updates
- ✅ **Modern tooling** - React, TypeScript, hot reload
- ✅ **Rich ecosystem** - Extensive plugin library
- ✅ **Better SEO** - Built-in optimization features
- ✅ **Mobile-first** - Responsive design out of the box
- ✅ **Search** - Built-in search with Algolia integration
- ✅ **Versioning** - Document versioning support
- ✅ **i18n** - Built-in internationalization

### GitHub Actions & Netlify:
- ✅ **Fast builds** - Node.js typically faster than .NET
- ✅ **Better caching** - npm cache support in actions
- ✅ **Preview deployments** - Automatic branch previews
- ✅ **Form handling** - Netlify forms for contact pages
- ✅ **Edge functions** - Serverless functions support

## 📊 Comparison: Statiq vs Docusaurus

| Feature | Statiq | Docusaurus |
|---------|--------|------------|
| **Language** | C#/.NET | Node.js/React |
| **Templating** | Razor/Liquid | React/MDX |
| **Development** | Slower builds | Hot reload |
| **Community** | Smaller | Large ecosystem |
| **Updates** | Infrequent | Regular releases |
| **Themes** | Limited | Rich theme system |
| **Plugins** | .NET modules | npm packages |
| **Learning Curve** | C# knowledge | React knowledge |
| **Performance** | Good | Excellent |
| **SEO** | Manual setup | Built-in |

## 🧹 Cleanup Tasks (Post-Migration)

When ready to complete the migration:

1. **Remove Statiq components:**
   ```bash
   rm -rf src/blog/
   rm .github/workflows/deploy-prod.yml
   ```

2. **Update GitHub Actions:**
   - Keep only `deploy-docusaurus.yml`
   - Remove .NET build steps

3. **Update Netlify:**
   - Change publish directory from `combined-site` to `docs/build`
   - Remove Statiq-specific redirects

4. **Set up redirects:**
   - Map old Statiq URLs to new Docusaurus URLs
   - Use Netlify redirects or custom redirect component

## 📚 Resources

- [Docusaurus Documentation](https://docusaurus.io/)
- [Docusaurus Migration Guide](https://docusaurus.io/docs/migration)
- [GitHub Actions for Node.js](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs)
- [Netlify Deployment](https://docs.netlify.com/site-deploys/overview/)

---

**Happy migrating! 🚀**