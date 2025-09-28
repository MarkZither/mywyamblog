---
title: "Signing Git Commits in VS Code and Visual Studio"
authors: ["mark-burton"]
tags: ["VS Code", "Visual Studio", "Git", "gpg"]
description: "I have recently read a number of PenTest reports and investigated and fixed the vulnerabilities."
date: "2023-01-20"
---

# Singing git commits in VS Code and Visual Studio  ## Install GnuPG  `choco install gnupg` or https:/gpg4win.orgget-gpg4win.html  ## Generate a new key  In PowerShell run  ``` powershell
gpg --full-generate-key
```  You will be asked 3 questions, the first is the kind of key, based on [the GitHub docs](https:/docs.github.comenauthenticationmanaging-commit-signature-verificationgenerating-a-new-gpg-key) choose option 1, RSA.  ``` powershell
gpg (GnuPG) 2.4.0; Copyright (C) 2021 g10 Code GmbH
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.  Please select what kind of key you want:  (1) RSA and RSA  (2) DSA and Elgamal  (3) DSA (sign only)  (4) RSA (sign only)  (9) ECC (sign and encrypt) *default*  (10) ECC (sign only)  (14) Existing key from card
Your selection?
```  Again following [the GitHub docs](https:/docs.github.comenauthenticationmanaging-commit-signature-verificationgenerating-a-new-gpg-key) the key must be at least 4,096 bits long, so the maximum you can choose.  ``` powershell  RSA keys may be between 1024 and 4096 bits long.
What keysize do you want? (3072) 4096
Requested keysize is 4096 bits  ```  Next, choose how long the key should be valid for, again following [the GitHub docs](https:/docs.github.comenauthenticationmanaging-commit-signature-verificationgenerating-a-new-gpg-key) choose the default, which is no expiration  ``` powershell
Please specify how long the key should be valid.  0 = key does not expire  &lt;n&gt;  = key expires in n days  &lt;n&gt;w = key expires in n weeks  &lt;n>m = key expires in n months  &lt;n&gt;y = key expires in n years
Key is valid for? (0)
```  Finally, add your user identity, it is important that the email address matches the git repo email.  ``` powershell  We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
gpg: directory 'C:\\Users\\xxxxx\\AppData\\Roaming\\gnupg\\openpgp-revocs.d' created
gpg: revocation certificate stored as 'C:\\Users\\xxxxxx\\AppData\\Roaming\\gnupg\\openpgp-revocs.d\\36E97B0FB71E5EEEC2244F4AFDE4A9B5B04820D7.rev'
public and secret key created and signed.  pub  rsa4096 2023-01-29 [SC]  36E97B0FB71E5EEEC2244F4AFDE4A9B5B04820D7
uid  markb <mark@example.com />
sub  rsa4096 2023-01-29 [E]  ```  ## Final git config  ``` powershell  PS C:\Source\GitRepos\mywyamblog&gt; git config --global -l
...snip...
user.signingkey=N07AR33A1S1GN1NGK3Y!
gpg.program=c:Program Files (x86)GnuPGbingpg.exe
commit.gpgsign=true
...snip...  ```  ## Usage in VS Code  Continue to use VS Code normally, when you do a commit you will be prompted for the passphrase for the gpg key.  ![gpg prompt in VS Code](/img/VSCode_Sign_Commit.png)  ## How often to sign the commits?  Signing every commit can be tedious, the default cache time is 1800 seconds (30 minutes) as per the [Agent Options documentation](https:/www.gnupg.orgdocumentationmanualsgnupgAgent-Options.html).  Although this is not the same answer as running `gpgconf.exe --list-options gpg-agent` which returns 600 seconds and is backed up by a local test.  ``` cmd  PS C:\Users\mburton\.gnupg> gpgconf.exe --list-options gpg-agent
...
default-cache-ttl:24:0:expire cached PINs after N seconds:3:3:N:600::
max-cache-ttl:24:2:set maximum PIN cache lifetime to N seconds:3:3:N:7200::
max-cache-ttl-ssh:24:2:set maximum SSH key lifetime to N seconds:3:3:N:7200::
ignore-cache-for-signing:8:0:do not use the PIN cache when signing:0:0::::
...  ```  The options to change the cache are discussed in this [Super User](https:/superuser.comquestions624343keep-gnupg-credentials-cached-for-entire-user-session) question. Extending the `default-cache-ttl` and `max-cache-ttl` will mean entering the signing key phrase less often.  https:/superuser.comquestions1068980where-is-my-gpgconf-file-on-windows  2 gpg installations because git comes with its own.  14400 is a compromise at 4 hours.