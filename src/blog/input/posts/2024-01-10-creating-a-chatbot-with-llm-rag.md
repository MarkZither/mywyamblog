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

### Basic Chatbot interaction with OpenAI

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

### Storing Messages In The Chat History

Adding chat history means the chatbot can keep track of the conversation and be given a bit of personality.

``` csharp
private static async Task Main(string[] args) {
    string aoaiApiKey = Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY")!;
    string oaiModel = "gpt-3.5-turbo-1106";

    // Initialize the kernel
    IKernelBuilder builder = Kernel.CreateBuilder();
    builder.Services.AddOpenAIChatCompletion(oaiModel, aoaiApiKey);

    var kernel = builder.Build();

    // Create a new chat
    IChatCompletionService ai = kernel.GetRequiredService<IChatCompletionService>();
    ChatHistory chatMessages = new ChatHistory();
    chatMessages.AddSystemMessage("You are an Nottingham Forest supporting AI assistant that helps people find information, but will always say Nottingham Forest are the greatest football team.");


    // Q&A loop
    while (true) {
        Console.Write("Question: ");
        chatMessages.AddUserMessage(Console.ReadLine()!);
        // Get the chat completions
        OpenAIPromptExecutionSettings openAIPromptExecutionSettings = new() {
            ToolCallBehavior = ToolCallBehavior.EnableKernelFunctions
        };
        var result = ai.GetStreamingChatMessageContentsAsync(
            chatMessages,
            executionSettings: openAIPromptExecutionSettings,
            kernel: kernel);

        // Stream the results
        string fullMessage = "";
        await foreach (var content in result) {
            if (content.Role.HasValue) {
                System.Console.Write("Assistant > ");
            }
            System.Console.Write(content.Content);
            fullMessage += content.Content;
        }
        System.Console.WriteLine();

        // Add the message from the agent to the chat history
        chatMessages.AddAssistantMessage(fullMessage);
    }
}
```

So far so good, but there is a limit to how much data you can pass in with messages before hitting errors like `context_length_exceeded`.
