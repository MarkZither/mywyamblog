import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Mark Burton',
  tagline: 'Software Engineer & Technical Writer',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://blog.mark-burton.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // Changed from '/docs/' to '/' to serve blog at root
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'MarkZither', // Usually your GitHub org/user name.
  projectName: 'mywyamblog', // Usually your repo name.

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/MarkZither/mywyamblog/tree/main/docs/',
        },
        blog: {
          routeBasePath: '/',  // Blog listing at root path
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/MarkZither/mywyamblog/tree/main/docs/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  // Client-side redirects as a backup to Netlify server-side redirects
  // These provide a fallback if server-side redirects fail
  // IMPORTANT: Also handles /posts/yyyy-mm-dd-slug pattern (Netlify can't do this)
  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        // Handle the /posts/yyyy-mm-dd-slug -> /yyyy/mm/dd/slug pattern
        // This is the PRIMARY handler for date-based post URLs from Statiq
        createRedirects(existingPath) {
          // For blog posts at /yyyy/mm/dd/slug, create redirect from /posts/yyyy-mm-dd-slug
          const match = existingPath.match(/^\/(\d{4})\/(\d{2})\/(\d{2})\/(.+)$/);
          if (match) {
            const [, year, month, day, slug] = match;
            return [
              `/posts/${year}-${month}-${day}-${slug}`,
            ];
          }
          return undefined;
        },
        // Specific redirects for renamed posts (lowercase and title case variations)
        redirects: [
          // Playing with Service Workers
          { from: '/posts/playing-with-service-workers', to: '/2017/12/18/Playing-with-Service-Workers' },
          { from: '/playing-with-service-workers', to: '/2017/12/18/Playing-with-Service-Workers' },
          
          // VSTO installs
          { from: '/posts/vsto-installs-over-https-issues', to: '/2019/02/25/VSTO-installs-over-HTTPS-issues' },
          { from: '/vsto-installs-over-https-issues', to: '/2019/02/25/VSTO-installs-over-HTTPS-issues' },
          
          // Fork a cloned git repository
          { from: '/posts/fork-a-cloned-git-repository', to: '/2018/01/27/Fork a cloned git repository' },
          { from: '/fork-a-cloned-git-repository', to: '/2018/01/27/Fork a cloned git repository' },
          
          // miniblog clone
          { from: '/posts/miniblog-clone', to: '/2018/01/12/miniblog clone' },
          { from: '/miniblog-clone', to: '/2018/01/12/miniblog clone' },
          
          // Job Interview
          { from: '/posts/job-interview-technical-test-preparation', to: '/2017/11/04/Job-Interview-Technical-Test-Preparation' },
          { from: '/job-interview-technical-test-preparation', to: '/2017/11/04/Job-Interview-Technical-Test-Preparation' },
        ],
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Mark Burton',
      logo: {
        alt: 'Mark Burton Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/MarkZither/mywyamblog',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'X',
              href: 'https://x.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/MarkZither/mywyamblog',
            },
          ],
        },
        {
          title: 'Subscribe',
          items: [
            {
              label: 'RSS Feed',
              href: 'https://blog.mark-burton.com/feed.rss',
            },
            {
              label: 'Atom Feed',
              href: 'https://blog.mark-burton.com/feed.atom',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Mark Burton. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
