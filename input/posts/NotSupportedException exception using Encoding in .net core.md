---
Title: Resolving System.NotSupportedException No data is available for encoding 850 in .net Core
Published: 2017-12-12
Tags: 
  - .NET Core
  - Encoding
  - EPPlus
  - NOPI
  - SharpZip
---

# Character Encoding in .NET Core
            //https://stackoverflow.com/questions/33579661/encoding-getencoding-cant-work-in-uwp-app
            //encodings in .NET core

            Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);
https://msdn.microsoft.com/en-us/library/system.text.encodingprovider(v=vs.110).aspx
            ```
            Message: System.NotSupportedException : No data is available for encoding 850. For information on defining a custom encoding, see the documentation for the Encoding.RegisterProvider method.
            ```

            ```Encoding.RegisterProvider(CodePagesEncodingProvider.Instance);