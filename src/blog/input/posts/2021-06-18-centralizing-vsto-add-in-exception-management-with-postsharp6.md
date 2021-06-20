---
Title: Centralizing VSTO add in exception management with postsharp 6
Lead: "After much reading it seems you cannot handle exceptions globally in an Office add-in"
Published: 2021-06-22T15:23:12.976Z
Date: 2021-06-18T15:23:12.976Z
Image: ""
Tags:
  - PostSharp
  - VSTO
---

After much reading around trying to find the best way to implement a global exception handler for a VSTO add-in on [social msdn](https://social.msdn.microsoft.com/Forums/vstudio/en-US/c37599d9-21e8-4c32-b00e-926f97c8f639/global-exception-handler-for-vs-2008-excel-addin?forum=vsto), [stackoverflow](
https://stackoverflow.com/questions/12115030/catch-c-sharp-wpf-unhandled-exception-in-word-add-in-before-microsoft-displays-e) and the [Add-in Express forum](https://www.add-in-express.com/forum/read.php?FID=5&TID=12667) I came across this solution [using postsharp](https://exceptionalcode.wordpress.com/2010/02/17/centralizing-vsto-add-in-exception-management-with-postsharp/), this was the best solution I found but was 11 years old and relevant to postsharp 2, the library has changed a lot since then and the `PostSharp.Laos` namespace no longer exists as explained the [postsharp support forum](https://support.postsharp.net/request/21870-postshaplaos-in-version-41).

## The Solution in postsharp 6
