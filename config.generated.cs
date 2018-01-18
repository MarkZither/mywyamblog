// Generated: bring all module namespaces in scope
                using Wyam.Core.Modules.Metadata;
using Wyam.Yaml;
using Wyam.Common.Tracing;
using Wyam.Common.Configuration;
using Wyam.Common.IO;
using System;
using Wyam.Feeds;
using Wyam.Html;
using Wyam.Blog;
using Wyam.Core.Documents;
using Wyam.Common.JavaScript;
using Wyam.Common.Modules.Contents;
using Wyam.Markdown;
using Wyam.Common.Meta;
using Wyam.Core.Modules.Extensibility;
using Wyam.Core.Modules.Templates;
using Wyam.Core.Modules.Control;
using Wyam.Razor;
using Wyam.Common.Documents;
using Wyam.Sass;
using Wyam.Core.Configuration;
using Wyam.Common.Execution;
using Wyam.Configuration.ConfigScript;
using System.Linq;
using Wyam.Common.Caching;
using Wyam.Core.Modules.Contents;
using Wyam.Core.Execution;
using Wyam.Less;
using Wyam.Core.Modules.IO;
using Wyam.Common.Util;
using System.Collections.Generic;
using Wyam.Common.Modules;

                // Input: using directives
                

                public class Script : ScriptBase
                {
                    public Script(Engine engine) : base(engine) { }

                    public override void Run()
                    {
                        // Input: script code
#line 1
Settings[Keys.Host] = "blog.mark-burton.com";
Settings[Wyam.Blog.BlogKeys.Title] = "Mark Burton";
Settings[Wyam.Blog.BlogKeys.Description] = "Burton Blogs";
Settings[Wyam.Blog.BlogKeys.Intro] = "Hi, welcome to my blog!";
Settings[Wyam.Blog.BlogKeys.IgnoreFolders] = "events";
Settings[BlogKeys.ArchivePageSize] = 3;
Settings[BlogKeys.IndexPaging] = 1;
Settings[BlogKeys.IndexPageSize] = 2;

//#n -p Wyam.Markdown
//#n -p Wyam.Yaml

//#theme CleanBlog
//#recipe Blog

/*var Events = new Wyam.Web.Pipelines.Pages(
  "Events",
  new Wyam.Web.Pipelines.PagesSettings
  {
      PagesPattern = ctx => "esssssssssvents",
      MarkdownConfiguration = ctx => ctx.String(BlogKeys.MarkdownConfiguration),
      MarkdownExtensionTypes = ctx => ctx.List<Type>(BlogKeys.MarkdownExtensionTypes),
      ProcessIncludes = (doc, ctx) => doc.Bool(BlogKeys.ProcessIncludes)
  });*/

Pipelines.InsertBefore(Wyam.Blog.Blog.BlogPosts,
  (IPipeline)new Wyam.Web.Pipelines.BlogPosts(
    "BlogEventPosts",
    new Wyam.Web.Pipelines.BlogPostsSettings
    {
      PublishedKey = Wyam.Blog.BlogKeys.Published,
      MarkdownConfiguration = ctx => ctx.String(Wyam.Blog.BlogKeys.MarkdownConfiguration),
      MarkdownExtensionTypes = ctx => ctx.List<Type>(Wyam.Blog.BlogKeys.MarkdownExtensionTypes),
      ProcessIncludes = (doc, ctx) => doc.Bool(Wyam.Blog.BlogKeys.ProcessIncludes),
      IncludeDateInPostPath = ctx => ctx.Bool(Wyam.Blog.BlogKeys.IncludeDateInPostPath),
      PostsPath = ctx => ctx.DirectoryPath(Wyam.Blog.BlogKeys.PostsPath).FullPath
      //PostsPath = ctx => "Event"
    }
  )
);

                    }

                    // Input: lifted methods


                    // Generated: methods for module instantiation
                    
                    Wyam.Html.ValidateLinks ValidateLinks()
                    {
                        return new Wyam.Html.ValidateLinks();  
                    }

                    Wyam.Core.Modules.Control.Sidecar Sidecar(params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.Sidecar(modules);  
                    }
                    Wyam.Core.Modules.Control.Sidecar Sidecar(System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.Sidecar(modules);  
                    }
                    Wyam.Core.Modules.Control.Sidecar Sidecar(string extension, params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.Sidecar(extension, modules);  
                    }
                    Wyam.Core.Modules.Control.Sidecar Sidecar(string extension, System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.Sidecar(extension, modules);  
                    }
                    Wyam.Core.Modules.Control.Sidecar Sidecar(Wyam.Common.Configuration.DocumentConfig sidecarPath, params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.Sidecar(sidecarPath, modules);  
                    }
                    Wyam.Core.Modules.Control.Sidecar Sidecar(Wyam.Common.Configuration.DocumentConfig sidecarPath, System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.Sidecar(sidecarPath, modules);  
                    }

                    Wyam.Core.Modules.Contents.Prepend Prepend(object content)
                    {
                        return new Wyam.Core.Modules.Contents.Prepend(content);  
                    }
                    Wyam.Core.Modules.Contents.Prepend Prepend(Wyam.Common.Configuration.ContextConfig content)
                    {
                        return new Wyam.Core.Modules.Contents.Prepend(content);  
                    }
                    Wyam.Core.Modules.Contents.Prepend Prepend(Wyam.Common.Configuration.DocumentConfig content)
                    {
                        return new Wyam.Core.Modules.Contents.Prepend(content);  
                    }
                    Wyam.Core.Modules.Contents.Prepend Prepend(params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Contents.Prepend(modules);  
                    }

                    Wyam.Core.Modules.Control.Paginate Paginate(int pageSize, params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.Paginate(pageSize, modules);  
                    }
                    Wyam.Core.Modules.Control.Paginate Paginate(int pageSize, System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.Paginate(pageSize, modules);  
                    }

                    Wyam.Core.Modules.Control.Documents Documents()
                    {
                        return new Wyam.Core.Modules.Control.Documents();  
                    }
                    Wyam.Core.Modules.Control.Documents Documents(string pipeline)
                    {
                        return new Wyam.Core.Modules.Control.Documents(pipeline);  
                    }
                    Wyam.Core.Modules.Control.Documents Documents(Wyam.Common.Configuration.ContextConfig documents)
                    {
                        return new Wyam.Core.Modules.Control.Documents(documents);  
                    }
                    Wyam.Core.Modules.Control.Documents Documents(Wyam.Common.Configuration.DocumentConfig documents)
                    {
                        return new Wyam.Core.Modules.Control.Documents(documents);  
                    }
                    Wyam.Core.Modules.Control.Documents Documents(int count)
                    {
                        return new Wyam.Core.Modules.Control.Documents(count);  
                    }
                    Wyam.Core.Modules.Control.Documents Documents(params string[] content)
                    {
                        return new Wyam.Core.Modules.Control.Documents(content);  
                    }
                    Wyam.Core.Modules.Control.Documents Documents(params System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object>>[] metadata)
                    {
                        return new Wyam.Core.Modules.Control.Documents(metadata);  
                    }
                    Wyam.Core.Modules.Control.Documents Documents(params System.Tuple<string, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string, object>>>[] contentAndMetadata)
                    {
                        return new Wyam.Core.Modules.Control.Documents(contentAndMetadata);  
                    }

                    Wyam.Core.Modules.Metadata.Sql Sql(string connectionString, string sql)
                    {
                        return new Wyam.Core.Modules.Metadata.Sql(connectionString, sql);  
                    }

                    Wyam.Sass.Sass Sass()
                    {
                        return new Wyam.Sass.Sass();  
                    }

                    Wyam.Core.Modules.Control.Merge Merge(params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.Merge(modules);  
                    }
                    Wyam.Core.Modules.Control.Merge Merge(System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.Merge(modules);  
                    }

                    Wyam.Core.Modules.Contents.Append Append(object content)
                    {
                        return new Wyam.Core.Modules.Contents.Append(content);  
                    }
                    Wyam.Core.Modules.Contents.Append Append(Wyam.Common.Configuration.ContextConfig content)
                    {
                        return new Wyam.Core.Modules.Contents.Append(content);  
                    }
                    Wyam.Core.Modules.Contents.Append Append(Wyam.Common.Configuration.DocumentConfig content)
                    {
                        return new Wyam.Core.Modules.Contents.Append(content);  
                    }
                    Wyam.Core.Modules.Contents.Append Append(params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Contents.Append(modules);  
                    }

                    Wyam.Core.Modules.Contents.Replace Replace(string search, object content)
                    {
                        return new Wyam.Core.Modules.Contents.Replace(search, content);  
                    }
                    Wyam.Core.Modules.Contents.Replace Replace(string search, Wyam.Common.Configuration.ContextConfig content)
                    {
                        return new Wyam.Core.Modules.Contents.Replace(search, content);  
                    }
                    Wyam.Core.Modules.Contents.Replace Replace(string search, Wyam.Common.Configuration.DocumentConfig content)
                    {
                        return new Wyam.Core.Modules.Contents.Replace(search, content);  
                    }
                    Wyam.Core.Modules.Contents.Replace Replace(string search, params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Contents.Replace(search, modules);  
                    }
                    Wyam.Core.Modules.Contents.Replace Replace(string search, System.Func<System.Text.RegularExpressions.Match, object> contentFinder)
                    {
                        return new Wyam.Core.Modules.Contents.Replace(search, contentFinder);  
                    }

                    Wyam.Core.Modules.Control.Combine Combine()
                    {
                        return new Wyam.Core.Modules.Control.Combine();  
                    }

                    Wyam.Core.Modules.Metadata.DirectoryMeta DirectoryMeta()
                    {
                        return new Wyam.Core.Modules.Metadata.DirectoryMeta();  
                    }

                    Wyam.Core.Modules.Extensibility.Trace Trace(object content)
                    {
                        return new Wyam.Core.Modules.Extensibility.Trace(content);  
                    }
                    Wyam.Core.Modules.Extensibility.Trace Trace(Wyam.Common.Configuration.ContextConfig content)
                    {
                        return new Wyam.Core.Modules.Extensibility.Trace(content);  
                    }
                    Wyam.Core.Modules.Extensibility.Trace Trace(Wyam.Common.Configuration.DocumentConfig content)
                    {
                        return new Wyam.Core.Modules.Extensibility.Trace(content);  
                    }
                    Wyam.Core.Modules.Extensibility.Trace Trace(params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Extensibility.Trace(modules);  
                    }

                    Wyam.Core.Modules.Control.OrderBy OrderBy(Wyam.Common.Configuration.DocumentConfig key)
                    {
                        return new Wyam.Core.Modules.Control.OrderBy(key);  
                    }

                    Wyam.Core.Modules.Control.Where Where(Wyam.Common.Configuration.DocumentConfig predicate)
                    {
                        return new Wyam.Core.Modules.Control.Where(predicate);  
                    }

                    Wyam.Core.Modules.Extensibility.Execute Execute(Wyam.Common.Configuration.DocumentConfig execute, bool parallel = true)
                    {
                        return new Wyam.Core.Modules.Extensibility.Execute(execute, parallel);  
                    }
                    Wyam.Core.Modules.Extensibility.Execute Execute(Wyam.Common.Configuration.ContextConfig execute)
                    {
                        return new Wyam.Core.Modules.Extensibility.Execute(execute);  
                    }
                    Wyam.Core.Modules.Extensibility.Execute Execute(System.Action<Wyam.Common.Documents.IDocument, Wyam.Common.Execution.IExecutionContext> execute, bool parallel = true)
                    {
                        return new Wyam.Core.Modules.Extensibility.Execute(execute, parallel);  
                    }
                    Wyam.Core.Modules.Extensibility.Execute Execute(System.Action<Wyam.Common.Execution.IExecutionContext> execute)
                    {
                        return new Wyam.Core.Modules.Extensibility.Execute(execute);  
                    }

                    Wyam.Core.Modules.IO.Download Download(params string[] uris)
                    {
                        return new Wyam.Core.Modules.IO.Download(uris);  
                    }
                    Wyam.Core.Modules.IO.Download Download(string uri, Wyam.Core.Modules.IO.RequestHeaders headers)
                    {
                        return new Wyam.Core.Modules.IO.Download(uri, headers);  
                    }

                    Wyam.Core.Modules.IO.ReadApplicationInput ReadApplicationInput()
                    {
                        return new Wyam.Core.Modules.IO.ReadApplicationInput();  
                    }

                    Wyam.Html.HtmlQuery HtmlQuery(string querySelector)
                    {
                        return new Wyam.Html.HtmlQuery(querySelector);  
                    }

                    Wyam.Core.Modules.Metadata.FileName FileName()
                    {
                        return new Wyam.Core.Modules.Metadata.FileName();  
                    }
                    Wyam.Core.Modules.Metadata.FileName FileName(string inputKey)
                    {
                        return new Wyam.Core.Modules.Metadata.FileName(inputKey);  
                    }
                    Wyam.Core.Modules.Metadata.FileName FileName(Wyam.Common.Configuration.DocumentConfig fileName)
                    {
                        return new Wyam.Core.Modules.Metadata.FileName(fileName);  
                    }
                    Wyam.Core.Modules.Metadata.FileName FileName(string inputKey, string outputKey)
                    {
                        return new Wyam.Core.Modules.Metadata.FileName(inputKey, outputKey);  
                    }
                    Wyam.Core.Modules.Metadata.FileName FileName(Wyam.Common.Configuration.DocumentConfig fileName, string outputKey)
                    {
                        return new Wyam.Core.Modules.Metadata.FileName(fileName, outputKey);  
                    }

                    Wyam.Core.Modules.IO.Include Include()
                    {
                        return new Wyam.Core.Modules.IO.Include();  
                    }

                    Wyam.Html.Headings Headings()
                    {
                        return new Wyam.Html.Headings();  
                    }
                    Wyam.Html.Headings Headings(int level)
                    {
                        return new Wyam.Html.Headings(level);  
                    }

                    Wyam.Core.Modules.Contents.Sitemap Sitemap(System.Func<string, string> locationFormatter = null)
                    {
                        return new Wyam.Core.Modules.Contents.Sitemap(locationFormatter);  
                    }
                    Wyam.Core.Modules.Contents.Sitemap Sitemap(string sitemapItemOrLocationMetadataKey, System.Func<string, string> locationFormatter = null)
                    {
                        return new Wyam.Core.Modules.Contents.Sitemap(sitemapItemOrLocationMetadataKey, locationFormatter);  
                    }
                    Wyam.Core.Modules.Contents.Sitemap Sitemap(Wyam.Common.Configuration.DocumentConfig sitemapItemOrLocation, System.Func<string, string> locationFormatter = null)
                    {
                        return new Wyam.Core.Modules.Contents.Sitemap(sitemapItemOrLocation, locationFormatter);  
                    }

                    Wyam.Core.Modules.Contents.Redirect Redirect()
                    {
                        return new Wyam.Core.Modules.Contents.Redirect();  
                    }

                    Wyam.Core.Modules.IO.WriteFiles WriteFiles(Wyam.Common.Configuration.DocumentConfig path)
                    {
                        return new Wyam.Core.Modules.IO.WriteFiles(path);  
                    }
                    Wyam.Core.Modules.IO.WriteFiles WriteFiles(string extension)
                    {
                        return new Wyam.Core.Modules.IO.WriteFiles(extension);  
                    }
                    Wyam.Core.Modules.IO.WriteFiles WriteFiles()
                    {
                        return new Wyam.Core.Modules.IO.WriteFiles();  
                    }

                    Wyam.Core.Modules.Control.FrontMatter FrontMatter(params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.FrontMatter(modules);  
                    }
                    Wyam.Core.Modules.Control.FrontMatter FrontMatter(System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.FrontMatter(modules);  
                    }
                    Wyam.Core.Modules.Control.FrontMatter FrontMatter(string delimiter, params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.FrontMatter(delimiter, modules);  
                    }
                    Wyam.Core.Modules.Control.FrontMatter FrontMatter(string delimiter, System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.FrontMatter(delimiter, modules);  
                    }
                    Wyam.Core.Modules.Control.FrontMatter FrontMatter(char delimiter, params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.FrontMatter(delimiter, modules);  
                    }
                    Wyam.Core.Modules.Control.FrontMatter FrontMatter(char delimiter, System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.FrontMatter(delimiter, modules);  
                    }

                    Wyam.Core.Modules.Extensibility.ModuleCollection ModuleCollection(params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Extensibility.ModuleCollection(modules);  
                    }
                    Wyam.Core.Modules.Extensibility.ModuleCollection ModuleCollection(System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Extensibility.ModuleCollection(modules);  
                    }

                    Wyam.Core.Modules.IO.CopyFiles CopyFiles(Wyam.Common.Configuration.DocumentConfig patterns)
                    {
                        return new Wyam.Core.Modules.IO.CopyFiles(patterns);  
                    }
                    Wyam.Core.Modules.IO.CopyFiles CopyFiles(params string[] patterns)
                    {
                        return new Wyam.Core.Modules.IO.CopyFiles(patterns);  
                    }

                    Wyam.Core.Modules.Control.GroupByMany GroupByMany(Wyam.Common.Configuration.DocumentConfig key, params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.GroupByMany(key, modules);  
                    }
                    Wyam.Core.Modules.Control.GroupByMany GroupByMany(Wyam.Common.Configuration.DocumentConfig key, System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.GroupByMany(key, modules);  
                    }
                    Wyam.Core.Modules.Control.GroupByMany GroupByMany(string keyMetadataKey, params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.GroupByMany(keyMetadataKey, modules);  
                    }
                    Wyam.Core.Modules.Control.GroupByMany GroupByMany(string keyMetadataKey, System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.GroupByMany(keyMetadataKey, modules);  
                    }

                    Wyam.Core.Modules.Control.Take Take(int x)
                    {
                        return new Wyam.Core.Modules.Control.Take(x);  
                    }

                    Wyam.Core.Modules.Metadata.Title Title()
                    {
                        return new Wyam.Core.Modules.Metadata.Title();  
                    }
                    Wyam.Core.Modules.Metadata.Title Title(string title)
                    {
                        return new Wyam.Core.Modules.Metadata.Title(title);  
                    }
                    Wyam.Core.Modules.Metadata.Title Title(Wyam.Common.Configuration.ContextConfig title)
                    {
                        return new Wyam.Core.Modules.Metadata.Title(title);  
                    }
                    Wyam.Core.Modules.Metadata.Title Title(Wyam.Common.Configuration.DocumentConfig title)
                    {
                        return new Wyam.Core.Modules.Metadata.Title(title);  
                    }

                    Wyam.Core.Modules.Control.Switch Switch(Wyam.Common.Configuration.DocumentConfig value)
                    {
                        return new Wyam.Core.Modules.Control.Switch(value);  
                    }

                    Wyam.Markdown.Markdown Markdown()
                    {
                        return new Wyam.Markdown.Markdown();  
                    }
                    Wyam.Markdown.Markdown Markdown(string sourceKey, string destinationKey = null)
                    {
                        return new Wyam.Markdown.Markdown(sourceKey, destinationKey);  
                    }

                    Wyam.Html.Excerpt Excerpt()
                    {
                        return new Wyam.Html.Excerpt();  
                    }
                    Wyam.Html.Excerpt Excerpt(string[] separators)
                    {
                        return new Wyam.Html.Excerpt(separators);  
                    }
                    Wyam.Html.Excerpt Excerpt(string querySelector)
                    {
                        return new Wyam.Html.Excerpt(querySelector);  
                    }

                    Wyam.Html.HtmlEscape HtmlEscape()
                    {
                        return new Wyam.Html.HtmlEscape();  
                    }

                    Wyam.Core.Modules.Control.Branch Branch(params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.Branch(modules);  
                    }
                    Wyam.Core.Modules.Control.Branch Branch(System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.Branch(modules);  
                    }

                    Wyam.Core.Modules.Metadata.Meta Meta(string key, object metadata)
                    {
                        return new Wyam.Core.Modules.Metadata.Meta(key, metadata);  
                    }
                    Wyam.Core.Modules.Metadata.Meta Meta(string key, Wyam.Common.Configuration.ContextConfig metadata)
                    {
                        return new Wyam.Core.Modules.Metadata.Meta(key, metadata);  
                    }
                    Wyam.Core.Modules.Metadata.Meta Meta(string key, Wyam.Common.Configuration.DocumentConfig metadata)
                    {
                        return new Wyam.Core.Modules.Metadata.Meta(key, metadata);  
                    }
                    Wyam.Core.Modules.Metadata.Meta Meta(params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Metadata.Meta(modules);  
                    }

                    Wyam.Core.Modules.Metadata.Flatten Flatten()
                    {
                        return new Wyam.Core.Modules.Metadata.Flatten();  
                    }
                    Wyam.Core.Modules.Metadata.Flatten Flatten(string childrenKey)
                    {
                        return new Wyam.Core.Modules.Metadata.Flatten(childrenKey);  
                    }

                    Wyam.Core.Modules.Control.If If(Wyam.Common.Configuration.DocumentConfig predicate, params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.If(predicate, modules);  
                    }
                    Wyam.Core.Modules.Control.If If(Wyam.Common.Configuration.ContextConfig predicate, params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.If(predicate, modules);  
                    }

                    Wyam.Core.Modules.Metadata.Xml Xml()
                    {
                        return new Wyam.Core.Modules.Metadata.Xml();  
                    }
                    Wyam.Core.Modules.Metadata.Xml Xml(string itemXPath)
                    {
                        return new Wyam.Core.Modules.Metadata.Xml(itemXPath);  
                    }
                    Wyam.Core.Modules.Metadata.Xml Xml(string data, string itemXPath)
                    {
                        return new Wyam.Core.Modules.Metadata.Xml(data, itemXPath);  
                    }

                    Wyam.Core.Modules.Control.Concat Concat(params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.Concat(modules);  
                    }
                    Wyam.Core.Modules.Control.Concat Concat(System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.Concat(modules);  
                    }

                    Wyam.Core.Modules.Contents.Content Content(object content)
                    {
                        return new Wyam.Core.Modules.Contents.Content(content);  
                    }
                    Wyam.Core.Modules.Contents.Content Content(Wyam.Common.Configuration.ContextConfig content)
                    {
                        return new Wyam.Core.Modules.Contents.Content(content);  
                    }
                    Wyam.Core.Modules.Contents.Content Content(Wyam.Common.Configuration.DocumentConfig content)
                    {
                        return new Wyam.Core.Modules.Contents.Content(content);  
                    }
                    Wyam.Core.Modules.Contents.Content Content(params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Contents.Content(modules);  
                    }

                    Wyam.Core.Modules.Metadata.Tree Tree()
                    {
                        return new Wyam.Core.Modules.Metadata.Tree();  
                    }

                    Wyam.Core.Modules.Contents.Join Join()
                    {
                        return new Wyam.Core.Modules.Contents.Join();  
                    }
                    Wyam.Core.Modules.Contents.Join Join(Wyam.Core.Modules.Contents.JoinedMetadata metaDataMode)
                    {
                        return new Wyam.Core.Modules.Contents.Join(metaDataMode);  
                    }
                    Wyam.Core.Modules.Contents.Join Join(string delimiter, Wyam.Core.Modules.Contents.JoinedMetadata metaDataMode = Wyam.Core.Modules.Contents.JoinedMetadata.DefaultOnly)
                    {
                        return new Wyam.Core.Modules.Contents.Join(delimiter, metaDataMode);  
                    }

                    Wyam.Core.Modules.Metadata.CopyMeta CopyMeta(string fromKey, string toKey, string format = null)
                    {
                        return new Wyam.Core.Modules.Metadata.CopyMeta(fromKey, toKey, format);  
                    }

                    Wyam.Razor.Razor Razor(System.Type basePageType = null)
                    {
                        return new Wyam.Razor.Razor(basePageType);  
                    }

                    Wyam.Feeds.GenerateFeeds GenerateFeeds()
                    {
                        return new Wyam.Feeds.GenerateFeeds();  
                    }

                    Wyam.Core.Modules.IO.UnwrittenFiles UnwrittenFiles(Wyam.Common.Configuration.DocumentConfig path)
                    {
                        return new Wyam.Core.Modules.IO.UnwrittenFiles(path);  
                    }
                    Wyam.Core.Modules.IO.UnwrittenFiles UnwrittenFiles(string extension)
                    {
                        return new Wyam.Core.Modules.IO.UnwrittenFiles(extension);  
                    }
                    Wyam.Core.Modules.IO.UnwrittenFiles UnwrittenFiles()
                    {
                        return new Wyam.Core.Modules.IO.UnwrittenFiles();  
                    }

                    Wyam.Less.Less Less()
                    {
                        return new Wyam.Less.Less();  
                    }

                    Wyam.Core.Modules.Metadata.ValidateMeta<T> ValidateMeta<T>(string key)
                    {
                        return new Wyam.Core.Modules.Metadata.ValidateMeta<T>(key);  
                    }

                    Wyam.Core.Modules.Control.Sort Sort(System.Comparison<Wyam.Common.Documents.IDocument> sort)
                    {
                        return new Wyam.Core.Modules.Control.Sort(sort);  
                    }

                    Wyam.Html.HtmlInsert HtmlInsert(string querySelector, string content)
                    {
                        return new Wyam.Html.HtmlInsert(querySelector, content);  
                    }
                    Wyam.Html.HtmlInsert HtmlInsert(string querySelector, Wyam.Common.Configuration.DocumentConfig content)
                    {
                        return new Wyam.Html.HtmlInsert(querySelector, content);  
                    }

                    Wyam.Core.Modules.Contents.ReplaceIn ReplaceIn(string search, object content)
                    {
                        return new Wyam.Core.Modules.Contents.ReplaceIn(search, content);  
                    }
                    Wyam.Core.Modules.Contents.ReplaceIn ReplaceIn(string search, Wyam.Common.Configuration.ContextConfig content)
                    {
                        return new Wyam.Core.Modules.Contents.ReplaceIn(search, content);  
                    }
                    Wyam.Core.Modules.Contents.ReplaceIn ReplaceIn(string search, Wyam.Common.Configuration.DocumentConfig content)
                    {
                        return new Wyam.Core.Modules.Contents.ReplaceIn(search, content);  
                    }
                    Wyam.Core.Modules.Contents.ReplaceIn ReplaceIn(string search, params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Contents.ReplaceIn(search, modules);  
                    }

                    Wyam.Core.Modules.IO.ReadFiles ReadFiles(Wyam.Common.Configuration.ContextConfig patterns)
                    {
                        return new Wyam.Core.Modules.IO.ReadFiles(patterns);  
                    }
                    Wyam.Core.Modules.IO.ReadFiles ReadFiles(Wyam.Common.Configuration.DocumentConfig patterns)
                    {
                        return new Wyam.Core.Modules.IO.ReadFiles(patterns);  
                    }
                    Wyam.Core.Modules.IO.ReadFiles ReadFiles(params string[] patterns)
                    {
                        return new Wyam.Core.Modules.IO.ReadFiles(patterns);  
                    }

                    Wyam.Html.AutoLink AutoLink()
                    {
                        return new Wyam.Html.AutoLink();  
                    }
                    Wyam.Html.AutoLink AutoLink(System.Collections.Generic.IDictionary<string, string> links)
                    {
                        return new Wyam.Html.AutoLink(links);  
                    }
                    Wyam.Html.AutoLink AutoLink(Wyam.Common.Configuration.ContextConfig links)
                    {
                        return new Wyam.Html.AutoLink(links);  
                    }
                    Wyam.Html.AutoLink AutoLink(Wyam.Common.Configuration.DocumentConfig links)
                    {
                        return new Wyam.Html.AutoLink(links);  
                    }

                    Wyam.Core.Modules.Control.ConcatBranch ConcatBranch(params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.ConcatBranch(modules);  
                    }
                    Wyam.Core.Modules.Control.ConcatBranch ConcatBranch(System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.ConcatBranch(modules);  
                    }

                    Wyam.Core.Modules.Templates.Xslt Xslt(Wyam.Common.IO.FilePath xsltPath)
                    {
                        return new Wyam.Core.Modules.Templates.Xslt(xsltPath);  
                    }
                    Wyam.Core.Modules.Templates.Xslt Xslt(Wyam.Common.Configuration.DocumentConfig xsltPath)
                    {
                        return new Wyam.Core.Modules.Templates.Xslt(xsltPath);  
                    }
                    Wyam.Core.Modules.Templates.Xslt Xslt(params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Templates.Xslt(modules);  
                    }

                    Wyam.Core.Modules.Control.ForEach ForEach(params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.ForEach(modules);  
                    }
                    Wyam.Core.Modules.Control.ForEach ForEach(System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.ForEach(modules);  
                    }

                    Wyam.Core.Modules.Control.GroupBy GroupBy(Wyam.Common.Configuration.DocumentConfig key, params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.GroupBy(key, modules);  
                    }
                    Wyam.Core.Modules.Control.GroupBy GroupBy(Wyam.Common.Configuration.DocumentConfig key, System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.GroupBy(key, modules);  
                    }
                    Wyam.Core.Modules.Control.GroupBy GroupBy(string keyMetadataKey, params Wyam.Common.Modules.IModule[] modules)
                    {
                        return new Wyam.Core.Modules.Control.GroupBy(keyMetadataKey, modules);  
                    }
                    Wyam.Core.Modules.Control.GroupBy GroupBy(string keyMetadataKey, System.Collections.Generic.IEnumerable<Wyam.Common.Modules.IModule> modules)
                    {
                        return new Wyam.Core.Modules.Control.GroupBy(keyMetadataKey, modules);  
                    }

                    Wyam.Core.Modules.Metadata.Index Index()
                    {
                        return new Wyam.Core.Modules.Metadata.Index();  
                    }

                    Wyam.Yaml.Yaml Yaml()
                    {
                        return new Wyam.Yaml.Yaml();  
                    }
                    Wyam.Yaml.Yaml Yaml(string key, bool flatten = false)
                    {
                        return new Wyam.Yaml.Yaml(key, flatten);  
                    }

                    Wyam.Core.Modules.Metadata.Objects Objects(System.Collections.Generic.IEnumerable<object> objects)
                    {
                        return new Wyam.Core.Modules.Metadata.Objects(objects);  
                    } 
                }

                // Input: lifted object declarations


                public static class ScriptExtensionMethods
                {
                    // Input: lifted extension methods

                }