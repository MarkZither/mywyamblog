---
title: "How To Create a Custom UserStore in ASP.NET Core 6"
authors: ["mark-burton"]
tags: ["ASP.NET CORE", "Identity", "Recipes"]
description: "UserStore with complex IdentityServer and AzMan permissions"
date: "2021-12-20"
---

# Customer UserStore  ``` csharp
builder.Services.AddDbContext<ApplicationDbContext />(options =>  options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));  builder.Services.AddIdentity&lt;ApplicationUser, IdentityRole>()  .AddEntityFrameworkStores<ApplicationDbContext />()  .AddDefaultTokenProviders();  builder.Services.AddTransient&lt;IUserStore<ApplicationUser />, DirectUserStore<ApplicationUser />&gt;();
```  https:/docs.microsoft.comen-usaspnetcoresecurityauthenticationidentity-custom-storage-providers?view=aspnetcore-6.0  https:/github.comdotnetAspNetCore.Docstreemainaspnetcoresecurityauthenticationidentity-custom-storage-providerssampleCustomIdentityProviderSample  