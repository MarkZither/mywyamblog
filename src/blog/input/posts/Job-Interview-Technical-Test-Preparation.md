---
Title: Job Interview Technical Test Preparation
Published: 2017-11-04
Tags: 
  - ASP.NET Core
  - Custom Model Binding
  - CQRS
  - Azure Service Bus
  - AMQP
---

# ASP.NET MVC Custom Model Binding
[docs.microsoft.com](https://docs.microsoft.com/en-us/aspnet/core/mvc/advanced/custom-model-binding)

Apply to a controller action by specifying it in the signature `public IActionResult EncodedName([ModelBinder(typeof(Base64StringBinder))] string name)`.

Apply to a model using `[ModelBinder(BinderType = typeof(AuthorEntityBinder))]`

and register in startup.cs
``` csharp
public void ConfigureServices(IServiceCollection services)
       {
            services.AddMvc(options =>
            {
              //Insert at the top so this gets used before default binder
                options.ModelBinderProviders.Insert(0, new AuthorEntityBinderProvider());
            });
        }
```

using a [model binder provider](https://github.com/aspnet/Docs/tree/master/aspnetcore/mvc/advanced/custom-model-binding/sample/CustomModelBindingSample)

``` csharp
public class AuthorEntityBinderProvider : IModelBinderProvider
    {
    if (context.Metadata.ModelType == typeof(Author))
            {
                return new BinderTypeModelBinder(typeof(AuthorEntityBinder));
            }
            return null;
    }
```

## Decode base64 string
``` csharp 
string decodedJson = Encoding.UTF8.GetString(Convert.FromBase64String(value));
```
## Deserialise
[json convert](https://www.newtonsoft.com/json/help/html/T_Newtonsoft_Json_JsonConvert.htm)
``` csharp
 1 Product product = new Product();
 2
 3 product.Name = "Apple";
 4 product.ExpiryDate = new DateTime(2008, 12, 28);
 5 product.Price = 3.99M;
 6 product.Sizes = new string[] { "Small", "Medium", "Large" };
 7
 8 string output = JsonConvert.SerializeObject(product);
 9 //{
10 //  "Name": "Apple",
11 //  "ExpiryDate": "2008-12-28T00:00:00",
12 //  "Price": 3.99,
13 //  "Sizes": [
14 //    "Small",
15 //    "Medium",
16 //    "Large"
17 //  ]
18 //}
19
20 Product deserializedProduct = JsonConvert.DeserializeObject<Product>(output);
```
[without netwonsoft](https://msdn.microsoft.com/en-us/library/windows/apps/system.runtime.serialization.json.datacontractjsonserializer(v=vs.105).aspx)
``` csharp
    [DataContract]
    public class Product
    {
        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public DateTime ExpiryDate { get; set; }
    }

        public static string WriteFromObject()
        {
            Product user = new Product("Bob", DateTime.Now);
            MemoryStream ms = new MemoryStream();
            // Serializer the User object to the stream.
            DataContractJsonSerializer ser = new DataContractJsonSerializer(typeof(Product));
            ser.WriteObject(ms, product);
            byte[] json = ms.ToArray();
            ms.Close();
            return Encoding.UTF8.GetString(json, 0, json.Length);
        }


        public static User ReadToObject(string json)
        {
            Product deserializedProduct = new Product();
            MemoryStream ms = new MemoryStream(Encoding.UTF8.GetBytes(json));
            DataContractJsonSerializer ser = new DataContractJsonSerializer(deserializedUser.GetType());
            deserializedUser = ser.ReadObject(ms) as Product;
        }
            
```

##As a action filter
decorate the controller action with [DecodingFilter]
```csharp
    internal class DecodingFilterAttribute : Attribute, IActionFilter
    {
              public void OnActionExecuting(ActionExecutingContext context)
        {
            object param;
            if (context.ActionArguments.TryGetValue("name", out param))
            {
                context.ActionArguments["name"] = Encoding.UTF8.GetString(Convert.FromBase64String(param.ToString()));
            }
            else
            {
                context.ActionArguments.Add("name", "I come from action filter");
            }
        }
    }
```


#CQRS
[Martin Fowler - Command Query Responsibility Segregation](https://www.martinfowler.com/bliki/CQRS.html)


#Message queues

##AMQP
[Azure Service Bus .NET Standard client library ](https://www.nuget.org/packages/Microsoft.Azure.ServiceBus/)
[Using Service Bus from .NET with AMQP 1.0](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-amqp-dotnet)

Void - Action<string> prints = x => { Debug.WriteLine(x); }; 
Returns - Func<int, int, int> add = (x, y) => { return x + y; };