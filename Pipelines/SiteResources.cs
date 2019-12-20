using Statiq.Common;
using Statiq.Core;

namespace mywyamblog.Pipelines
{
    public class SiteResources : Pipeline
    {
        public SiteResources()
        {
            Isolated = true;

            OutputModules = new ModuleList
            {
                new CopyFiles("**/*{!.cshtml,!.md,!.less,!.yml,!.scss,}")
            };
        }
    }
}