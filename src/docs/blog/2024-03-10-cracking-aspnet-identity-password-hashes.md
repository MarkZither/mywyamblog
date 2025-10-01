---
title: "Untitled"
authors: ["mark-burton"]
date: "2024-03-10"
---

I was reviewing one of my old sample projects [codebase which makes use of asp.net Identity](https://github.com/MarkZither/SwaggerAndHealthCheckBlog/blob/33d032bcc0a0fc7ee042f9059adb03088c540d99/src/LoginService/Startup.cs#L39) for storage of users and passwords, in the startup I noticed the following code:

```csharp
services.Configure<PasswordHasherOptions>(options => {
  options.CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV2;
});
```  This can be used to migrate from older versions of asp.net Identity and Identity Server using asp.net Identity to the latest version without needing to handle the migration of users passwords to the new hashing algorithm. That is good for ease of development, but should the hashes get into the wrong hands they will be easier to crack.

The PasswordHasher code can be read in the [AspNetCore GitHub repo](https://github.com/dotnet/AspNetCore/blob/main/src/Identity/Extensions.Core/src/PasswordHasher.cs).

The comments at the top of that file explain the 2 different hashing algorithms supported by the default password hasher implementation. This shows that V2 is a relatively weak hash with a small number of iterations, whereas V3 is now SHA-512 with 100,000 iterations after being SHA-256 with . This is recent update

```csharp
/*
 * =======================
 * HASHED PASSWORD FORMATS
 * =======================
 *
 * Version 2:
 * PBKDF2 with HMAC-SHA1, 128-bit salt, 256-bit subkey, 1000 iterations.
 * (See also: SDL crypto guidelines v5.1, Part III)
 * Format: { 0x00, salt, subkey }
 *
 * Version 3 (.net 7 and above):
 * PBKDF2 with HMAC-SHA512, 128-bit salt, 256-bit subkey, 100000 iterations.
 * Format: { 0x01, prf (UInt32), iter count (UInt32), salt length (UInt32), salt, subkey }
 * (All UInt32s are stored big-endian.)
 *
 * Version 3 (.net 6 and below):
 * PBKDF2 with HMAC-SHA256, 128-bit salt, 256-bit subkey, 10000 iterations.
 * Format: { 0x01, prf (UInt32), iter count (UInt32), salt length (UInt32), salt, subkey }
 * (All UInt32s are stored big-endian.)
 */
```  In 2014 Brock Allen wrote the post [How MembershipReboot stores passwords properly](https:/brockallen.com20140209how-membershipreboot-stores-passwords-properly) where it was written;  > This means in 2012 we should have been using 64000 iterations and in 2014 we should be using 128000 iterations. As previously mentioned, this is hardware dependent and the real target is 500 to 1000 milliseconds.  The code in the MembershipReboot repo suggests that did not remain correct and in 2018 the default was set to 50,000.  In 2017 NIST published the following guidance [800-63B
Digital Identity Guidelines - Authentication and Lifecycle Management](https:/pages.nist.gov800-63-3sp800-63b.html)  > The salt SHALL be at least 32 bits in length and be chosen arbitrarily so as to minimize salt value collisions among stored hashes. Both the salt value and the resulting hash SHALL be stored for each subscriber using a memorized secret authenticator.  > For PBKDF2, the cost factor is an iteration count: the more times the PBKDF2 function is iterated, the longer it takes to compute the password hash. Therefore, the iteration count SHOULD be as large as verification server performance will allow, typically at least 10,000 iterations.  With that, lets try and crack these password hashes, we have a salted hash, so how easy can it be to crack such a password?  ## Converting the hash into hashcat format  There are many tools in various languages to convert the base64 encoded password hash into a format hashcat can crack.  Based on 2 different GitHub repos I created Replits to cover the V2 and V3 asp.net Identity hashing algorithms.  ### Replit base64 encoded V2 hash to hashcat format
[Replit aspnet Identity V2 to Hashcat](https:/replit.com@markburton2aspnetIdentityV2ToHashcat#main.py)  `python main.py -i base64hash -o out`  `AAR65WvZryqTHSnKGfH+D6aInhFCZfk2khdye+6PMdRiVeG2Ai9eBtErYndhtu6Iw==`  `sha1:1000:BHrla9mvKpMdKcr8Z8f4Pg==:miJ4RQmX5NpIXcnvujzHUYlXhtgIvXgbRK2J3YbbuiM=`  `12000 PBKDF2-HMAC-SHA1`  ### Replit base64 encoded V3 hash to hashcat format
https:/replit.com@markburton2aspnetIdentityToHashcat#main.cs  `sha256:10000:bvHHyyaHNxgVoCE9JGPWuA==:MXwKKigb+FjP+EfmdErxcbcbjJH4AUtvKdTEM71dDnk=`  ``` csharp  ```  https:/github.comNetDevPackNetDevPackblobmastersrcNetDevPackUtilitiesAspNetIdentityHashInfo.cs
``` csharp  ```  https:/hashcat.netwikidoku.php?id=example_hashes  `10900	PBKDF2-HMAC-SHA256	sha256:1000:MTc3MTA0MTQwMjQxNzY=:PYjCU215Mi57AYPKva9j7mvF4Rc5bCnt`  `12100	PBKDF2-HMAC-SHA512	sha512:1000:ODQyMDEwNjQyODY=:MKaHNWXUsuJB3IEwBHbm3w==`  ## Dotnet Global tool  I wanted to be able to look at my databases and check what the hashes were so I created a dotnet tool with the knowledge gained from the previous libraries. [](https:/www.nuget.orgpackagesNallixion.ASPNET.Identity.HashDecoder)  ``` powershell
dotnet tool install --global Nallixion.ASPNET.Identity.HashDecoder --version 0.0.1-alpha.1
```  ## Hashing rate on a VM on my laptop  This is far from what a machine with a GPU could achieve.