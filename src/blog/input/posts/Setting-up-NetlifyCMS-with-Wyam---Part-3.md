---
Title: Setting up NetlifyCMS with Wyam - Part 3
Published: 2018-03-09
Lead: Configuring a simple single user mode NetlifyCMS with Wyam
Tags: 
  - Wyam
  - AppVeyor
  - NetlifyCMS
  - Netlify
---

## Use AppVeyor for CI
To get started with a simple NetlifyCMS setup without the editorial workflow you can use the [AppVeyor for Continuous Integration](https://wyam.io/docs/deployment/appveyor) Wyam document.

# Enabling the editorial workflow

## Turn off webhook for PR to prevent extra build being triggered in AppVeyor
For more details see [Do not build virtual merge on Pull Requests #1636](https://github.com/appveyor/ci/issues/1636) and [Preventing master CI run when a commit a made on a feature branch](http://help.appveyor.com/discussions/questions/5082-preventing-master-ci-run-when-a-commit-a-made-on-a-feature-branch)
![](../assets/Images/NetlifyCMS_Webhooks.png){.img-responsive .img-fluid}
If this is not done AppVeyor will run the master branch config when a draft is saved in NetlifyCMS as a PR is created, it will fail with
```
git push
remote: Anonymous access to MarkZither/ProjectName.git denied.
fatal: Authentication failed for 'https://github.com/MarkZither/ProjectName.git/'
Command exited with code 128
```

## Advanced AppVeyor config to support Editorial_Workflow
When a blog post is saved as a draft it will create a branch starting with 'cms', use the for branches with a regular expression to control different aspects of the build on master and cms branches, here is [an example of this in action](https://github.com/NokNokMLS/BigDoorWyamBlog/blob/master/appveyor.yml)
```
for:
 # override settings for `master` branch
- 
  version: 1.0.{build}
  branches:
    only:
      - master
  #######################
  # removed for brevity #
  #######################

# override settings for `cms*` branches
-
  branches:
    only:
      - /cms.*/

  deploy:
```  

## Errors and issues i hit while setting this up

### [the build phase is set to msbuild mode default but no visual studio project or solution files were found](https://help.appveyor.com/discussions/problems/11287-the-build-phase-is-set-to-msbuild-mode-default-but-no-visual-studio-project-or-solution-files-were-found)

caused by having version: 1.0.{build} in wrong place in appveyor.yml

### Failed build after saving a post
```
git push
remote: Anonymous access to MarkZither/ProjectName.git denied.
fatal: Authentication failed for 'https://github.com/MarkZither/ProjectName.git/'
Command exited with code 128
```
This is caused by the PR firing a Webhook which triggers the build on the master branch.


## Other things to write about
* show the correct logged/logged out menu based on [Netlify Identity Widget](https://github.com/netlify/netlify-identity-widget) events and user object.
* how to populate the author field from the Netlify Identity metadata.