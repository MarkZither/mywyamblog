using Statiq.Core;
using Statiq.Common;
using Statiq.Web.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Statiq.Web.Pipelines;
using Statiq.Web;
using Statiq.SearchIndex;
using System.Diagnostics;

namespace mywyamblog
{
    public class SearchIndex : Pipeline
    {
        public SearchIndex()
        {
            Dependencies.AddRange(
                nameof(Inputs),
                nameof(Content),
                nameof(Archives),
                nameof(Data));

            var docs = new GetPipelineDocuments(ContentType.Content);

            ProcessModules = new ModuleList
            {
                //new ExecuteIf(Config.FromSetting(CustomKeys.GenerateSearchIndex, false))
                new ExecuteIf(IExecutionContext.Current.GetBool("GenerateSearchIndex"))
                {
                    new GetPipelineDocuments(ContentType.Content),

                    // Filter to non-archive content
                    new FilterDocuments(Config.FromDocument(doc => !Archives.IsArchive(doc))),

                    //new FilterDocuments(Config.FromDocument(doc => doc.GetBool("IsPost"))),
                    
                    new ForEachDocument
                    {
                        new ExecuteConfig(Config.FromDocument((searchDoc, ctx) =>
                        {
                            ModuleList modules = new ModuleList();
                            // this isn't right, would like to use IsPost but it doesn't seem to be available
                            if(searchDoc.Destination.Parent.Name.Equals("posts", StringComparison.InvariantCultureIgnoreCase)){
                                var searchItem = new LunrIndexDocItem(
                                    searchDoc,
                                    searchDoc.GetTitle(),
                                    searchDoc.GetContentStringAsync().Result);
                                searchItem.Description = searchDoc.GetString("Lead");
                                searchItem.Tags = searchDoc.GetString("Tags");

                                modules.Add(new SetMetadata("LunrIndexItem",
                                    searchItem
                                ));
                            }
                            
                            return modules;
                        }))
                    },

                    new GenerateLunrIndex("LunrIndexItem", "stopwords.txt", true)
                        .WithDestination("assets/js/searchindex.js")
                }
            };

            OutputModules = new ModuleList
            {
                new WriteFiles()
            };
        }
    }
}
