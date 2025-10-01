---
title: "How To Create a Custom UserStore in ASP.NET Core 6"
authors: ["mark-burton"]
tags: ["ASP.NET CORE", "Identity", "Recipes"]
description: "UserStore with complex IdentityServer and AzMan permissions"
date: "2021-12-20"
---

# Customer UserStore

```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
  options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
  .AddEntityFrameworkStores<ApplicationDbContext>()
  .AddDefaultTokenProviders();

builder.Services.AddTransient<IUserStore<ApplicationUser>, DirectUserStore<ApplicationUser>>();
```

https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity-custom-storage-providers?view=aspnetcore-6.0

https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/authentication/identity-custom-storage-providers/sample/CustomIdentityProviderSample