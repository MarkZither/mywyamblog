# Copilot Development Instructions for mywyamblog

## Repository Overview

This is Mark Burton's personal blog repository, currently in a **hybrid migration state** from Statiq (.NET) to Docusaurus (Node.js/React). Both systems coexist to allow gradual content migration with zero downtime.

### Architecture
- **Blog URL**: https://blog.mark-burton.com
- **Root path (`/`)**: Statiq blog (original, .NET-based)
- **Docs path (`/docs/`)**: Docusaurus blog (new, Node.js-based)

## Project Structure

```
mywyamblog/
├── .copilot-instructions.md       # Content/writing style instructions
├── .github/
│   ├── copilot-instructions.md    # This file - development instructions
│   └── workflows/                 # CI/CD pipelines
│       ├── deploy-docusaurus.yml  # Hybrid deployment
│       ├── deploy-prod.yml        # Statiq deployment
│       └── dotnet.yml             # .NET build
├── src/
│   ├── blog/                      # Statiq blog (.NET 8.0)
│   │   ├── mywyamblog.csproj     # .NET project file
│   │   ├── Program.cs            # Entry point
│   │   ├── input/posts/          # Original blog posts
│   │   └── theme/                # Statiq theme
│   └── docs/                      # Docusaurus site (Node.js)
│       ├── package.json          # npm dependencies
│       ├── docusaurus.config.ts  # Site configuration
│       ├── blog/                 # Migrated blog posts
│       ├── docs/                 # Documentation
│       ├── src/                  # React components
│       └── migrate-posts.js      # Migration utility
├── MIGRATION.md                   # Migration guide
└── netlify.toml                   # Deployment config
```

## Technology Stack

### Statiq Blog (Legacy - Being Phased Out)
- **Framework**: .NET 8.0
- **Static Generator**: Statiq.Web
- **Template Engine**: Razor
- **Build Command**: `dotnet run --project src/blog/mywyamblog.csproj`

### Docusaurus Site (Current Development)
- **Framework**: Docusaurus 3.9.1
- **Runtime**: Node.js ≥20.0
- **Language**: TypeScript 5.6
- **UI Library**: React 19
- **Build Command**: `npm run build` (in src/docs/)

## Development Workflow

### Local Development

#### Start Docusaurus (Primary)
```bash
cd src/docs
npm install
npm start
# Opens http://localhost:3000
```

#### Start Statiq (If Needed)
```bash
cd src/blog
dotnet run
# Opens http://localhost:5080
```

#### Using Build Script
```powershell
# Build both systems
.\build.ps1

# Build only Docusaurus
.\build.ps1 -OnlyDocusaurus

# Build only Statiq
.\build.ps1 -OnlyStatiq
```

### Build & Test

#### Docusaurus
```bash
cd src/docs
npm run typecheck     # TypeScript validation
npm run build        # Production build
npm run serve        # Preview production build
```

#### Statiq
```bash
cd src/blog
dotnet build         # Compile
dotnet run          # Build and preview
```

## Code Standards & Conventions

### TypeScript/React (Docusaurus)
- **Style**: Use existing TypeScript configurations
- **Components**: Follow Docusaurus component patterns
- **Config**: Modify `docusaurus.config.ts` for site settings
- **Imports**: Use ES modules consistently

### C# (.NET - Statiq)
- **Target**: .NET 8.0
- **Style**: Follow standard C# conventions
- **Statiq**: Use Statiq.Web and Statiq.Lunr packages
- **Configuration**: Settings in `settings.yml` and `appsettings.json`

### Markdown
- **Blog Posts**: Use frontmatter format appropriate to each system
- **British English**: Use British spellings throughout (colour, realise, etc.)
- **Style**: See `.copilot-instructions.md` for writing style

## Key Files to Know

### Configuration Files
- `src/docs/docusaurus.config.ts` - Docusaurus site configuration
- `src/docs/sidebars.ts` - Documentation sidebar structure
- `src/blog/settings.yml` - Statiq site settings
- `netlify.toml` - Deployment and routing configuration

### Build Files
- `build.ps1` - PowerShell build script (both systems)
- `src/docs/package.json` - npm scripts and dependencies
- `src/blog/mywyamblog.csproj` - .NET project configuration

