---
 Title: Cracking asp.net Identity Password Hashes
 Lead: "GitHub CoPilot, ChatGPT and Bing Chat are great aids for writing code but don't have the context of private code repositories or knowledge bases, I used RAG to add that context." 
 Published: 2025-03-10T15:23:12.976Z 
 Date: 2024-03-10T15:23:12.976Z 
 Image: "/assets/Images/snort.png" 
 Tags: 
   - asp.net identity
   - hashcat
---

I was reviewing, lets call it, a mature codebase which makes use of asp.net Identity for storage of users and passwords, in the startup I noticed the following code:

``` csharp
  services.Configure<PasswordHasherOptions>(options => {
      options.CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV2;
    });
```

This can be used to migrate from older versions of asp.net Identity and Identity Server using asp.net Identity to the latest version without needing to handle the migration of users passwords to the new hashing algorithm. That is good for ease of development, but should the hashes get into the wrong hands they will be easier to crack.

The

https://github.com/dotnet/AspNetCore/blob/main/src/Identity/Extensions.Core/src/PasswordHasher.cs

``` csharp
    /* =======================
     * HASHED PASSWORD FORMATS
     * =======================
     *
     * Version 2:
     * PBKDF2 with HMAC-SHA1, 128-bit salt, 256-bit subkey, 1000 iterations.
     * (See also: SDL crypto guidelines v5.1, Part III)
     * Format: { 0x00, salt, subkey }
     *
     * Version 3:
     * PBKDF2 with HMAC-SHA512, 128-bit salt, 256-bit subkey, 100000 iterations.
     * Format: { 0x01, prf (UInt32), iter count (UInt32), salt length (UInt32), salt, subkey }
     * (All UInt32s are stored big-endian.)
     */
```

## Replit base64 encoded V2 hash to hashcat format
[Replit aspnet Identity V2 to Hashcat](https://replit.com/@markburton2/aspnetIdentityV2ToHashcat#main.py)

`python main.py -i base64hash -o out`

`AAR65WvZryqTHSnK/GfH+D6aInhFCZfk2khdye+6PMdRiVeG2Ai9eBtErYndhtu6Iw==`

`sha1:1000:BHrla9mvKpMdKcr8Z8f4Pg==:miJ4RQmX5NpIXcnvujzHUYlXhtgIvXgbRK2J3YbbuiM=`

`12000 PBKDF2-HMAC-SHA1`

## Replit base64 encoded V3 hash to hashcat format
https://replit.com/@markburton2/aspnetIdentityToHashcat#main.cs



`sha256:10000:bvHHyyaHNxgVoCE9JGPWuA==:MXwKKigb+FjP+EfmdErxcbcbjJH4AUtvKdTEM71dDnk=`

``` csharp 

```

https://github.com/NetDevPack/NetDevPack/blob/master/src/NetDevPack/Utilities/AspNetIdentityHashInfo.cs
``` csharp

```

https://hashcat.net/wiki/doku.php?id=example_hashes

`10900	PBKDF2-HMAC-SHA256	sha256:1000:MTc3MTA0MTQwMjQxNzY=:PYjCU215Mi57AYPKva9j7mvF4Rc5bCnt`