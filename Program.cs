using System;
using System.Threading.Tasks;
using Microsoft.CodeAnalysis.CSharp.Syntax;
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
        public static async Task<int> Main(string[] args) =>
            await Bootstrapper
                .Factory
                .CreateWeb(args)
                .AddSetting(
                  CustomKeys.GenerateSearchIndex,
                  true)
                .RunAsync();
    }
}
