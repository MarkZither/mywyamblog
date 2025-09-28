# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

# Docusaurus Migration Setup

This directory contains the Docusaurus setup for gradually migrating away from Statiq.

## Setup Overview

This repository now supports a hybrid approach:
- **Statiq blog**: Original blog at the root domain (`blog.mark-burton.com`)
- **Docusaurus blog**: New blog accessible at `/docs/` (`blog.mark-burton.com/docs/`)

## Local Development

### Start Docusaurus development server:
```bash
npm start
```

### Build Docusaurus for production:
```bash
npm run build
```

### Migrate posts from Statiq:
```bash
npm run migrate-posts
```

## Migration Strategy

1. **Phase 1** (Current): Both systems running side by side
   - Statiq serves the main site
   - Docusaurus serves `/docs/` subdirectory
   - GitHub Actions builds and deploys both

2. **Phase 2**: Gradual content migration
   - Use the migration script to convert posts
   - Update internal links
   - Migrate static assets

3. **Phase 3**: Complete migration
   - Switch main domain to Docusaurus
   - Set up redirects from old URLs
   - Remove Statiq components

## Deployment

The site is deployed via GitHub Actions to Netlify:
- **Workflow**: `.github/workflows/deploy-docusaurus.yml`
- **Config**: `netlify.toml` (in root directory)

## Migration Script

The `migrate-posts.js` script helps convert Statiq markdown posts to Docusaurus format:

- Converts frontmatter format
- Handles metadata mapping
- Preserves content structure
- Extracts dates from filenames

## Key Differences: Statiq vs Docusaurus

| Feature | Statiq | Docusaurus |
|---------|---------|------------|
| **Language** | C#/.NET | Node.js/React |
| **Templating** | Razor/Liquid | React/MDX |
| **Content** | Markdown + Razor | Markdown/MDX |
| **Themes** | Custom CSS/HTML | React components |
| **Plugins** | .NET modules | npm packages |
| **Build** | `dotnet run` | `npm run build` |
| **Dev Server** | Built-in | `npm start` |

## Benefits of Docusaurus

- ✅ **Active development** - Regularly updated by Meta
- ✅ **Large community** - Extensive plugin ecosystem
- ✅ **Modern tooling** - Hot reload, TypeScript support
- ✅ **SEO optimized** - Built-in SEO features
- ✅ **Mobile-first** - Responsive by default
- ✅ **Search** - Built-in Algolia integration
- ✅ **i18n support** - Built-in internationalization
- ✅ **Versioning** - Document versioning support

## GitHub Actions & Netlify Integration

Docusaurus works excellently with both:

### GitHub Actions
- **Fast builds** - Node.js builds faster than .NET
- **Caching** - npm cache support
- **Matrix builds** - Multiple Node versions
- **Actions marketplace** - Dedicated Docusaurus actions

### Netlify
- **Branch deploys** - Automatic preview deployments
- **Redirects** - Built-in redirect handling
- **Forms** - Contact form support
- **Edge functions** - Serverless functions
- **Split testing** - A/B testing support

The current setup provides the best of both worlds during migration!

---

## Original Docusaurus Instructions

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ npm

## Local Development

```bash
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

Using SSH:

```bash
USE_SSH=true yarn deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.
