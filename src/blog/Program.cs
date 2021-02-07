using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.Configuration;
using MyStatiq.SearchIndex;
using Statiq.App;
using Statiq.Common;
using Statiq.Core;
using Statiq.SearchIndex;
using Statiq.Web;
using Statiq.Web.Pipelines;
using Statiq.Yaml;

namespace mywyamblog
{
    class Program
    {
        public static IConfiguration Configuration { get; } = new ConfigurationBuilder()
            .SetBasePath(AppContext.BaseDirectory)
            .AddUserSecrets<Program>()
            .Build();

        public static async Task<int> Main(string[] args)
        {
            var config = Configuration;
            List<KeyValuePair<string, object>> settings = new List<KeyValuePair<string, object>>();
            foreach (var conf in Configuration.AsEnumerable())
            {
                settings.Add(new KeyValuePair<string, object>(conf.Key, conf.Value));
            }
            var bootstrapper = Bootstrapper
                .Factory
                .CreateWeb(args)
                .BuildConfiguration(cfg => cfg.AddUserSecrets<Program>())
                .AddSetting(
                CustomKeys.GenerateSearchIndex,
                true)
                .AddSettings(settings)
                .DeployToNetlify(Config.FromSetting<string>("NetlifySiteId"),
                    Configuration.GetValue<string>("NetlifyAccessToken"));

            return await bootstrapper
                .RunAsync();
        }
    }
}
