---
Title: Migrating my blog from Wyam to Statiq
Lead: The CleanBlog theme has been created for Statiq so time to try and migrate.
Published: 2020-09-21T10:24:26.968Z
Image: 
Tags:
  - Wyam
  - Statiq
---

The initial steps to setup a new blog with Statiq or migrate from Wyam are covered in [porting from Wyam](https://github.com/statiqdev/CleanBlog#porting-from-wyam) document in the CleanBlog repo.

There are additional points raised in the GitHub discussions on the [StatiqDev Discussions repo](https://github.com/statiqdev/Discussions/discussions) most specifically in the [Migration from Wyam](https://github.com/statiqdev/Discussions/discussions/15) discussion.

I had customized my blog slightly while using Wyam so there was some additional work to do.

## Bringing back the triangles
Several javascript libraries have been removed from the CleanBlog theme, some of which were used to generate dynamic triangles for the header background when an image is not used. I started the discussion [Javascript changes between Wyam and Statiq CleanBlog (or where have my triangles gone? 😊 )](https://github.com/statiqdev/Discussions/discussions/17) and reintroduced the necessary libraries to bring back the triangles.

## Font Awesome Updates
The move from FontAwesome 4 to 5 means that many icons stopped working, this is due to brand icons moving to a new prefix, so I had to change `fa` to `fab` in a number of places, where `fa` still works it appears better to change those to `fas` based on [FontAwesome's own upgrading from version 4 guide](https://fontawesome.com/how-to-use/on-the-web/setup/upgrading-from-version-4)

## Fix styles on custom navbar entries
I added a dropdown to my navbar, which has lost its style after the upgrade, this appears to be a bootstrap 3 to upgrade issue.

## Publishing to Netlify
Install the Netlify CLI `npm install netlify-cli -g`

## Exclude NetlifyCMS directory from processing and copy it to output
I have been managing my [Wyam blog with NetlifyCMS](https://github.com/MarkZither/mywyamblog/tree/master/input/admin), this is simply a directory called `admin` with 2 files, `index.html` and `config.yml`. Wyam copied those files unchanged to the output.  With Statiq that has changed and it processes the html file which makes it invalid, skips the `config.yml` file and adds a link to `admin` to the NavBar.

Adding a file called `_directory.yml` to the `admin` directory makes it possible to set directory wide meta data, `ShowInNavBar: False` removes the admin link from the NavBar, setting the ContentType and MediaType, as discussed on the StatiqDev GitHub discussion [Migration from Wyam](https://github.com/statiqdev/Discussions/discussions/15), resulted in the desired behaviour

``` yaml
ShowInNavBar: False
ContentType: Asset
MediaType: text/plain
```

## Update _post-footer.cshtml to set the Disqus configuration variables

``` c#
    /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
    var disqus_identifier = '@Document.Destination.FileNameWithoutExtension.FullPath';
    var disqus_title = '@Document.GetString("Title")';
    var disqus_url = '@Document.GetLink(true)';
```

## Setup the javascript for the Lunr based search


## Setup GenerateLunrIndex to build the searchindex.js file
