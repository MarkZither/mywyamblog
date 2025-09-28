---
title: "Validation asp.net Configuration at Startup"
authors: ["mark-burton"]
tags: ["ASP.NET Core", "Configuration Options Pattern"]
date: "2020-11-08"
---

Using the [Options pattern in ASP.NET Core] allows you to benefit from [Options validation], but this only fires the first time the configuration is accessed.  The `Options Pattern` is build on top of `Configure` and OptionsBuilder.Bind(IConfiguration config) will actually call Configure(IConfiguration config) directly, so they are also equivalent. Both methods do the same job but AddOptions came later and allows more customizations.  It would be much better to prevent a service starting if there are configuration values missing or with invalid values. Such functionality is not provided by the framework as of .net5.0, the GitHub issue [Options Validation: support eager validation] remains open.  The following method of `Options Validation` is taken from [Baget] with small modifications to allow sharing the implementation with multiple services.  You can get the full working demo from [my GitHub repo](https:/github.comMarkZitherSwaggerAndHealthCheckBlog).  [Options pattern in ASP.NET Core]:
https:/docs.microsoft.comen-usaspnetcorefundamentalsconfigurationoptions?view=aspnetcore-3.1#options-validation
[Options validation]: https:/docs.microsoft.comen-usaspnetcorefundamentalsconfigurationoptions?view=aspnetcore-3.1#options-validation
[Options Validation: support eager validation]: https:/github.comdotnetruntimeissues36391
[Baget]: https:/github.comloic-sharmaBaGet
[ConfigureOptions doesn't register validations as expected]: https:/github.comdotnetruntimeissues38491