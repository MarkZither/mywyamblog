---
 Title: Creating a chat bot with LLMs and RAG using Semantic Kernel
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
