# mywyamblog

My personal blog at [blog.mark-burton.com](https://blog.mark-burton.com)

Built with [Docusaurus](https://docusaurus.io/) (primary) with Statiq backup for comparison.

## 🚀 Quick Start

### Docusaurus (Primary Blog)

```bash
cd src/docs
npm install
npm start        # Start dev server at http://localhost:3000
npm run build    # Production build
npm run serve    # Preview production build
```

### Statiq (Backup - Optional)

```bash
dotnet run --project src/blog/mywyamblog.csproj -- preview
dotnet run --project src/blog/mywyamblog.csproj -- serve
```

## 📚 Documentation

See [MIGRATION.md](./MIGRATION.md) for complete migration details and architecture information.

## 🌐 Deployment

The site is automatically deployed to Netlify via GitHub Actions on push to `main`:
- **Primary**: Docusaurus blog at root path (`/`)
- **Backup**: Statiq blog at `/statiq-backup/` for comparison

## 📝 URL Structure

Blog posts follow the pattern: `/yyyy/mm/dd/post-slug`

Old Statiq URLs (`/posts/yyyy-mm-dd-post-slug`) are automatically redirected.
