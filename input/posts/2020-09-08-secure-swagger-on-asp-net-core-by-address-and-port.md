---
Title: Secure Swagger on ASP.NET Core by address and port
Published: 2020-09-08T14:46:15.750Z
Tags:
  - ASP.NET Core
  - Swagger
  - Swashbuckle
---
Swagger provides a powerful tool to test your APIs and allow consumers to learn how to consume your APIs, but it can also open up security issues and make it easier for attackers to access your data.

Best practice is to [secure access to your Swagger pages using OAuth as described by Scott Brady](https://www.scottbrady91.com/Identity-Server/ASPNET-Core-Swagger-UI-Authorization-using-IdentityServer4) but in some scenarios it would be better if the Swagger pages are not be accessible externally at all.

As discussed in this [GitHub issue, it is not possible out of the box to limit access to a specific URL](https://github.com/domaindrivendev/Swashbuckle/issues/384). 

By changing the SwaggerEndpoint to specify absolute URL it is possible to prevent access to the documentation on the public facing URL.

```C#
   app.UseSwaggerUI(c => {
      c.SwaggerEndpoint("http://localhost:1115/swagger/v1/swagger.json", "Login Service API V1");
      c.RoutePrefix = string.Empty;
   });
```

However this still leaves some of the Swagger pages accessible displaying an error message due to CORS issues.

![Swagger CORS error](/assets/Images/swagger_internal_only_error.png){.img-fluid .img-responsive}