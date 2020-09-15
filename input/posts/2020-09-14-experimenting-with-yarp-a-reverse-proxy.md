---
Title: "Experimenting with YARP: A Reverse Proxy"
Lead: YARP is a reverse proxy toolkit for building fast proxy servers in .NET
  using the infrastructure from ASP.NET and .NET.
Published: 2020-09-16T20:20:00.000Z
Tags:
  - ASP.NET Core
  - YARP
  - Reverse Proxy
---
A Route is the inbound URL which the reverse proxy is going to act on. The cluster is a list of potential destination URLs.

```
 "ReverseProxy": {
    "Routes": [
      {
        "RouteId": "LoginServiceRoute",
        "ClusterId": "clusterLoginService",
        "Match": {
          "Path": "/loginservice/{*remainder}"
        },
        "Transforms": [
          {
            "PathRemovePrefix": "/loginservice"
          }
        ]
      }
    ],
    "Clusters": {
      "clusterLoginService": {
        "Destinations": {
          "clusterLoginService/destination1": {
            "Address": "https://localhost:1116/"
          }
        }
      }
    }
  }
```

Take care when adding a transformation to a route, **do not** add a single transformation, it must be wrapped in [] or you will get no transformations and lots of confusion.

My mistake looked like this and took debugging into the YARP source to figure out my mistake which resulted in 503 and 404 errors due to URLs like `https://localhost:1116/loginservice/hc` instead of the correct `https://localhost:1116//loginservice/hc`.

``` json
      {
        "RouteId": "NotificationServiceRoute",
        "ClusterId": "clusterNotificationService",
        "Match": {
          "Path": "/notificationservice/{*remainder}"
        },
        "Transforms": [
          {
            "PathRemovePrefix": "/notificationservice"
          }
        ]
      },
```