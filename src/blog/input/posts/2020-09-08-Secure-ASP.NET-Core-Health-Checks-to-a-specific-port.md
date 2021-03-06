---
Title: Secure ASP.NET Core Health Checks to a specific port
Lead: Health Checks in ASP.NET Core can give valuable insights into the health
  of services, but that includes sensitive data that should not be leaked
  externally.
Published: 2020-09-08T10:24:26.968Z
Image: /assets/Images/hc_sample.png
Tags:
  - ASP.NET Core
  - Health Checks
---
To secure Health Checks it is possible to make them available on internal addresses only and on a different port to the publicly served pages/API endpoints.

First we need to make the service available over 2 different ports, this can be achieved by adding a Urls value to the appsettings.config.

```json
  "Logging": {
    "IncludeScopes": false,
    "LogLevel": {
      "Default": "Debug",
      "System": "Information",
      "Microsoft": "Information"
    }
  },
  "Urls": "http://localhost:1114;http://localhost:1115",
  "ManagementPort": "1115",
  "ConnectionStrings": {
    "LoginServiceDb": "Data Source=.,11433;Initial Catalog=LoginServiceDatabase;Integrated Security=true;"
  },
```

This can be done in several ways, and is described in more detail by Andrew Lock in his post [5 ways to set the URLs for an ASP.NET Core app](https://andrewlock.net/5-ways-to-set-the-urls-for-an-aspnetcore-app/).

Now when you debug the service you should see in the log that it is listening on 2 ports

```
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: http://localhost:1114
info: Microsoft.Hosting.Lifetime[0]
      Now listening on: http://localhost:1115
info: Microsoft.Hosting.Lifetime[0]
      Application started. Press Ctrl+C to shut down.
```

<div class="alert alert-primary">
<h3>Special note if you are using http.sys </h3>
<p>
If you want to run this over https you will need to take care of the port reservation and certification binding. 
</p>
<p>
I have a explanation of that in the <a href="https://github.com/MarkZither/SwaggerAndHealthCheckBlog#using-httpsys" target="_blank">GitHub Repo README</a>.
</p>
</div>

Now that we have the service listening on 2 addresses we can specify one of them will serve up the Health Checks by setting the `ManagementPort`.

In `startup.cs` we can use the `ManagementPort` to secure the Health Check endpoint

```C#
   // HealthCheck middleware
   app.UseHealthChecks("/hc", $"{Configuration["ManagementPort"]}", new HealthCheckOptions() {
    Predicate = _ => true,
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
   });

   app.UseEndpoints(endpoints => {
    endpoints.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");
    endpoints.MapHealthChecks("/health").RequireHost($"*:{Configuration["ManagementPort"]}");
   });
```

If you debug now you will have access to the `/health` endpoint only on the `ManagementPort` and not on the public facing URL.

![HealthCheck external shows 404 while internal shows overall health status](/assets/Images/health_endpoint.png){.img-fluid .img-responsive}

More interestingly you can also go to the `/hc` endpoint, this contains more detailed information about the state of the service and therefore needs to be secured.

![HealthCheck external shows 404 while internal shows detailed health status](/assets/Images/hc_endpoint.png){.img-fluid .img-responsive}

Now you can safely get the status of your services reported as json, but there are 2 further aspects of ASP.NET Core Health Checks, the UI and push-based monitoring, i will cover those in parts 2 and 3.