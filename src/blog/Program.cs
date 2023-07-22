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
using Statiq.Lunr;
using Statiq.Web;
using Statiq.Web.Pipelines;
using Statiq.Yaml;
using Statiq.Yaml.Dynamic;

namespace mywyamblog
{
    class Program
    {
        public static IConfiguration Configuration { get; private set; } = new ConfigurationBuilder()
            .SetBasePath(AppContext.BaseDirectory)
            .AddUserSecrets<Program>()
            .Build();

        public static async Task<int> Main(string[] args)
        {
            Configuration = new ConfigurationBuilder()
            .SetBasePath(AppContext.BaseDirectory)
            .AddJsonFile("appsettings.json", false)
            .AddUserSecrets<Program>()
            .AddEnvironmentVariables()
            .AddCommandLine(args)
            .Build();

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
                .AddSettings(settings);

            if(Configuration.GetValue<bool>("DeployNetlify") && !string.IsNullOrEmpty(Configuration.GetValue<string>("DeployNetlifyAccessToken"))){
                bootstrapper.DeployToNetlify(Configuration.GetValue<string>("DeployNetlifySiteId"),
                                Configuration.GetValue<string>("DeployNetlifyAccessToken"));
            }

            if (Configuration.GetValue<bool>("deploygithub")){
                bootstrapper.AddSetting(Keys.LinkRoot, "/mywyamblog");
                bootstrapper.DeployToGitHubPages(
                    Config.FromSetting<string>("DeployGitHubOwner"),
                    Config.FromSetting<string>("DeployGitHubName"),
                    Configuration.GetValue<string>("GITHUB_TOKEN")
                );
            }
                
            return await bootstrapper
                .RunAsync();
        }
    }
}
