---
title: "Untitled"
authors: ["mark-burton"]
date: "2023-12-22"
---

For years I have felt that if you are offering a public API it should be documented well enough for consumers to generate a client library in whatever language they are using, it is almost implausible to create client libraries in all languages your consumers might use, but a good OpenAPI definition allows consumers to understand an API and use tools to generate client libraries.  Over the years I have worked with NSwag, which was good but put all the code in 1 file which I didn't like. AutoRest, which seemed to get more difficult to work with when V3 was released, so I looked around again and found OpenAPI Generator, which is great but needs Java. With the release of Kiota I was excited to look at how a dotnet tool could tackle the same requirement.  ## What is Kiota?  Kiota is a client generator for OpenAPI and was introduced at .NET Conf 2023.

&lt;iframe width="560" height="315" src="https:/www.youtube.comembedsQ9Pv-rQ1s8?si=4wl3jIZWa3VY9sWF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen&gt;<iframe />  ## Quickstart Kiota Project  [Learn](https:/learn.microsoft.comen-usopenapikiotaquickstartsdotnet)