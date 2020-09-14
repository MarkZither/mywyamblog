---
Title: How to Setup ASP.NET Core Health Check UI
Lead: ""
Published: 2020-09-10T10:31:00.814Z
Image: ""
Tags:
  - ASP.NET Core
  - Health Checks
---
In [Part one](2020-09-08-secure-asp.net-core-health-checks-to-a-specific-port) we setup the health check endpoints, now to add a frontend.

The [Health Checks UI](2020-09-08-secure-asp.net-core-health-checks-to-a-specific-port) is best hosted in its own service as it can consolidate health checks for a number of services.

![Swagger CORS error](/assets/Images/HealthChecksUI.png){.img-fluid .img-responsive}

``` xml
    <PackageReference Include="AspNetCore.HealthChecks.UI" Version="$(AspNetCoreHealthChecksUIVersion)" />
    <PackageReference Include="AspNetCore.HealthChecks.UI.InMemory.Storage" Version="$(AspNetCoreHealthChecksUIVersion)" />
```

``` xml
<AspNetCoreHealthChecksUIVersion>3.1.1</AspNetCoreHealthChecksUIVersion>
```


``` c#
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddHealthChecksUI()
                .AddInMemoryStorage();
            services.AddControllers();
        }
```

``` c#
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseHealthChecksUI() ;

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHealthChecksUI(config => {
                    config.UIPath = "/hc-ui";
                }).RequireHost($"*:{Configuration["ManagementPort"]}");
            });
        }
```

``` json
...
  "https_port": 1131,
  "Urls": "http://localhost:1130;https://localhost:1131;https://localhost:1132",
  "ManagementPort": "1132",
  "AllowedHosts": "*",
  "HealthChecks-UI": {
    "HealthChecks": [
      {
        "Name": "LoginService Check",
        "Uri": "https://localhost:1116/hc"
      },
      {
        "Name": "ResourceService Check",
        "Uri": "https://localhost:5002/hc"
      },
      {
        "Name": "NotificationService Check",
        "Uri": "https://localhost:1179/hc"
      }
    ]
  }
...
```