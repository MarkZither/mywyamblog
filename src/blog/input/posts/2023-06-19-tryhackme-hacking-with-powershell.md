---
Title: Try Hack Me - Hacking with PowerShell
Lead: "Learn the basics of PowerShell and PowerShell Scripting"
Published: 2023-06-19T15:23:12.976Z
Date: 2023-06-19T15:23:12.976Z
Image: "/assets/Images/snort.png"
Tags:
  - tryhackme
  - powershell
---

## Hacking with PowerShell

This is a Try Hack Me premium room so to access it you will need a subscription, if you don't have one go get one with my [Referral Link](https://tryhackme.com/signup?referrer=638ca30a6675850049e4858e)

### Task 1 -  Objectives

Start the machine, that's it.

### Task 2 - What is Powershell?

[PowerShell verbs](https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/approved-verbs-for-windows-powershell-commands?view=powershell-7)


#### Question 1

What is the command to get a new object?

##### Notes

This confused me because the command is not a real command, just an example of how command naming works in PowerShell.

Running the command in PowerShell results in

``` powershell
PS C:\Users\mburton> ???-???
???-???: The term '???-???' is not recognized as a name of a cmdlet, function, script file, or executable program.
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.
```

#### Answer
> Get-New {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}


### Task 3 - Basic Powershell Commands

[PowerShell verbs](https://docs.microsoft.com/en-us/powershell/scripting/developer/cmdlet/approved-verbs-for-windows-powershell-commands?view=powershell-7)


#### Question 1

What is the location of the file "interesting-file.txt"

##### Notes

The Microsoft Scripting Blog has lots of useful articles on working with PowerShell to answer this question you can read "[Use Windows PowerShell to search for files](https://devblogs.microsoft.com/scripting/use-windows-powershell-to-search-for-files/)".

``` powershell
Get-Childitem –Path C:\ -Include interesting-file.txt -Recurse -ErrorAction SilentlyContinue

    Directory: C:\??????? ?????


Mode                LastWriteTime         Length Name
----                -------------         ------ ----
-a----        10/3/2019  11:38 PM             23 interesting-file.txt
```

#### Answer
> C:\Program Files {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 2

Specify the contents of this file

##### Notes

``` powershell
Get-Content 'C:\Program Files\interesting-file.txt'
```

#### Answer
> notsointerestingcontent {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}