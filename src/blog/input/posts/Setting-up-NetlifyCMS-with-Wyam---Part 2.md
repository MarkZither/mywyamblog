---
Title: Using Netlify Identity with NetlifyCMS and Wyam
Published: 2019-02-15
Lead: test a lead
Tags: 
  - Wyam
  - AppVeyor
  - NetlifyCMS
  - Netlify
---

# Setup AppVeyor continuous deployment

To get started with a simple NetlifyCMS setup without the editorial workflow you can use the [AppVeyor for Continuous Integration](https://wyam.io/docs/deployment/appveyor) Wyam document.

With that in place once you publish a post in your NetlifyCMS and it will be pushed to GitHub as seen in [part 1](/posts/Setting-up-NetlifyCMS-with-Wyam---Part-1), but to get a build will be triggered on AppVeyor and the output will be pushed to the branch specified in the appveyor.yml, in the docs that is gh-pages, in the same repository.

This will not display properly in GitHub pages as the site runs in a subdirectory, changing the build_script step to include a LinkRoot setting to match your GitHub pages subdirectory will fix that.
```
build_script:
  - ..\Wyam\wyam --output ..\output -s LinkRoot="/BigDoorWyamBlog" # https://noknokmls.github.io/BigDoorWyamBlog/posts/2018-02-12-where-i-live-john-naughton-krakow-rzaska.html
```  

# Setup your Netlify site to use 
Now we have AppVeyor building the site and pushing the output back to GitHub we can configure the deploy settings in Netlify so that changes are automatically published to your blog.