using System;
using System.Threading.Tasks;
using Statiq.App;
using Statiq.Markdown;
using Statiq.Razor;

namespace mywyamblog
{
    class Program
    {
        private static async Task<int> Main(string[] args)
        {
            return await Bootstrapper
                .CreateDefault(args)
                .RunAsync();
        }
    }
}
