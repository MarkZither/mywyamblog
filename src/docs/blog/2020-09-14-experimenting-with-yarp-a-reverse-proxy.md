---
title: ""Experimenting with YARP: A Reverse Proxy""
authors: ["mark-burton"]
tags: ["ASP.NET Core", "YARP", "Reverse Proxy", "NGINX"]
description: "YARP is a reverse proxy toolkit for building fast proxy servers in .NET using the infrastructure from ASP.NET and .NET."
date: "2020-09-14"
---

A Route is the inbound URL which the reverse proxy is going to act on. The cluster is a list of potential destination URLs.  ```  "ReverseProxy": \\\{  "Routes": [  \{  "RouteId": "LoginServiceRoute",  "ClusterId": "clusterLoginService",  "Match": {  "Path": "loginservice{*remainder\\}"  },  "Transforms": [  \\{  "PathRemovePrefix": "loginservice"  \}  ]  }  ],  "Clusters": \\\{  "clusterLoginService": \{  "Destinations": {  "clusterLoginServicedestination1": {  "Address": "https:/localhost:1116"  \\}  }  }  }  }
```  This would be similar to this NGINX virtual server configuration.  ``` nginx
server \\\{  listen 80;  server_name localhost;  location /loginservice/ \{  proxy_pass  https:/localhost:1116;  \\}  }
```  Take care when adding a transformation to a route, **do not** add a single transformation, it must be wrapped in [] or you will get no transformations and lots of confusion.  My mistake looked like this  ``` json
\\\{  "RouteId": "TestServiceRoute",  "ClusterId": "clusterTestService",  "Match": \{  "Path": "testservice{*remainder\\}"  },  "Transforms":  \\{  "PathRemovePrefix": "testservice"  \}
},
```  It took debugging into the YARP source to figure out my mistake which resulted in 503 and 404 errors due to URLs like `https:/localhost:1116loginservicehc` instead of the correct `https:/localhost:1116hc`.  ``` json
\\\{  "RouteId": "TestServiceRoute",  "ClusterId": "clusterTestService",  "Match": \{  "Path": "testservice{*remainder\\}"  },  "Transforms":  [ // <-- was missing  \\{  "PathRemovePrefix": "testservice"  \}  ] // <-- was missing
},
```  It is easier to see the issue as soon as you start adding additional transformations. In preview 5 for example it is possible to transform route values to querystring parameters, now it is clear that `Transformations` must be an array.  ``` json  \\\{  "RouteId": "TestPatternServiceRoute",  "ClusterId": "clusterTestService",  "Match": \{  "Path": "testpatternservice{*remainder\\}"  },  "Transforms": [  \\{  "PathPattern": "search"  \},  \\{  "QueryRouteParameter": "q",  "Append": "remainder"  \}  ]  },
```