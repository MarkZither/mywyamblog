
var searchModule = function() {
    var documents = [];
    var idMap = [];
    function a(a,b) { 
        documents.push(a);
        idMap.push(b); 
    }

    a(
        {
            id:0,
            title:"Test blog post docs",
            content:"Test Blog Post test post created NetlifyCMS Wyam https wyam io checking still working need add Editorial Workflow",
            description:"blog post written NetlifyCMS",
            tags:'NetlifyCMS'
        },
        {
            url:'/posts/2018-02-11-test-blog-post-for-docs.md',
            title:"Test blog post for docs",
            description:"This blog post was written in NetlifyCMS"
        }
    );
    a(
        {
            id:1,
            title:"Secure ASP NET Core Health Checks specific port",
            content:"secure Health Checks possible make available internal addresses different port publicly served pages API endpoints First need make service available over different ports achieved adding Urls value appsettings config json Logging IncludeScopes false LogLevel Default Debug System Information Microsoft Information Urls http localhost http localhost ManagementPort ConnectionStrings LoginServiceDb Data Source Initial Catalog LoginServiceDatabase Integrated Security true done several ways described more detail Andrew Lock post ways set URLs ASP NET Core app https andrewlock net -ways-to-set-the-urls-for-an-aspnetcore-app Now debug service see log listening ports info Microsoft Hosting Lifetime Now listening http localhost info Microsoft Hosting Lifetime Now listening http localhost info Microsoft Hosting Lifetime Application started Press Ctrl shut down Now service listening addresses specify one serve up Health Checks setting ManagementPort startup cs use ManagementPort secure Health Check endpoint C# HealthCheck middleware app UseHealthChecks hc Configuration ManagementPort new HealthCheckOptions Predicate true ResponseWriter UIResponseWriter WriteHealthCheckUIResponse app UseEndpoints endpoints endpoints MapControllerRoute default controller Home action Index id endpoints MapHealthChecks health RequireHost Configuration ManagementPort debug now access health endpoint ManagementPort public facing URL HealthCheck external shows internal shows overall health status assets Images health endpoint png img-fluid img-responsive More interestingly go hc endpoint contains more detailed information state service therefore needs secured HealthCheck external shows internal shows detailed health status assets Images hc endpoint png img-fluid img-responsive Now safely status services reported json further aspects ASP NET Core Health Checks UI push-based monitoring cover those parts",
            description:"Health Checks ASP NET Core give valuable insights health services includes sensitive data leaked externally",
            tags:'ASP.NET Core'
        },
        {
            url:'/posts/2020-09-08-Secure-ASP.NET-Core-Health-Checks-to-a-specific-port.md',
            title:"Secure ASP.NET Core Health Checks to a specific port",
            description:"Health Checks in ASP.NET Core can give valuable insights into the health of services, but that includes sensitive data that should not be leaked externally."
        }
    );
    a(
        {
            id:2,
            title:"Secure Swagger ASP NET Core address port",
            content:"follows previous post Secure ASP NET Core Health Checks specific port -secure-asp net-core-health-checks-to-a-specific-port assumes already service running over port specified ManagementPort appsettings json file Swagger powerful tool test APIs allow users easily discover consume APIs open up security issues make easier attackers access data Best practice secure access Swagger pages using OAuth described Scott Brady https www scottbrady com Identity-Server ASPNET-Core-Swagger-UI-Authorization-using-IdentityServer scenarios better Swagger pages accessible externally discussed GitHub issue possible out box limit access specific URL https github com domaindrivendev Swashbuckle issues changing SwaggerEndpoint specify absolute URL possible prevent access documentation public facing URL C# app UseSwaggerUI SwaggerEndpoint http localhost swagger swagger json Login Service API RoutePrefix string Empty still leaves Swagger homepage accessible displaying error message due CORS issues Swagger CORS error assets Images swagger internal error png img-fluid img-responsive reject requests Swagger internal address need create middleware something suggestion Thwaitesy https github com domaindrivendev Swashbuckle issues #issuecomment- C# public class SwaggerUrlPortAuthMiddleware private readonly RequestDelegate next public SwaggerUrlPortAuthMiddleware RequestDelegate next next next public async Task InvokeAsync HttpContext context IConfiguration configuration Make sure hitting swagger path doing locally management port context Request Path StartsWithSegments swagger configuration GetValue ManagementPort Equals context Request Host Port Return unauthorized context Response StatusCode int HttpStatusCode Unauthorized await next Invoke context public bool IsLocalRequest HttpContext context Handle running using Microsoft AspNetCore TestHost site being run entirely locally memory without actual TCP IP connection context Connection RemoteIpAddress null context Connection LocalIpAddress null return true context Connection RemoteIpAddress Equals context Connection LocalIpAddress return true IPAddress IsLoopback context Connection RemoteIpAddress return true return false assets Images baget project layout png img-fluid img-responsive pull-right Assuming project layout something BaGet https github com loic-sharma BaGet middleware added shared project Extensions directory Add following extension method IApplicationBuilderExtensions add middleware keep startup clean C# public static class SwaggerAuthorizeExtensions public static IApplicationBuilder UseSwaggerAuthorized IApplicationBuilder builder return builder UseMiddleware middleware registered before swagger startup cs change Configure add middleware calling new extension method C# public void Configure IApplicationBuilder app IWebHostEnvironment env app UseSwaggerAuthorized app UseSwagger app UseSwaggerUI SwaggerEndpoint swagger json Login Service API Now running service return public facing URL serve swagger internally Public facing swagger returns internal works assets Images swagger secured port png img-fluid img-responsive still recommended secure swagger OAuth misconfiguration still lead Swagger being exposed way example behind reverse proxy",
            description:'',
            tags:'ASP.NET Core'
        },
        {
            url:'/posts/2020-09-08-secure-swagger-on-asp-net-core-by-address-and-port.md',
            title:"Secure Swagger on ASP.NET Core by address and port",
            description:""
        }
    );
    a(
        {
            id:3,
            title:"Getting out Swagger ASP NET Core api",
            content:"Even next configuration additional work API Swagger already provides great insights API give consumers API even more information expect API add annotations",
            description:'',
            tags:'ASP.NET Core'
        },
        {
            url:'/posts/2020-09-09-getting-the-most-out-of-swagger-in-your-asp-net-core-api.md',
            title:"Getting the most out of Swagger in your ASP.NET Core api",
            description:""
        }
    );
    a(
        {
            id:4,
            title:"Setup ASP NET Core Health Check UI",
            content:"Part one -secure-asp net-core-health-checks-to-a-specific-port setup health check endpoints now add frontend Health Checks UI -secure-asp net-core-health-checks-to-a-specific-port best hosted service consolidate health checks number services Swagger CORS error assets Images HealthChecksUI png img-fluid img-responsive Adding HealthChecks UI service involves adding nuget packages main AspNetCore HealthChecks UI package storage provider initially used InMemory storage provider need see historical data providers various databases including SqlServer SQLite used persist data xml HealthChecks nuget packages used projects set version numbers centrally Directory Build props https github com MarkZither SwaggerAndHealthCheckBlog blob master Directory Build props xml HealthChecks UI now added ConfigureServices Configure Startup cs https github com MarkZither SwaggerAndHealthCheckBlog blob master src MonitoringService Startup cs want limit access UI same way HealthCheck endpoints service listening multiple ports use RequireHost configuring endpoints ensure UI accessible internally c# public void ConfigureServices IServiceCollection services services AddHealthChecksUI AddInMemoryStorage services AddControllers public void Configure IApplicationBuilder app IWebHostEnvironment env app UseHealthChecksUI app UseEndpoints endpoints endpoints MapControllers endpoints MapHealthChecksUI config config UIPath hc-ui RequireHost Configuration ManagementPort Finally need tell UI read HealthChecks done configuration file json https port Urls http localhost https localhost https localhost ManagementPort AllowedHosts HealthChecks-UI HealthChecks Name LoginService Check Uri https localhost hc Name ResourceService Check Uri https localhost hc Name NotificationService Check Uri https localhost hc code adding settings AddHealthChecksUI method c# services AddHealthChecksUI setupSettings settings settings DisableDatabaseMigrations AddHealthCheckEndpoint name healthCheckName uri healthCheckUri AddWebhookNotification name webhookName uri webhookUri payload webhookPayload restorePayload webhookRestorePayload SetEvaluationTimeInSeconds evaluationTimeInSeconds SetMinimumSecondsBetweenFailureNotifications minimumSeconds AddInMemoryStorage full working demo GitHub repo https github com MarkZither SwaggerAndHealthCheckBlog",
            description:'',
            tags:'ASP.NET Core'
        },
        {
            url:'/posts/2020-09-09-how-to-setup-asp-net-core-health-check-ui.md',
            title:"How to Setup ASP.NET Core Health Check UI",
            description:""
        }
    );
    a(
        {
            id:5,
            title:"Experimenting YARP Reverse Proxy",
            content:"Route inbound URL reverse proxy going act cluster list potential destination URLs ReverseProxy Routes RouteId LoginServiceRoute ClusterId clusterLoginService Match Path loginservice remainder Transforms PathRemovePrefix loginservice Clusters clusterLoginService Destinations clusterLoginService destination Address https localhost similar NGINX virtual server configuration nginx server listen server name localhost location loginservice proxy pass https localhost Take care adding transformation route add single transformation wrapped transformations lots confusion mistake looked json RouteId TestServiceRoute ClusterId clusterTestService Match Path testservice remainder Transforms PathRemovePrefix testservice took debugging YARP source figure out mistake resulted errors due URLs https localhost loginservice hc instead correct https localhost hc json RouteId TestServiceRoute ClusterId clusterTestService Match Path testservice remainder Transforms -- missing PathRemovePrefix testservice -- missing easier see issue soon start adding additional transformations preview example possible transform route values querystring parameters now clear Transformations array json RouteId TestPatternServiceRoute ClusterId clusterTestService Match Path testpatternservice remainder Transforms PathPattern search QueryRouteParameter Append remainder",
            description:"YARP reverse proxy toolkit building fast proxy servers NET using infrastructure ASP NET NET",
            tags:'ASP.NET Core'
        },
        {
            url:'/posts/2020-09-14-experimenting-with-yarp-a-reverse-proxy.md',
            title:"Experimenting with YARP: A Reverse Proxy",
            description:"YARP is a reverse proxy toolkit for building fast proxy servers in .NET using the infrastructure from ASP.NET and .NET."
        }
    );
    a(
        {
            id:6,
            title:"Local Hostname Resolution Port",
            content:"Adding friendly local URLs services setup mailhog https github com mailhog MailHog run docker exposed port accessible http mailhog local Gitea https gitea io en-us adapted stackoverflow answer Using port number Windows host file number options proposed answer question including using nginx apache act reverse proxy running fiddler time proxy requests chose netsh approach already make use netsh thought good understand more built Windows ## Setting up local DNS several way quickest probably add entries host file another way install Unbound lucky enough local Active Directory server configure although won work networks possible make work entire block reserved local loopback address work more interesting reading stackoverflow https serverfault com questions why-is-loopback-ip-address-from- -to- RFC https www ietf org rfc rfc txt alert-danger ### Hosts file Add new entry each service hosts file Windows System drivers etc cmd mailhog internal git internal ### Unbound Install Unbound https nlnetlabs nl projects unbound download Add entries service conf default Windows Program Files Unbound ### local vs localhost vs test vs internal reading round circles reserved TLDs such rfc https tools ietf org html rfc #page- lists test example invalid localhost reserved domain names stackoverflow best practices internal domain network names https stackoverflow com questions add-subdomain-to-localhost-url TechNet article https social technet microsoft com wiki contents articles active-directory-best-practices-for-internal-domain-and-network-names aspx goes back previous advice use local internal risks using initial choice local due possible clashes mDNS Zero Configuration Networking Trying use servicename localhost mixed results works hosts file causes Unbound throw error fail start noticing docker uses internal finally found RFC #appendix-G https tools ietf org html rfc #appendix-G lists intranet internal private corp home lan proposed reserved domain names settled using internal alert-info cmd server local-data mailhog internal local-data-ptr mailhog internal local-data git internal local-data-ptr git internal Restart service make sure new settings used Add top list DNS servers network settings Network settings DNS server assets Images local dns unbound network settings png ## Add netsh interface portproxy netsh interface portproxy add tov listenport listenaddress connectport connectaddress netsh interface portproxy add tov listenport listenaddress connectport connectaddress domain name netsh interface portproxy add tov listenport listenaddress mailhog connectport connectaddress netsh interface portproxy add tov listenport listenaddress git local connectport connectaddress Between million loopback addresses thousand usable according TCP IP number usage Microsoft article Port Exhaustion ports leaves whole lot services address single machine alert-info still need figure out work IPv moment use IPv locally need understand exact equivalence netsh interface portproxy add tov listenport listenaddress IPv Address HostName connectaddress IPv Address HostName connectport Integer ServiceName listenaddress IPv Address HostName protocol tcp Full Network Shell netsh documentation https docs microsoft com en-us windows-server networking technologies netsh netsh-interface-portproxy Microsoft docs ## References Using port number Windows host file https stackoverflow com TCP IP number usage https stackoverflow com questions what-is-the-largest-tcp-ip-network-port-number-allowable-for-ipv Port Exhaustion https docs microsoft com en-us archive blogs askds port-exhaustion-and-you-or-why-the-netstat-tool-is-your-friend",
            description:"Resolve Local Hostname Port",
            tags:'netsh'
        },
        {
            url:'/posts/2020-09-17-local-hostname-resolution-to-port.md',
            title:"Local Hostname Resolution To Port",
            description:"How to Resolve a Local Hostname to a Port"
        }
    );
    a(
        {
            id:7,
            title:"Migrating blog Wyam Statiq",
            content:"initial steps setup new blog Statiq migrate Wyam covered porting Wyam https github com statiqdev CleanBlog#porting-from-wyam document CleanBlog repo additional points raised GitHub discussions StatiqDev Discussions repo https github com statiqdev Discussions discussions specifically Migration Wyam https github com statiqdev Discussions discussions discussion customized blog slightly using Wyam additional work ## Bringing back triangles Several javascript libraries removed CleanBlog theme used generate dynamic triangles header background image used started discussion Javascript changes between Wyam Statiq CleanBlog triangles gone https github com statiqdev Discussions discussions reintroduced necessary libraries bring back triangles ## Font Awesome Updates move FontAwesome means many icons stopped working due brand icons moving new prefix change fa fab number places fa still works appears better change those fas based FontAwesome upgrading version guide https fontawesome com how-to-use on-the-web setup upgrading-from-version- ## Fix styles custom navbar entries added dropdown navbar lost style upgrade appears bootstrap upgrade issue ## Publishing Netlify Install Netlify CLI npm install netlify-cli -g ## Exclude NetlifyCMS directory processing copy output managing Wyam blog NetlifyCMS https github com MarkZither mywyamblog tree master input admin simply directory called admin files index html config yml Wyam copied those files unchanged output Statiq changed processes html file makes invalid skips config yml file adds link admin NavBar Adding file called directory yml admin directory makes possible set directory wide meta data ShowInNavBar False removes admin link NavBar setting ContentType MediaType discussed StatiqDev GitHub discussion Migration Wyam https github com statiqdev Discussions discussions resulted desired behaviour yaml ShowInNavBar False ContentType Asset MediaType text plain ## Update post-footer cshtml set Disqus configuration variables c# CONFIGURATION VARIABLES EDIT BEFORE PASTING WEBPAGE var disqus identifier Document Destination FileNameWithoutExtension FullPath var disqus title Document GetString Title var disqus url Document GetLink true ## Setup javascript Lunr based search ## Setup GenerateLunrIndex build searchindex js file",
            description:"CleanBlog theme created Statiq time try migrate",
            tags:'Wyam'
        },
        {
            url:'/posts/2020-09-21-migrating-my_blog-from-wyam-to-statiq.md',
            title:"Migrating my blog from Wyam to Statiq",
            description:"The CleanBlog theme has been created for Statiq so time to try and migrate."
        }
    );
    a(
        {
            id:8,
            title:"Blue Angels RAF Hucknall Airshow",
            content:"## References https forums airshows co uk viewtopic php https www britmodeller com forums index php topic -hucknall-airday- https nottstalgia com forums topic -hucknall-airfield page https www key aero forum historic-aviation -worst-airshow page https www fightercontrol co uk forum viewtopic php http huflighttestmuseum co uk visit html",
            description:"Navy Blue Angels aerobatic team won believe happened next",
            tags:'Blue Angles'
        },
        {
            url:'/posts/2020-09-23-Blue-Angels-at-RAF-Hucknall-Airshow.md',
            title:"Blue Angels at RAF Hucknall Airshow",
            description:"In 1973 the U.S. Navy Blue Angels aerobatic team, you won't believe what happened next!"
        }
    );
    a(
        {
            id:9,
            title:"Signing Documents LuxTrust Signing Stick",
            content:"## Installation Installation easy enough download correct installer LuxTrust Middleware Download page install see LuxTrust Middleware running system tray System Tray LuxTrust Middleware Install assets images LuxTrust Middleware Post Install png img-fluid img-responsive notice icons added systray LuxTrust Middleware distinctive logo LuxTrust Middleware System Tray Icon assets images LuxTrust Systray Icon png img-fluid img-responsive many options click Middleware icon configure allows change log level Support tab provides easy access log file found UserProfile luxtrust logs become useful quite soon LuxTrust Middleware System Tray Icon assets images Gemalto Systray Icon png img-fluid img-responsive second icon Right click icon choose greeted Gemalto Classic Client box Gemalto Classic Client Box assets images Gemalto png img-fluid img-responsive Gemalto toolbox installed system mentioned anywhere LuxTrust Middleware Installation Guide warning links pdf watching installer closely see installed Classic Client Toolbox ## Activation ## Signing PDF ## Signing XML Finding right software sign XML file easy following list software tried mixed results Szafir Doesn seem recognise LuxTrust Signing Stick certificates very nice validator XML Signer Doesn support XAdES XMLDSig Hangs logged Gemalto Classic Client Toolbox unlock private keys XML validator Buddy Doesn support XAdES XMLDSig DSS Demonstration WebApp Sign Document Requires NexU LuxTrust Middleware Download https www luxtrust lu simple LuxTrust Middleware Installation Guide https www luxtrust lu upload data guides UG- -P-E-Install LuxTrust Middleware Windows pdf LuxTrust Pin Management Guide https www luxtrust lu downloads guides UG- -P-E-Gestion Pin Windows pdf Guichet lu Technical Help https guichet public lu en support aide aides-techniques html LuxTrust Javaless https www luxtrust com the-new-luxtrust-middleware- -javaless Szafir https www elektronicznypodpis pl en offer software-for-the-e-signature XML Signer https www signfiles com xml-signer XML validator Buddy https www xml-buddy com ValidatorBuddy htm DSS Demonstration WebApp Sign Document https ec europa eu cefdigital DSS webapp-demo sign-a-document XAdES https en wikipedia org wiki XAdES XMLDSig https en wikipedia org wiki XML Signature NexU https nowina lu solutions java-less-browser-signing-nexu Nexu Open Source GitHub https github com nowina-solutions nexu",
            description:"easy sign documents LuxTrust Signing Stick much trial error worked",
            tags:'LuxTrust Signing Stick'
        },
        {
            url:'/posts/2020-10-04-Signing-Documents-With-LuxTrust-Signing-Stick.md',
            title:"Signing Documents With a LuxTrust Signing Stick",
            description:"It is not as easy as it should be to sign documents with a LuxTrust Signing Stick, after much trial and error this is what worked for me."
        }
    );
    a(
        {
            id:10,
            title:"Validation asp net Configuration Startup",
            content:"Using Options pattern ASP NET Core allows benefit Options validation fires first time configuration accessed Options Pattern build top Configure OptionsBuilder Bind IConfiguration config actually call Configure IConfiguration config directly equivalent Both methods same job AddOptions came later allows more customizations much better prevent service starting configuration values missing invalid values Such functionality provided framework net GitHub issue Options Validation support eager validation remains open following method Options Validation taken Baget small modifications allow sharing implementation multiple services full working demo GitHub repo https github com MarkZither SwaggerAndHealthCheckBlog Options pattern ASP NET Core https docs microsoft com en-us aspnet core fundamentals configuration options view aspnetcore- #options-validation Options validation https docs microsoft com en-us aspnet core fundamentals configuration options view aspnetcore- #options-validation Options Validation support eager validation https github com dotnet runtime issues Baget https github com loic-sharma BaGet ConfigureOptions doesn register validations expected https github com dotnet runtime issues",
            description:'',
            tags:'ASP.NET Core'
        },
        {
            url:'/posts/2020-11-08-validating-asp.net-application-configuration-at-startup.md',
            title:"Validation asp.net Configuration at Startup",
            description:""
        }
    );
    a(
        {
            id:11,
            title:"fork cloned repository Visual Studio",
            content:"fork cloned repository Visual Studio based gists https gist github com jpierson dd cc cb ddf https gist github com ElectricRCAircraftGuy ca ac fork repository github go team explorer repository settings Repository Settings assets Images GitHub fork Repository Settings png rename local origin upstream update push address new repo always items waiting pushed Rename remote upstream assets Images GitHub fork Repository Rename Upstream png add new remote called origin Repository Settings assets Images GitHub fork Repository Settings png commit changes fetch new origin won work conflicting changes pull merge worked update push remote use origin upstream otherwise still pushing original repo don permissions see something Error encountered pushing remote repository Git failed fatal error unable access https github com Demo AspNetCore PushNotifications git requested URL returned error Pushing https github com Demo AspNetCore PushNotifications git",
            description:'',
            tags:'GitHub'
        },
        {
            url:'/posts/Fork%20a%20cloned%20git%20repository.md',
            title:"How to fork a cloned repository in Visual Studio",
            description:""
        }
    );
    a(
        {
            id:12,
            title:"Job Interview Technical Test Preparation",
            content:"ASP NET MVC Custom Model Binding docs microsoft com https docs microsoft com en-us aspnet core mvc advanced custom-model-binding Apply controller action specifying signature public IActionResult EncodedName ModelBinder typeof Base StringBinder string name Apply model using ModelBinder BinderType typeof AuthorEntityBinder register startup cs csharp public void ConfigureServices IServiceCollection services services AddMvc options Insert top gets used before default binder options ModelBinderProviders Insert new AuthorEntityBinderProvider using model binder provider https github com aspnet Docs tree master aspnetcore mvc advanced custom-model-binding sample CustomModelBindingSample csharp public class AuthorEntityBinderProvider IModelBinderProvider context Metadata ModelType typeof Author return new BinderTypeModelBinder typeof AuthorEntityBinder return null ## Decode base string csharp string decodedJson Encoding UTF GetString Convert FromBase String value ## Deserialise json convert https www newtonsoft com json help html Newtonsoft Json JsonConvert htm csharp Product product new Product product Name Apple product ExpiryDate new DateTime product Price product Sizes new string Small Medium Large string output JsonConvert SerializeObject product Name Apple ExpiryDate Price Sizes Small Medium Large Product deserializedProduct JsonConvert DeserializeObject output without netwonsoft https msdn microsoft com en-us library windows apps system runtime serialization json datacontractjsonserializer vs aspx csharp DataContract public class Product DataMember public string Name set DataMember public DateTime ExpiryDate set public static string WriteFromObject Product user new Product Bob DateTime Now MemoryStream ms new MemoryStream Serializer User object stream DataContractJsonSerializer ser new DataContractJsonSerializer typeof Product ser WriteObject ms product byte json ms ToArray ms Close return Encoding UTF GetString json json Length public static User ReadToObject string json Product deserializedProduct new Product MemoryStream ms new MemoryStream Encoding UTF GetBytes json DataContractJsonSerializer ser new DataContractJsonSerializer deserializedUser GetType deserializedUser ser ReadObject ms Product ##As action filter decorate controller action DecodingFilter csharp internal class DecodingFilterAttribute Attribute IActionFilter public void OnActionExecuting ActionExecutingContext context object param context ActionArguments TryGetValue name out param context ActionArguments name Encoding UTF GetString Convert FromBase String param ToString context ActionArguments Add name come action filter #CQRS Martin Fowler Command Query Responsibility Segregation https www martinfowler com bliki CQRS html #Message queues ##AMQP Azure Service Bus NET Standard client library https www nuget org packages Microsoft Azure ServiceBus Using Service Bus NET AMQP https docs microsoft com en-us azure service-bus-messaging service-bus-amqp-dotnet Void Action prints Debug WriteLine Returns Func add return",
            description:'',
            tags:'ASP.NET Core'
        },
        {
            url:'/posts/Job%20Interview%20Technical%20Test%20Preparation.md',
            title:"Job Interview Technical Test Preparation",
            description:""
        }
    );
    a(
        {
            id:13,
            title:"First Post",
            content:"Welcome MiniBlog clone net core initial idea behind learn differences building website ASP net CORE run raspberry pi sure much easier ways achieve choose MiniBlog starting point need database ended up sqlite database identity tables seems longer specify users web config previous versions ASP net using forms authentication ###list things learn work through strongly typed configs yay sqlite ef core Julie Lerman Geoffrey Grosenback nice introduction EF Core PluralSight https www pluralsight com courses play-by-play-ef-core- -first-look-julie-lerman upgrading packages terrible side effects IOptions Microsoft Framework OptionsModel IOptions Microsoft Extensions Options IOptions leaving reference Microsoft Framework OptionsModel metaweblog api Open Live Writer integration now using markdown monster XMLRPC thanks Shawn Wildermuth ### Setting up EF CORE SQLite easy adding json Microsoft EntityFrameworkCore SQLite project json sure put add dependencies use sort fix things Update startup cs use sqlite sqlserver csharp method gets called runtime Use method add services container public void ConfigureServices IServiceCollection services services AddDbContext options options UseSqlite Configuration GetConnectionString DefaultConnection ### Links MiniBlog http github com madskristensen miniblog ASP NET Core Middleware Component Implementing MetaWeblog API https github com shawnwildermuth MetaWeblog Source MiniBlog http github com madskristensen miniblog Source EF Core https www pluralsight com courses play-by-play-ef-core- -first-look-julie-lerman Source Open Live Writer http openlivewriter org Source Markdown Monster Web Site http markdownmonster west-wind com Source ASP NET Core Middleware Component Implementing MetaWeblog API https github com shawnwildermuth MetaWeblog",
            description:'',
            tags:'Introduction'
        },
        {
            url:'/posts/miniblog%20clone.md',
            title:"First Post",
            description:""
        }
    );
    a(
        {
            id:14,
            title:"Resolving System NotSupportedException data available encoding net Core",
            content:"Character Encoding NET Core https stackoverflow com questions encoding-getencoding-cant-work-in-uwp-app encodings NET core Encoding RegisterProvider CodePagesEncodingProvider Instance https msdn microsoft com en-us library system text encodingprovider vs aspx Message System NotSupportedException data available encoding information defining custom encoding see documentation Encoding RegisterProvider method Encoding RegisterProvider CodePagesEncodingProvider Instance",
            description:'',
            tags:'.NET Core'
        },
        {
            url:'/posts/NotSupportedException%20exception%20using%20Encoding%20in%20.net%20core.md',
            title:"Resolving System.NotSupportedException No data is available for encoding 850 in .net Core",
            description:""
        }
    );
    a(
        {
            id:15,
            title:"NUnit Tests Showing Visual Studio Test Explorer",
            content:"NUnit Tests Showing Visual Studio Test Explorer Regularly opening solution containing project NUnit tests Visual Studio Community Test Explorer window show tests assets Images Empty Test Explorer png message suggests simply building solution fix tests appear Test Explorer Regularly outcome Test Explorer window remaining resolutely empty fix necessary open Tools Extensions Updates assets Images Tools Extensions Updates Menu png Search NUnit find NUnit Test Adapter assets Images Tools Extensions Updates png Click enable restart Visual Studio tests now show correctly",
            description:'',
            tags:'NUnit'
        },
        {
            url:'/posts/Nunit_Tests_Not_Showing_In_Test_Explorer.md',
            title:"NUnit 3 Tests Are Not Showing In Visual Studio Test Explorer",
            description:""
        }
    );
    a(
        {
            id:16,
            title:"Playing Service Workers",
            content:"Service workers Push API Notifcations API PWAs work service workers supported serviceworker-warning ## Location serviceworker js file scope matters started sw js file assets scripts folder rest script files calls navigator serviceWorker getRegistration never returning stackoverflow thread explains issue Service Worker never ready https stackoverflow com questions navigator-serviceworker-is-never-ready Maybe proper way navigator serviceWorker register sw js scope ## Subscribe notifications Subscribe Push Notifications Unsubscribe Push Notifications Topic Urgency Very Low Low Normal High Send Push Notification Log Clear ## Building Progressive Web Apps Chris Love Great explaination Service Workers further reading offer https love dev com dnrpwa Chris course episode DotNetRocks https dotnetrocks com show PWA Builder http www pwabuilder com generator ## CORS blog static site backend hosted azure neccessary setup CORS using one examples here Enabling Cross-Origin Requests CORS https docs microsoft com en-us aspnet core security cors don forget CORS section Azure using window addEventListener load function Registration successful console log PAGE Notification permission askPermission setTimeout notify function notify var title Welcome blog var body Enjoy post service workers push notification APIs var icon https noknok pl images favico png var tag simple-push-demo-notification-tag Notification permission granted navigator serviceWorker getRegistration function reg reg showNotification title body body icon icon tag tag function askPermission return new Promise function resolve reject const permissionResult Notification requestPermission function result resolve result permissionResult permissionResult resolve reject function permissionResult permissionResult granted throw new Error weren granted permission",
            description:'',
            tags:'Service Workers'
        },
        {
            url:'/posts/Playing-with-Service-Workers.md',
            title:"Playing with Service Workers",
            description:""
        }
    );
    a(
        {
            id:17,
            title:"Running ASP NET Core RaspberryPi Nginx",
            content:"Running ASP NET Core RaspberryPi Nginx followed instructions Started https blogs msdn microsoft com david setting up raspian dotnet core raspberry pi docs microsoft com https docs microsoft com en-us aspnet core publishing linuxproduction tabs aspnetcore found additional configuration required prerequisites prerequisites https github com dotnet core blob master Documentation prereqs md required error perl Failed load error libunwind open shared object file such file directory Failed bind CoreCLR var www PublishOutput libcoreclr Permissions chmod Tell Kestrel listen running headless need Kestrel listening external requests confirm app running done using ASPNETCORE URLS environment variable perl ASPNETCORE URLS http dotnet App dll Create service file add symlink dotnet limit changes service file perl sudo ln -s opt dotnet dotnet usr bin dotnet Configuring SSL building nginx source SSL used nginx-core",
            description:'',
            tags:'ASP.NET Core'
        },
        {
            url:'/posts/Running%20ASP.NET%20Core%20on%20a%20RaspberryPi%202%20with%20Nginx.md',
            title:"Running ASP.NET Core on a RaspberryPi 2 with Nginx",
            description:""
        }
    );
    a(
        {
            id:18,
            title:"Setting up Raspberry Pi NGINX PHP MySQL LEMP Stack",
            content:"Setting up Raspberry Pi NGINX PHP MySQL LEMP Stack Ste Wright already written up install PHP RPi same works RPi rewrite here Ste Wright Turn Raspberry Pi PHP powered web server https www stewright turn-raspberry-pi- -php- -powered-web-server Follow blog except step run PERL sudo apt-get install php-fpm check version PERL php -v see something PERL PHP bpo cli built Feb NTS Copyright PHP Group Zend Engine Copyright Zend Technologies Zend OPcache bpo Copyright Zend Technologies use instructions setup PHP Nginx https www digitalocean com community tutorials how-to-install-linux-nginx-mysql-php-lemp-stack-in-ubuntu- Make sure enable PHP Nginx config file ensure pointing correct location PERL location php include snippets fastcgi-php conf php -cgi alone fastcgi pass php -fpm fastcgi pass unix var run php php -fpm sock restart Nginx pick up new configuration sudo nginx -s reload Test simple php page using order serve extensionless html pages update try files location block setting up sites-available server blocks config PERL location try files uri uri html uri Install MySQL following tutorial again Ste Wright Install MySQL Server Respberry Pi https www stewright install-mysql-server-raspberry-pi now working nginx server running PHP scripts next time setup piwik monitor traffic website",
            description:'',
            tags:'Raspberry Pi'
        },
        {
            url:'/posts/Setting-Raspberry-Pi-NGINX-PHP-MySQL-LEMP-Stack.md',
            title:"Setting up a Raspberry Pi NGINX PHP MySQL LEMP Stack",
            description:""
        }
    );
    a(
        {
            id:19,
            title:"Using Netlify Identity NetlifyCMS Wyam",
            content:"Setup AppVeyor continuous deployment started simple NetlifyCMS setup without editorial workflow use AppVeyor Continuous Integration https wyam io docs deployment appveyor Wyam document place once publish post NetlifyCMS pushed GitHub seen part posts Setting-up-NetlifyCMS-with-Wyam---Part- build triggered AppVeyor output pushed branch specified appveyor yml docs gh-pages same repository display properly GitHub pages site runs subdirectory changing build script step include LinkRoot setting match GitHub pages subdirectory fix build script Wyam wyam --output output -s LinkRoot BigDoorWyamBlog https noknokmls github io BigDoorWyamBlog posts -where-i-live-john-naughton-krakow-rzaska html Setup Netlify site use Now AppVeyor building site pushing output back GitHub configure deploy settings Netlify changes automatically published blog",
            description:"test lead",
            tags:'Wyam'
        },
        {
            url:'/posts/Setting-up-NetlifyCMS-with-Wyam---Part%202.md',
            title:"Using Netlify Identity with NetlifyCMS and Wyam",
            description:"test a lead"
        }
    );
    a(
        {
            id:20,
            title:"Setting up NetlifyCMS Wyam Part",
            content:"Setting up NetlifyCMS Wyam Despite length series blog posts NetlifyCMS actually really easy setup involves configuration few different tools working automated fashion publishing post CMS thereby file being pushed GitHub automatically building publishing site instance Netlify familiar tools started please leave comment improvements made Lets start Wyam NetlifyCMS Wyam different static content toolkit used generate web sites produce documentation create ebooks much more everything configured chaining together flexible modules even write yourself limits create imagination -- wyam io https wyam io Netlify CMS open source content management system Git workflow enables provide editors friendly UI intuitive workflow use static site generator create faster more flexible web projects -- NetlifyCMS https www netlifycms org docs intro ## Now onto steps went through setup NetlifyCMS blog information worked makes assumptions code GitHub repository site hosted Netlify using AppVeyor continuous deployment editor blog Part deal adding users Netlify Identify features blog know CMS accessed manually adding admin site URL happy pushing changes directly master Part explain editorial workflow saves drafts feature branches creates PR merges once post published ## Changes Wyam project ### Add admin directory under Wyam input directory general instructions add NetlifyCMS site https www netlifycms org docs add-to-your-site cover several static site generators Wyam PR add table App File Structure Assuming using default Wyam input directory name structure setup add folder called admin under Wyam input directory add files index html config yml index html add following note added Netlify Identity script using Netlify instructions point use Netlify Script Injection https www netlify com docs inject-analytics-snippets feature achieve same second file admin config yml heart Netlify CMS installation bit more complex explained full add NetlifyCMS site https www netlifycms org docs add-to-your-site configuration options https www netlifycms org docs configuration-options documentation added working version below ### Example NetlifyCMS config file backend name git-gateway branch master Branch update optional defaults master media folder input assets Images Media files stored repo under input assets Images public folder assets Images public folder indicates found published site path used image src attributes relative file called https www netlifycms org docs add-to-your-site collections name blog Used routes admin collections blog label Blog Used UI folder input posts path folder documents stored create true Allow users create new documents collection slug year month day slug Filename template YYYY-MM-DD-title md fields fields each document usually front matter label Title name Title widget string label Lead name Lead widget string optional true required false label Published name Published widget datetime label Featured Image name Image widget image optional true required false pattern Please rename image remove spaces filename label Tags name Tags widget list label Body name body widget markdown row col-xs- col-sm- couple things note here using git-gateway backend don intend having additional editors blog connect directly GitHub described authentication backends https www netlifycms org docs authentication-backends Using Authentication Provider https www netlify com docs authentication-providers #using-an-authentication-provider looks more work less functionality Tags field CMS display simple textbox add tags comma separated list tried list add item each tag wanted add hit JavaScript errors prevented typing more character per tag Featured Image media upload screen happily accept filename spaces markdown html fail render doesn escaped field validation added pattern Please rename image remove spaces filename very user friendly better image working col-xs- col-sm- assets Images NetlifyCMS Validation PNG img-responsive img-fluid ## Setup blog Netlify Wyam website already guide setting up site Netlify https wyam io docs deployment netlify started drag drop site described Part setup continuous deployment GitHub ### Enable Netlify Identity config states setup backend name git-gateway using Netlify Identity assets Images Netlify Identity Enable PNG img-responsive img-fluid ### Set registration preference external providers Registration settings External providers settings under Identity assets Images Netlify Site Settings PNG img-responsive img-fluid stage want access myself made invite enabled GitHub sole external provider assets Images Netlify Identity Reg pref providers PNG img-responsive img-fluid ### Enable Git Gateway Netlify row col-xs- col-sm- CMS users GitHub logins Enable Git Gateway allow save publish posts GitHub without having setup account Github required set backend git-gateway Without errors console try save media posts explained further Netlify Docs Git Gateway https www netlify com docs git-gateway Git Gateway option settings under Identity further down Registration preferences external providers settings col-xs- col-sm- assets Images Netlify Git Gateway PNG img-responsive img-fluid ### NetlifyCMS action row col-xs- col-sm- point working CMS run wyam -p -w here more information wyam command line https wyam io docs usage command-line navigate http localhost admin greeted NetlifyCMS screen col-xs- col-sm- assets Images NetlifyCMS Home PNG img-responsive img-fluid row col-xs- col-sm- Click Login Netlify login GitHub account redirected here site Netlify correct first part URL https localhost admin sure keep #access token eyj lkdAGI expires refresh token zEM BQSw token type bearer URL log local instance col-xs- col-sm- col-sm-offset- assets Images NetlifyCMS Login PNG img-responsive img-fluid Finally NetlifyCMS glory assets Images NetlifyCMS Main PNG img-responsive img-fluid Create new post publish assets Images NetlifyCMS Publish New PNG img-responsive img-fluid ## NetlifyCMS successfully publishing GitHub row col-xs- col-sm- see commit GitHub assets Images NetlifyCMS Published GitHub PNG img-responsive img-fluid col-xs- col-sm- markdown rendered GitHub assets Images NetlifyCMS Published GitHub Details PNG img-responsive img-fluid well good done VS Code similar Parts describe configured AppVeyor Netlify support continuous deployment editorial workflow adding Netlify Identity widget blog make fully functioning CMS ## Errors issues encountered setting up ## Local Testing row col-xs- col-sm- testing site locally still use Netlify Identity need specify URL site Netlify explained full netlify identity widget docs https github com netlify netlify-identity-widget#localhost seem side effect redirecting hosted site login use external provider logging Netlify Identity account works leaves same page alternatively correct first part URL https localhost admin sure keep #access token eyj lkdAGI expires refresh token zEM BQSw token type bearer URL log local instance Sometimes needs refresh load actual CMS col-xs- col-sm- assets Images Netlify Identity Local Testing png img-responsive img-fluid ### Front Matter syntax Initially found none existing posts displaying details CMS showed up blank line assets Images NetlifyCMS Missing Posts PNG img-responsive img-fluid click blank line open blank editor window assets Images NetlifyCMS Missing Post Details PNG img-responsive img-fluid new posts created CMS display correctly difference found between existing posts those created NetlifyCMS leading --- start front matter section Once added posts displayed correctly CMS",
            description:"Configuring simple single user mode NetlifyCMS Wyam",
            tags:'Wyam'
        },
        {
            url:'/posts/Setting-up-NetlifyCMS-with-Wyam---Part-1.md',
            title:"Setting up NetlifyCMS with Wyam - Part 1",
            description:"Configuring a simple single user mode NetlifyCMS with Wyam"
        }
    );
    a(
        {
            id:21,
            title:"Setting up NetlifyCMS Wyam Part",
            content:"## Use AppVeyor CI started simple NetlifyCMS setup without editorial workflow use AppVeyor Continuous Integration https wyam io docs deployment appveyor Wyam document Enabling editorial workflow ## Turn webhook PR prevent extra build being triggered AppVeyor more details see build virtual merge Pull Requests https github com appveyor ci issues Preventing master CI run commit made feature branch http help appveyor com discussions questions -preventing-master-ci-run-when-a-commit-a-made-on-a-feature-branch assets Images NetlifyCMS Webhooks png img-responsive img-fluid done AppVeyor run master branch config draft saved NetlifyCMS PR created fail git push remote Anonymous access MarkZither ProjectName git denied fatal Authentication failed https github com MarkZither ProjectName git Command exited code ## Advanced AppVeyor config support Editorial Workflow blog post saved draft create branch starting cms use branches regular expression control different aspects build master cms branches here example action https github com NokNokMLS BigDoorWyamBlog blob master appveyor yml override settings master branch version build branches master ####################### removed brevity ####################### override settings cms branches branches cms deploy ## Errors issues hit setting up ### build phase set msbuild mode default visual studio project solution files found https help appveyor com discussions problems -the-build-phase-is-set-to-msbuild-mode-default-but-no-visual-studio-project-or-solution-files-were-found caused having version build wrong place appveyor yml ### Failed build saving post git push remote Anonymous access MarkZither ProjectName git denied fatal Authentication failed https github com MarkZither ProjectName git Command exited code caused PR firing Webhook triggers build master branch ## things write show correct logged logged out menu based Netlify Identity Widget https github com netlify netlify-identity-widget events user object populate author field Netlify Identity metadata",
            description:"Configuring simple single user mode NetlifyCMS Wyam",
            tags:'Wyam'
        },
        {
            url:'/posts/Setting-up-NetlifyCMS-with-Wyam---Part-3.md',
            title:"Setting up NetlifyCMS with Wyam - Part 3",
            description:"Configuring a simple single user mode NetlifyCMS with Wyam"
        }
    );
    a(
        {
            id:22,
            title:"Using Netlify Identity NetlifyCMS Wyam",
            content:"following setup part worth reviewing again think more external providers available ## Set registration preference external providers Registration settings External providers located settings under Identity assets Images Netlify Site Settings PNG assets Images Netlify Identity Reg pref providers PNG ### Enable Git Gateway Netlify CMS users Github logins enable Git Gateway allow save publish posts GitHub without having setup account Github explained further Netlify Docs Git Gateway https www netlify com docs git-gateway Git Gateway option settings under Identity further down Registration preferences external providers settings assets Images Netlify Git Gateway PNG ## Make easy user complete signup adding Netlify Identity Widget site row col-xs- col-sm- email inviting user use CMS links homepage invite token URL follow step user left looking homepage understanding next Add netlify-identity-widget https github com netlify netlify-identity-widget layout homepage add following body layout page Now user hits homepage #invite token URL complete signup modal appear col-xs- col-sm- assets Images Netlify Identity Complete Signup png ### Invite users best come back step setting registration preferences assets Images Netlify Identity Invite Users PNG",
            description:"test lead",
            tags:'Wyam'
        },
        {
            url:'/posts/Setting-up-NetlifyCMS-with-Wyam---Part-4.md',
            title:"Using Netlify Identity with NetlifyCMS and Wyam",
            description:"test a lead"
        }
    );
    a(
        {
            id:23,
            title:"VSTO installs over HTTPS issues",
            content:"Envrionmental Test setup exe assets testvsto setup exe ## Problem Setup runs sucessfully over http switch https publishing again https url using setup exe -url https myurl com MyAppFolder setup exe URLDownloadToCacheFile failed HRESULT Error error occurred trying download https myurl com MyAppFolder setup exe ## Examples https stackoverflow com questions download-clickonce-fails-from-setup-exe ## Solution explained technet https social technet microsoft com Forums ie en-US -c ab- ee eee group-policy-setting-blocking-downloads-from-https-even-on-trusted-sites forum ieitprocurrentver Check GPO GPO under User Configuration Policies Administrative Templates Windows Components Internet Explorer Internet Control Panel Security Pages Advanced Page save encrypted pages disk User Configuration Policies Administrative Templates Windows Components Internet Explorer Internet Control Panel Advanced Page save encrypted pages disk Group Policy Management Editor assets images GPOIE png default value configured Save Encrypted File Disc Dialog assets images DoNotSaveEncryptedFileToDiscDialog png Internet Explorer associated configuration option found Internet Options Advanced tab Save Encrypted File Disc Dialog assets images IEOptions png",
            description:'',
            tags:'VSTO'
        },
        {
            url:'/posts/VSTO-installs-over-HTTPS-issues.md',
            title:"VSTO installs over HTTPS issues",
            description:""
        }
    );
    var idx = lunr(function() {
        this.field('title');
        this.field('content');
        this.field('description');
        this.field('tags');
        this.ref('id');

        this.pipeline.remove(lunr.stopWordFilter);
        
        documents.forEach(function (doc) { this.add(doc) }, this)
    });

    return {
        search: function(q) {
            return idx.search(q).map(function(i) {
                return idMap[i.ref];
            });
        }
    };
}();
