# Decap CMS Quick Start

This repository now has Decap CMS (formerly Netlify CMS) configured for the Docusaurus blog.

## Accessing the CMS

Once Netlify Identity is configured, access the CMS at:
```
https://blog.mark-burton.com/admin/
```

## First-Time Setup (For Site Owner)

1. **Enable Netlify Identity** in Netlify dashboard → Site Settings → Identity
2. **Enable Git Gateway** in Identity settings → Services → Git Gateway
3. **Invite users** in Identity settings → Users → Invite users

## For Content Editors

1. Visit `/admin/` and login with Netlify Identity
2. Create new posts with "New Blog"
3. Use the editorial workflow for drafts and reviews
4. Images are automatically stored in `src/docs/static/img/` (repository path)

## Documentation

Full setup and usage documentation: [src/docs/DECAP_CMS_SETUP.md](src/docs/DECAP_CMS_SETUP.md)

## Configuration Files

- **CMS Config**: `src/docs/static/admin/config.yml`
- **CMS Entry Point**: `src/docs/static/admin/index.html`
- **Identity Handler**: `src/docs/src/components/NetlifyIdentity.ts`
- **Site Config**: `src/docs/docusaurus.config.ts` (includes Netlify Identity widget)

## Frontmatter Format

Posts use Docusaurus frontmatter format:
```yaml
---
title: "Post Title"
authors: ["mark-burton"]
date: "2025-10-22"
tags: ["tag1", "tag2"]
description: "Brief description"
image: "/img/featured-image.jpg"
---
```

## Key Features

✅ **Git-based workflow**: All content stored in GitHub  
✅ **Editorial workflow**: Draft → Review → Publish via PRs  
✅ **Media management**: Upload and manage images  
✅ **User authentication**: Netlify Identity with Git Gateway  
✅ **Markdown editor**: Rich text editor with live preview  
✅ **No database required**: Pure static site generator workflow

## Troubleshooting

- **Can't access CMS**: Ensure Netlify Identity is enabled and you're invited
- **Can't commit**: Verify Git Gateway is enabled and configured
- **Images not showing**: Check filenames have no spaces and paths start with `/img/`

For detailed troubleshooting, see [DECAP_CMS_SETUP.md](src/docs/DECAP_CMS_SETUP.md).
