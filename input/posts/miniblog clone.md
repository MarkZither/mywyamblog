---
Title: First Post
Published: 2020-01-12
Tags: Introduction
---
# Welcome to a MiniBlog clone on .net core

The initial idea behind this was to learn about the differences when building a website on ASP.net CORE so that i can run on a raspberry pi, i am sure there were much easier ways to achieve that.

I choose MiniBlog[^1] as a starting point so that i did not need a database and ended up with a sqlite database for the identity tables as it seems you can no longer specify users in web.config like in previous versions of ASP.net using forms authentication.

###list of things i had to learn/work through
* strongly typed configs (yay) 
* sqlite in ef core - Julie Lerman and Geoffrey Grosenback have a nice introduction to [EF Core 1.0 on PluralSight](https://www.pluralsight.com/courses/play-by-play-ef-core-1-0-first-look-julie-lerman)[^2]
* upgrading packages can have terrible side effects (IOptions from Microsoft.Framework.OptionsModel/IOptions to Microsoft.Extensions.Options/IOptions leaving a reference to Microsoft.Framework.OptionsModel)
* metaweblog api for Open Live Writer[^3] integration now using markdown monster[^4]
* XMLRPC thanks Shawn Wildermuth [^5]

### Setting up EF CORE with SQLite
As easy as adding 
```json
...
"Microsoft.EntityFrameworkCore.SQLite": "1.0.1", 
...
```
to project.json (just be sure put add it after it dependencies or use the sort to fix things)
Update startup.cs to use sqlite rather than sqlserver
```csharp
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ...
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));
            ...
        }
```
        
### Links
[MiniBlog](http://github.com/madskristensen/miniblog/)



[An ASP.NET Core Middleware Component for Implementing MetaWeblog API ](https://github.com/shawnwildermuth/MetaWeblog/)

[^1]: Source: [MiniBlog](http://github.com/madskristensen/miniblog/)
[^2]: Source: [EF Core 1.0](https://www.pluralsight.com/courses/play-by-play-ef-core-1-0-first-look-julie-lerman)
[^3]: Source: [Open Live Writer](http://openlivewriter.org/)
[^4]: Source: [Markdown Monster Web Site](http://markdownmonster.west-wind.com)
[^5]: Source: [An ASP.NET Core Middleware Component for Implementing MetaWeblog API ](https://github.com/shawnwildermuth/MetaWeblog/)