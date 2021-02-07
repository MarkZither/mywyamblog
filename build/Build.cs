using System;
using System.Linq;
using System.Net.Http;
using NetlifySharp;
using Nuke.Common;
using Nuke.Common.CI;
using Nuke.Common.Execution;
using Nuke.Common.Git;
using Nuke.Common.IO;
using Nuke.Common.ProjectModel;
using Nuke.Common.Tooling;
using Nuke.Common.Tools.DotNet;
using Nuke.Common.Tools.GitVersion;
using Nuke.Common.Utilities.Collections;
using static Nuke.Common.EnvironmentInfo;
using static Nuke.Common.IO.FileSystemTasks;
using static Nuke.Common.IO.PathConstruction;
using static Nuke.Common.Tools.DotNet.DotNetTasks;

[CheckBuildProjectConfigurations]
[ShutdownDotNetAfterServerBuild]
class Build : NukeBuild
{
    /// Support plugins are available for:
    ///   - JetBrains ReSharper        https://nuke.build/resharper
    ///   - JetBrains Rider            https://nuke.build/rider
    ///   - Microsoft VisualStudio     https://nuke.build/visualstudio
    ///   - Microsoft VSCode           https://nuke.build/vscode

    public static int Main () => Execute<Build>(x => x.Compile);

    [Parameter("Configuration to build - Default is 'Debug' (local) or 'Release' (server)")]
    readonly Configuration Configuration = IsLocalBuild ? Configuration.Debug : Configuration.Release;

    [Parameter("Personal access token from Netlify")]
    readonly string netlifyToken = "";

    [Parameter("SiteId (API ID) from Netlify")]
    readonly string netlifySiteId = "";

    [Solution] readonly Solution Solution;
    [GitRepository] readonly GitRepository GitRepository;
    [GitVersion (Framework = "netcoreapp3.1")] readonly GitVersion GitVersion;

    AbsolutePath SourceDirectory => RootDirectory / "src";
    AbsolutePath TestsDirectory => RootDirectory / "tests";
    AbsolutePath OutputDirectory => RootDirectory / "output";

    Target RestoreNuke => _ => _
        .OnlyWhenStatic(() => !IsLocalBuild)
        .Executes(() =>
        {
            DotNetTasks
                .DotNetToolUpdate(configuration =>
                    configuration
                        .SetPackageName("Nuke.GlobalTool")
                        .EnableGlobal()
                        .SetVersion("5.0.2"));
        });

    Target Clean => _ => _
        .Before(Restore)
        .Executes(() =>
        {
            SourceDirectory.GlobDirectories("**/bin", "**/obj").ForEach(DeleteDirectory);
            TestsDirectory.GlobDirectories("**/bin", "**/obj").ForEach(DeleteDirectory);
            EnsureCleanDirectory(OutputDirectory);
        });

    Target Restore => _ => _
        .Executes(() =>
        {
            DotNetRestore(s => s
                .SetProjectFile(Solution));
        });

    Target Compile => _ => _
        .DependsOn(Restore)
        .Executes(() =>
        {
            DotNetBuild(s => s
                .SetProjectFile(Solution)
                .SetConfiguration(Configuration)
                .SetAssemblyVersion(GitVersion.AssemblySemVer)
                .SetFileVersion(GitVersion.AssemblySemFileVer)
                .SetInformationalVersion(GitVersion.InformationalVersion)
                .EnableNoRestore());
        });

    /// <summary>
    /// https://rodneylittlesii.com/posts/topic/building-github-actions-with-nuke
    /// </summary>
    Target DeployManual => _ => _
        .DependsOn(Compile)
        .OnlyWhenStatic(() => GitRepository.Branch == "refs/heads/main")
        .Executes(() =>
        {
            DotNetRun(s => s
                .SetNoBuild(true)
                .SetProjectFile(SourceDirectory / "blog")
                );

            
            if (string.IsNullOrEmpty(netlifyToken))
            {
                throw new Exception("Could not get Netlify token environment variable");
            }

            Logger.Info("Deploying output to Netlify");

            var client = new NetlifyClient(netlifySiteId, new HttpClient());
            client.UpdateSiteAsync(OutputDirectory, netlifySiteId).GetAwaiter().GetResult();

            Logger.Info("Deploying to Netlify");
        });

    Target Deploy => _ => _
    .DependsOn(Compile)
    .OnlyWhenStatic(() => GitRepository.Branch == "refs/heads/main")
    .Executes(() =>
    {
        DotNetRun(s => s
            .SetNoBuild(true)
            .SetProjectFile(SourceDirectory / "blog")
            );


        if (string.IsNullOrEmpty(netlifyToken))
        {
            throw new Exception("Could not get Netlify token environment variable");
        }

        Logger.Info("Deploying to Netlify");
    });
}
