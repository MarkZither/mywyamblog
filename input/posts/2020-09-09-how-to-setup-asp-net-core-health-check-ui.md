---
Title: How to Setup ASP.NET Core Health Check UI
Lead: ""
Published: 2020-09-10T10:31:00.814Z
Image: /assets/Images/healthchecksui.png
Tags:
  - ASP.NET Core
  - Health Checks
---
In [Part one](2020-09-08-secure-asp.net-core-health-checks-to-a-specific-port) we setup the health check endpoints, now to add a frontend.

The [Health Checks UI](2020-09-08-secure-asp.net-core-health-checks-to-a-specific-port) is best hosted in its own service as it can consolidate health checks for a number of services.