### Workflow Files
- `.github/workflows/deploy-docusaurus.yml` - Primary deployment
- `.github/workflows/deploy-prod.yml` - Statiq deployment
- `.github/workflows/dotnet.yml` - .NET CI

## Migration Process

### Current Status
- ✅ Phase 1: Hybrid setup complete
- 🔄 Phase 2: Content migration in progress
- ⏳ Phase 3: Complete migration (future)

### Migrating Content
Use the migration script to convert Statiq posts to Docusaurus:

```bash
cd src/docs
npm run migrate-posts
```

The script handles:
- Frontmatter conversion (Title → title, Lead → description, etc.)
- Date extraction from filenames
- Tag and author mapping
- YAML formatting

Manual fixes needed after migration:
- Image paths: `/assets/` → `/img/`
- Internal links to other posts
- Code syntax highlighting adjustments

## Deployment

### GitHub Actions + Netlify
1. Push to `main` branch
2. GitHub Actions builds both Statiq and Docusaurus
3. Outputs combined into single deployment
4. Deployed to Netlify with routing:
   - `/` → Statiq content
   - `/docs/` → Docusaurus content

### Environment Variables
- Configured in GitHub Secrets
- Netlify environment variables for deployment

## Important Considerations

### DO
- ✅ Make changes primarily to Docusaurus (`src/docs/`)
- ✅ Test both TypeScript and build outputs
- ✅ Follow British English conventions
- ✅ Use the migration script for batch content moves
- ✅ Update `MIGRATION.md` when changing migration strategy
- ✅ Preserve existing Statiq functionality during transition

### DON'T
- ❌ Break existing Statiq blog (still live at root)
- ❌ Use American English spellings
- ❌ Remove Statiq components until migration complete
- ❌ Change URLs without setting up redirects
- ❌ Commit `node_modules/`, `bin/`, `obj/`, or `build/` directories

## Testing Strategy

### Before Committing
1. **Typecheck**: `cd src/docs && npm run typecheck`
2. **Build**: `cd src/docs && npm run build`
3. **Visual check**: `npm run serve` and review changes
4. **Link validation**: Ensure internal links work
5. **.NET build** (if modified): `cd src/blog && dotnet build`

### CI/CD Validation
- GitHub Actions runs on every push
- Validates both Statiq and Docusaurus builds
- Deployment only on successful builds

## Common Tasks

### Adding a New Blog Post (Docusaurus)
1. Create file in `src/docs/blog/` with date prefix: `YYYY-MM-DD-title.md`
2. Add frontmatter:
```yaml
---
title: "Post Title"
authors: ["mark-burton"]
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
description: "Brief description"
---
```
3. Write content in Markdown/MDX
4. Test locally: `npm start`

### Updating Site Configuration
- Edit `src/docs/docusaurus.config.ts`
- Restart dev server to see changes
- Test build: `npm run build`

### Adding Dependencies
```bash
cd src/docs
npm install <package-name>
```

### Troubleshooting Build Issues

#### Docusaurus
- Clear cache: `npm run clear`
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run typecheck`

#### Statiq
- Clean build: `dotnet clean && dotnet build`
- Check .NET version: `dotnet --version` (should be 8.0+)
- Verify Statiq packages are restored

## Resources

### Documentation
- [Docusaurus Docs](https://docusaurus.io/)
- [Statiq.Web Docs](https://statiq.dev/web/)
- [Migration Guide](./MIGRATION.md)

### Repository-Specific
- Writing style: `.copilot-instructions.md`
- Migration strategy: `MIGRATION.md`
- Deployment: `netlify.toml`

## Notes for AI Assistants

When working on this repository:

1. **Understand the hybrid nature**: Both systems must work simultaneously
2. **Focus on Docusaurus**: New development should primarily target Docusaurus
3. **Preserve Statiq**: Don't break the existing blog during migration
4. **British English**: All text content uses British spellings
5. **Respect the migration**: See `MIGRATION.md` for the phased approach
6. **Test both builds**: Ensure neither system breaks with changes
7. **Use the migration script**: Don't manually convert posts
8. **Follow existing patterns**: Match the style of existing code/content
