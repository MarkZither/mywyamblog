# Hybrid Blog Migration: Statiq → Docusaurus

This repository demonstrates a hybrid approach to migrating from Statiq to Docusaurus, allowing both systems to run side by side during the transition.

## 🏗️ Architecture

```
blog.mark-burton.com/
├── /                        # Docusaurus blog (PRIMARY - new content)
└── /statiq-backup/          # Statiq blog (backup for comparison)
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

### Phase 1: Hybrid Setup ✅ (Complete)
- [x] Docusaurus installed alongside Statiq
- [x] Both systems configured and running
- [x] GitHub Actions updated for hybrid deployment
- [x] Migration script created
- [x] Netlify configuration updated

### Phase 2: Content Migration ✅ (Complete)
- [x] Migrate existing blog posts using migration script
- [x] Update internal links and references
- [x] Migrate static assets (images, files)
- [x] Test all functionality in Docusaurus

### Phase 3: Complete Migration ✅ (Current - Complete)
- [x] Switch main domain to Docusaurus (root path)
- [x] Set up redirects from old Statiq URLs (/posts/yyyy-mm-dd-slug → /yyyy/mm/dd/slug)
- [x] Keep Statiq as backup at /statiq-backup/ for comparison
- [x] Updated GitHub Actions - deploy-docusaurus.yml is primary
- [x] Disabled old deploy-prod.yml workflow

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
The repository includes GitHub Actions workflow (`deploy-docusaurus.yml`) that:
1. **Build Docusaurus** using Node.js (primary blog)
2. **Build Statiq blog** using .NET (backup for comparison)
3. **Combine outputs** into a single deployment (Docusaurus at root, Statiq at /statiq-backup/)
4. **Deploy to Netlify** with proper routing

### Netlify Configuration
The `netlify.toml` handles:
- **Primary routing**: `/` serves Docusaurus blog
- **Backup routing**: `/statiq-backup/` serves original Statiq blog
- **Redirects**: Old `/posts/yyyy-mm-dd-slug` URLs redirect to `/yyyy/mm/dd/slug`
- **SPA routing**: Docusaurus single-page application routing
- **Caching headers**: Optimal performance for static assets
- **Feed redirects**: RSS and Atom feed backward compatibility

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

## 🧹 Future Cleanup Tasks (Optional)

If you want to fully remove Statiq after confirming the migration is successful:

1. **Remove Statiq components:**
   ```bash
   rm -rf src/blog/
   rm .github/workflows/deploy-prod.yml.disabled
   ```

2. **Update GitHub Actions:**
   - Remove .NET build steps from `deploy-docusaurus.yml`
   - Remove Statiq build and copy commands

3. **Update Netlify:**
   - Change publish directory from `combined-site` to `src/docs/build`
   - Remove `/statiq-backup/` directory from deployment

4. **Current State:**
   - ✅ Statiq kept as backup at `/statiq-backup/` for comparison
   - ✅ Old deploy-prod.yml disabled (renamed to .disabled)
   - ✅ Redirects in place for old URL patterns

## 📚 Resources

- [Docusaurus Documentation](https://docusaurus.io/)
- [Docusaurus Migration Guide](https://docusaurus.io/docs/migration)
- [GitHub Actions for Node.js](https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs)
- [Netlify Deployment](https://docs.netlify.com/site-deploys/overview/)

---

**Happy migrating! 🚀**