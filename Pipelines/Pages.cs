using System;
using Statiq.Common;
using Statiq.Core;
using Statiq.Markdown;
using Statiq.Razor;
using Statiq.Yaml;

namespace mywyamblog.Pipelines
{
    public class Pages : Pipeline
    {
        public Pages()
        {
            InputModules = new ModuleList
            {
                new ReadFiles("**/{!_,}*.{cshtml,md}")
            };

            ProcessModules = new ModuleList
            {
                new CacheDocuments
                {
                    new ExtractFrontMatter(new ParseYaml()),
                    new SetMetadata("Title", Config.FromDocument(x => x.GetString("Title", "English"))),
                    new ExecuteIf(
                        Config.FromDocument(doc => doc.Source.Extension.Equals(".md", StringComparison.OrdinalIgnoreCase)),
                        new RenderMarkdown().UseExtensions()),
                    new SetDestination(".html")
                }
            };

            TransformModules = new ModuleList
            {
                new RenderRazor().WithLayout((FilePath)"/_StatiqLayout.cshtml")
            };

            OutputModules = new ModuleList
            {
                new WriteFiles()
            };
        }
    }
}