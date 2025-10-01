---
title: "Centralizing VSTO add in exception management with postsharp 6"
authors: ["mark-burton"]
tags: ["PostSharp", "VSTO"]
description: "After much reading it seems you cannot handle exceptions globally in an Office add-in"
date: "2021-06-18"
---

After much reading around trying to find the best way to implement a global exception handler for a VSTO add-in on [social msdn](https:/social.msdn.microsoft.comForumsvstudioen-USc37599d9-21e8-4c32-b00e-926f97c8f639global-exception-handler-for-vs-2008-excel-addin?forum=vsto), [stackoverflow](
https:/stackoverflow.comquestions12115030catch-c-sharp-wpf-unhandled-exception-in-word-add-in-before-microsoft-displays-e) and the [Add-in Express forum](https:/www.add-in-express.comforumread.php?FID=5&TID=12667) I came across this solution [using postsharp](https:/exceptionalcode.wordpress.com20100217centralizing-vsto-add-in-exception-management-with-postsharp), this was the best solution I found but was 11 years old and relevant to postsharp 2, the library has changed a lot since then and the `PostSharp.Laos` namespace no longer exists as explained the [postsharp support forum](https:/support.postsharp.netrequest21870-postshaplaos-in-version-41).  ## The Solution in PostSharp 6
Happily this is still possible with [PostSharp Community](https:/www.postsharp.netgetcommunity) and is well documented in the [postsharp handling exceptions documentation](https:/doc.postsharp.netexception-handling).  First create a class which inherits from `OnExceptionAspect` for example [VstoUnhandledExceptionAttribute](https:/github.comMarkZitherKimaiDotNetblobmainsrcMarkZither.KimaiDotNet.ExcelAddinVstoUnhandledExceptionAttribute.cs).  ``` csharp
using Microsoft.Extensions.Logging;  using PostSharp.Aspects;
using PostSharp.Serialization;  namespace MarkZither.KimaiDotNet.ExcelAddin
\\\{  [PSerializable]  public class VstoUnhandledExceptionAttribute : OnExceptionAspect  \{  public override void OnException(MethodExecutionArgs args)  {  ExcelAddin.Globals.ThisAddIn.Logger.LogCritical(args.Exception, "Handled by postsharp OnExceptionAspect");  args.FlowBehavior = FlowBehavior.Return;  \\}  }
}
```  This step will vary depending on how you are doing logging in your VSTO Add-In, I chose to use [Microsoft.Extensions.Logging](https:/www.nuget.orgpackagesMicrosoft.Extensions.Logging), while it arrived with [.NET Core](https:/en.wikipedia.orgwiki.NET_Core) it is a .NETStandard 2.0 library and compatible all the way back to .NETFramework 4.6.1.  ``` csharp  private void ThisAddIn_Startup(object sender, System.EventArgs e)
\\{  instantiate and configure logging. Using serilog here, to log to console and a text-file.  var loggerFactory = new Microsoft.Extensions.Logging.LoggerFactory();  var loggerConfig = new LoggerConfiguration()  .MinimumLevel.Debug()  .WriteTo.File("c:\\temp\\logs\\myapp.txt", rollingInterval: RollingInterval.Day)  .CreateLogger();  loggerFactory.AddSerilog(loggerConfig);  // create logger and put it to work.  var logProvider = loggerFactory.CreateLogger<ThisAddIn />();  logProvider.LogDebug("debiggung");  Logger = logProvider;  Configure PostSharp Logging to use Serilog  LoggingServices.DefaultBackend = new MicrosoftLoggingBackend(loggerFactory);  Globals.ThisAddIn.ApiUrl = Settings.Default?.ApiUrl;  Globals.ThisAddIn.ApiUsername = Settings.Default?.ApiUsername;  this.Application.WorkbookActivate += Application_WorkbookActivate;  this.Application.WorkbookOpen += Application_WorkbookOpen;
\}
```  There is one important line in the logging setup which differs to the [PostSharp Logging documentation](https:/doc.postsharp.netlogging-aspnetcore) at the time of writing, `  LoggingServices.DefaultBackend = new MicrosoftLoggingBackend(loggerFactory);` which needs `using PostSharp.Patterns.Diagnostics.Backends.Microsoft;`. This is also useful for trace logging which I will explain further in the next section.  Now decorate methods or entire classes with the `[VstoUnhandledException]` attribute and every exception will be handled by the `OnException` method.  ## Bonus functionality in PostSharp community
As I had logging working I also made use of the features of [PostSharp Logging](https://www.postsharp.net/logging)

First add a `postsharp.config` file, to comply with the license it is required to set the [LoggingDeveloperMode to true](https://doc.postsharp.net/logging-license). Be sure it has the Build Action set to Content so that it is copied to the output directory.

```xml
<?xml version="1.0" encoding="utf-8"?>
<Project xmlns="http://schemas.postsharp.org/1.0/configuration">
  <Property Name="LoggingDeveloperMode" Value="True" />
</Project>
```

This still gives you 24 hours of trace logging after every publish of your VSTO Add-In and full tracing while debugging.

To control what is logged create a class called `GlobalAspects`, this is explained in the [Adding logging to your projects](https://doc.postsharp.net/add-logging) section.

```csharp
using PostSharp.Patterns.Diagnostics;
using PostSharp.Extensibility;  [assembly: Log(AttributePriority = 1, AttributeTargetMemberAttributes = MulticastAttributes.Protected | MulticastAttributes.Internal | MulticastAttributes.Public)]
[assembly: Log(AttributePriority = 2, AttributeExclude = true, AttributeTargetMembers = "get_*")]
```  Now the logging will contain all the entry and exits from methods along with the parameters which were passed, providing valuable debug information for free for a whole day after pushing out and update to the Add-In.