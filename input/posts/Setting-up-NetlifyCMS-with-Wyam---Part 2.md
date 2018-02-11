---
Title: Using Netlify Identity with NetlifyCMS and Wyam
Published: 2018-03-09
Lead: test a lead
Tags: 
  - Wyam
  - AppVeyor
  - NetlifyCMS
  - Netlify
---

# Setup AppVeyor continuous deployment

To get started with a simple NetlifyCMS setup without the editorial workflow you can use the [AppVeyor for Continuous Integration](https://wyam.io/docs/deployment/appveyor) Wyam document.

With that in place once you publish a post it will be added to GitHub, a build will be triggered on AppVeyor and the output will be pushed to the branch specified in the appveyor.yml, in the docs that is gh-pages, in the same repository.

# Setup your Netlify site to use 
Now we have AppVeyor building the site and pushing the output back to GitHub we can configure the deploy settings in Netlify so that changes are automatically published to your blog.