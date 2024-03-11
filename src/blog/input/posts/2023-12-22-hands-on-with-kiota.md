---
 Title: Hands on with Kiota
 Lead: "Kiota is a new tool released with .net 8 to generate API Client libraries from an OpenAPI definition." 
 Published: 2025-12-22T15:23:12.976Z 
 Date: 2023-12-22T15:23:12.976Z 
 Image: "/assets/Images/snort.png" 
 Tags: 
   - Kiota 
   - Swagger
   - OpenAPI
---

For years I have felt that if you are offering a public API it should be documented well enough for consumers to generate a client library in whatever language they are using, it is almost implausible to create client libraries in all languages your consumers might use, but a good OpenAPI definition allows consumers to understand an API and use tools to generate client libraries.

Over the years I have worked with NSwag, which was good but put all the code in 1 file which I didn't like. AutoRest, which seemed to get more difficult to work with when V3 was released, so I looked around again and found OpenAPI Generator, which is great but needs Java. With the release of Kiota I was excited to look at how a dotnet tool could tackle the same requirement.

## What is Kiota?

Kiota is a client generator for OpenAPI and was introduced at .NET Conf 2023.

<iframe width="560" height="315" src="https://www.youtube.com/embed/sQ9Pv-rQ1s8?si=4wl3jIZWa3VY9sWF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Quickstart Kiota Project 

[Learn](https://learn.microsoft.com/en-us/openapi/kiota/quickstarts/dotnet)