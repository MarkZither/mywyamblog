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

            app.UseHealthChecksUI(config => config.UIPath = "/hc-ui");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
```