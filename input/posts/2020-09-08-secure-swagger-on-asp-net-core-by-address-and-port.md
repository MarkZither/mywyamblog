---
Title: Secure Swagger on ASP.NET Core by address and port
Lead: ""
Published: 2020-09-08T14:46:15.750Z
Image: /assets/Images/swagger.png
Tags:
  - ASP.NET Core
  - Swagger
  - Swashbuckle
---
This follows on from my previous post [Secure ASP.NET Core Health Checks to a specific port](2020-09-08-secure-asp.net-core-health-checks-to-a-specific-port) and assumes that you already have your service running over 2 port and have specified a `ManagementPort` in the appsettings.json file.

Swagger is a powerful tool to test your APIs and allow users to easily discover how to consume your APIs, but it can also open up security issues and make it easier for attackers to access your data.

Best practice is to [secure access to your Swagger pages using OAuth as described by Scott Brady](https://www.scottbrady91.com/Identity-Server/ASPNET-Core-Swagger-UI-Authorization-using-IdentityServer4) but in some scenarios it would be better if the Swagger pages are not be accessible externally at all.

As discussed in this [GitHub issue, it is not possible out of the box to limit access to a specific URL](https://github.com/domaindrivendev/Swashbuckle/issues/384). 

By changing the SwaggerEndpoint to specify absolute URL it is possible to prevent access to the documentation on the public facing URL.

```C#
   app.UseSwaggerUI(c => {
      c.SwaggerEndpoint("http://localhost:1115/swagger/v1/swagger.json", "Login Service API V1");
      c.RoutePrefix = string.Empty;
   });
```

However this still leaves the Swagger homepage accessible displaying an error message due to CORS issues.

![Swagger CORS error](/assets/Images/swagger_internal_only_error.png){.img-fluid .img-responsive}

To reject all requests to Swagger that are not on an internal address we need to create a middleware, [something like this suggestion by Thwaitesy](https://github.com/domaindrivendev/Swashbuckle/issues/384#issuecomment-410117400)

```C#
	public class SwaggerUrlPortAuthMiddleware {
		private readonly RequestDelegate next;

		public SwaggerUrlPortAuthMiddleware(RequestDelegate next) {
			this.next = next;
		}

		public async Task InvokeAsync(HttpContext context, IConfiguration configuration) {
			//Make sure we are hitting the swagger path, and not doing it locally and are on the management port
			if (context.Request.Path.StartsWithSegments("/swagger") && !configuration.GetValue<int>("ManagementPort").Equals(context.Request.Host.Port)) {
				// Return unauthorized
				context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
			}
			else {
				await next.Invoke(context);
			}
		}

		public bool IsLocalRequest(HttpContext context) {
			//Handle running using the Microsoft.AspNetCore.TestHost and the site being run entirely locally in memory without an actual TCP/IP connection
			if (context.Connection.RemoteIpAddress == null && context.Connection.LocalIpAddress == null) {
				return true;
			}
			if (context.Connection.RemoteIpAddress.Equals(context.Connection.LocalIpAddress)) {
				return true;
			}
			if (IPAddress.IsLoopback(context.Connection.RemoteIpAddress)) {
				return true;
			}
			return false;
		}
	}
```

This middleware must be registered before swagger, so in startup.cs change `Configure` to add the middleware.

```C#
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
...
			app.UseSwaggerAuthorized();
			app.UseSwagger();
			app.UseSwaggerUI(c => {
				c.SwaggerEndpoint("v1/swagger.json", "Login Service API V1");
			});
...
}
```

Now running the service will return a 401 on the public facing URL and serve swagger internally. 

![Public facing swagger returns 401 internal works](/assets/Images/swagger_secured_by_port.png){.img-fluid .img-responsive}

It is still recommended to secure swagger with OAuth as a misconfiguration could still lead to your Swagger being exposed this way, for example behind a reverse proxy.