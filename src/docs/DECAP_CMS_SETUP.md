# Decap CMS Setup for Docusaurus

This document describes the Decap CMS setup for the Docusaurus blog at https://blog.mark-burton.com.

## What is Decap CMS?

Decap CMS (formerly Netlify CMS) is an open-source content management system that provides a user-friendly interface for managing content in Git repositories. It allows non-technical users to create and edit blog posts without directly editing markdown files.

## Setup Overview

The Decap CMS has been configured to work with the Docusaurus blog using:
- **Authentication**: Netlify Identity with Git Gateway
- **Backend**: Direct commits to the `main` branch via Git Gateway
- **Editorial Workflow**: Pull request-based workflow for drafts and approvals
- **Media Management**: Images stored in `static/img/`

## File Structure

```
src/docs/
├── static/
│   └── admin/
│       ├── config.yml         # CMS configuration
│       └── index.html         # CMS entry point
├── src/
│   └── components/
│       └── NetlifyIdentity.ts # Authentication redirect handler
└── docusaurus.config.ts       # Netlify Identity widget integration
```

## Configuration Details

### Backend Configuration
- **Type**: Git Gateway (Netlify's proxy to the GitHub API)
- **Branch**: `main`
- **Publish Mode**: Editorial workflow (creates PRs for drafts)

### Content Collections

#### Blog Posts
- **Folder**: `src/docs/blog/` (from repository root)
- **Slug Pattern**: `{{year}}-{{month}}-{{day}}-{{slug}}`
- **File Format**: Markdown with YAML frontmatter

**Frontmatter Fields:**
- `title` (required): Post title
- `description` (optional): Brief description/excerpt
- `date` (required): Publication date (YYYY-MM-DD format)
- `image` (optional): Featured image path (relative to `/img/`)
- `authors` (list): Author slugs (default: ["mark-burton"])
- `tags` (list, optional): Post tags
- `body` (markdown): Post content

### Media Storage
- **Storage Location**: `src/docs/static/img/` (from repository root)
- **Public URL**: `/img/`
- **Restrictions**: No spaces in filenames (enforced by pattern validation)

## Accessing Decap CMS

### For Administrators

1. Navigate to: https://blog.mark-burton.com/admin/
2. Click "Login with Netlify Identity"
3. Enter your Netlify Identity credentials
4. You'll be redirected to the CMS dashboard

### For First-Time Setup (Site Owner Only)

Before users can access the CMS, the site owner must:

1. **Enable Netlify Identity**
   - Log into Netlify dashboard
   - Select the mywyamblog site
   - Navigate to Site Settings > Identity
   - Click "Enable Identity"

2. **Configure Git Gateway**
   - In Identity settings, go to "Services" > "Git Gateway"
   - Click "Enable Git Gateway"
   - This allows Decap CMS to commit to GitHub on behalf of authenticated users

3. **Invite Users**
   - In Identity settings, go to "Users"
   - Click "Invite users"
   - Enter email addresses
   - Users will receive an invitation email with setup instructions

4. **Configure Identity Settings (Optional)**
   - Set registration preferences (invite-only recommended)
   - Configure external providers (Google, GitHub, etc.)
   - Set up password requirements

## Using Decap CMS

### Creating a New Blog Post

1. Log into the CMS at `/admin/`
2. Click "New Blog" in the Collections panel
3. Fill in the required fields:
   - Title
   - Date (defaults to today)
   - Authors (defaults to mark-burton)
4. Write your post content in the markdown editor
5. Add tags and description as needed
6. Save as draft or publish:
   - **Save**: Creates a draft in editorial workflow
   - **Publish**: Creates a pull request (if editorial workflow is enabled)

### Editorial Workflow

When editorial workflow is enabled:

1. **Draft**: Posts are saved as branches
2. **In Review**: Posts moved to review create a PR
3. **Ready**: Posts ready for publishing
4. **Publish**: Merges the PR and deploys

### Managing Images

1. In the post editor, click the image field
2. Either:
   - Upload a new image (saved to `static/img/`)
   - Select an existing image from the media library
3. Ensure filenames have no spaces (enforced by validation)
4. Image will be referenced as `/img/filename.jpg` in markdown

## Technical Details

### Authentication Flow

1. User visits `/admin/`
2. Netlify Identity widget loads
3. User authenticates via Netlify Identity
4. NetlifyIdentity.ts client module detects successful login
5. User is redirected to `/admin/` (CMS dashboard)
6. Git Gateway validates the user's token
7. CMS loads with access to the repository

### Build Integration

- Static files in `/static/admin/` are copied to build output
- Netlify Identity widget script is included in all pages
- Client module is bundled into main JavaScript bundle
- No additional build steps required

### Security Considerations

- Only invited users can access the CMS
- Git Gateway validates all requests via Netlify Identity
- All commits are attributed to the authenticated user
- Branch protection rules on GitHub still apply
- Netlify Identity supports 2FA (recommended for admins)

## Troubleshooting

### "Unable to access the CMS"
- Ensure Netlify Identity is enabled in Netlify dashboard
- Verify Git Gateway is enabled
- Check that you've been invited as a user
- Clear browser cache and try again

### "Error committing changes"
- Verify Git Gateway is properly configured
- Check GitHub repository permissions
- Ensure branch protection rules allow the commit

### "Images not appearing"
- Verify images are saved to `static/img/`
- Check that image paths start with `/img/`
- Ensure no spaces in filenames
- Rebuild and redeploy the site

### "Editorial workflow not working"
- Ensure `publish_mode: editorial_workflow` in config.yml
- Verify Git Gateway has proper GitHub permissions
- Check that the repository allows PRs from the main branch

## Comparison with Statiq Setup

The Docusaurus Decap CMS setup differs from the Statiq version:

| Aspect | Statiq | Docusaurus |
|--------|---------|------------|
| Blog Folder | `src/blog/input/posts` | `src/docs/blog/` |
| Media Folder | `src/blog/input/assets/Images` | `src/docs/static/img/` |
| Public URL | `/assets/Images/` | `/img/` |
| Frontmatter | Title case (Title, Lead, Published) | Lowercase (title, description, date) |
| Authors | Single field | List field |
| Date Format | DateTime | YYYY-MM-DD |

## Maintenance

### Updating Decap CMS

The CMS is loaded from CDN (unpkg.com) with version `^3.0.0`:
- Automatically gets patch and minor updates
- To upgrade to a new major version, update `admin/index.html`
- Test thoroughly after major version upgrades

### Updating Configuration

To modify CMS behavior:
1. Edit `static/admin/config.yml`
2. Commit and push changes
3. Redeploy the site
4. CMS will use new configuration immediately

## References

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Docusaurus Integration Guide](https://decapcms.org/docs/docusaurus/)
- [Netlify Identity Documentation](https://docs.netlify.com/visitor-access/identity/)
- [Git Gateway Documentation](https://docs.netlify.com/visitor-access/git-gateway/)

## Support

For issues or questions:
- Check Decap CMS documentation: https://decapcms.org/docs/
- Review Netlify Identity docs: https://docs.netlify.com/visitor-access/identity/
- Open an issue in the repository: https://github.com/MarkZither/mywyamblog/issues
