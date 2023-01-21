---
Title: Signing Git Commits in VS Code and Visual Studio
Lead: "I have recently read a number of PenTest reports and investigated and fixed the vulnerabilities."
Published: 2023-01-17T15:23:12.976Z
Date: 2023-01-17T15:23:12.976Z
Image: "/assets/Images/VSCode_Sign_Commit.png"
Tags:
  - VS Code
  - Visual Studio
  - Git
  - gpg
---

# Understanding Penetration Test Reports as a developer

## Install GnuPG
`choco install gnupg` or https://gpg4win.org/get-gpg4win.html 

## Final git config

``` powershell

PS C:\Source\GitRepos\mywyamblog> git config --global -l
...snip...
user.signingkey=N07AR33A1S1GN1NGK3Y!
gpg.program=c:/Program Files (x86)/GnuPG/bin/gpg.exe
commit.gpgsign=true
...snip...

```
