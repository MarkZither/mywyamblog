---
Title: How To Create a Custom UserStore in ASP.NET Core 6
Lead: "UserStore with complex IdentityServer and AzMan permissions"
Published: 2021-12-20T15:23:12.976Z
Date: 2021-12-20T15:23:12.976Z
Image: "/assets/Images/PizzaInOoniKoda12.png"
Tags:
  - ASP.NET CORE
  - Identity
  - Recipes 
---

# Customer UserStore 

``` c#
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddTransient<IUserStore<ApplicationUser>, DirectUserStore<ApplicationUser>>();
```

https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity-custom-storage-providers?view=aspnetcore-6.0

https://github.com/dotnet/AspNetCore.Docs/tree/main/aspnetcore/security/authentication/identity-custom-storage-providers/sample/CustomIdentityProviderSample

