---
 Title: Creating a chatbot with LLMs and RAG using Semantic Kernel
 Lead: "GitHub CoPilot, ChatGPT and Bing Chat are great aids for writing code but don't have the context of private code repositories or knowledge bases, I used RAG to add that context." 
 Published: 2024-01-10T15:23:12.976Z 
 Date: 2024-01-10T15:23:12.976Z 
 Image: "/assets/Images/snort.png" 
 Tags: 
   - llama.cpp 
   - Azure OpenAI
   - OpenAI
   - Semantic Kernel
---

I wanted to understand more about how ChatGPT and Co-Pilots like those from [GitHub](https://github.com/features/copilot) and [Pieces](https://pieces.app/) work and how I could do something similar including private content, whilst reading around the topic I read the article [Demystifying Retrieval Augmented Generation with .NET](https://devblogs.microsoft.com/dotnet/demystifying-retrieval-augmented-generation-with-dotnet/) and thought it described what I wanted to achieve so decided to follow along.

The first challenge I encountered was that [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/ai-services/openai-service) is only available for "eligible customers and partners" which, for my personal projects, I do not qualify. That is not a problem though as Stephan explains in the post it is trivial to switch to OpenAI which offers a free quota of $5 per month.

Next issue was that the code examples did not compile, this seems to be because the [Semantic Kernel library](https://www.nuget.org/packages/Microsoft.SemanticKernel/#versions-body-tab) has moved on from version 0.24 to 1.0.1 since the post was written. Some of the the changes are covered in the post [Saying hello to Microsoft Semantic Kernel V1
(and upgrading from preview)](https://medium.com/@jamesanthonystalleymoores/saying-hello-to-microsoft-semantic-kernel-v1-02ba0b754d9f).

The working code for the most basic chatbot using OpenAI's gpt-3.5-turbo model is below.

``` csharp

using Microsoft.SemanticKernel;

internal class Program {
    private static async Task Main(string[] args) {
        string oaiApiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY")!;
        string oaiModel = "gpt-3.5-turbo-1106";

        // Initialize the kernel
        IKernelBuilder builder = Kernel.CreateBuilder();
        builder.Services.AddOpenAIChatCompletion(oaiModel, oaiApiKey);

        var kernel = builder.Build();

        // Q&A loop
        while (true) {
            Console.Write("Question: ");
            Console.WriteLine((await kernel.InvokePromptAsync(Console.ReadLine()!)).GetValue<string>());
            Console.WriteLine();
        }
    }
}

```

