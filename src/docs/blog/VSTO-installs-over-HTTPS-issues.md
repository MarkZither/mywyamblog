---
Title: "VSTO Installs Over HTTPS Issues"
Published: 2025-09-28
Tags: [General]
---

﻿---
Title: VSTO installs over HTTPS issues
Published: 2019-02-25
Tags:  - VSTO  - HTTPS  - GPO  - IE Security
---  # Are Envrionmental?
Test with this [setup.exe](assetstestvstosetup.exe).  ## The Problem
Setup runs sucessfully over http, but switch to https by publishing again with the https url or by using `setup.exe -url="https:/myurl.comMyAppFoldersetup.exe"`
```
URLDownloadToCacheFile failed with HRESULT '-2146697208'
Error: An error occurred trying to download 'https:/myurl.comMyAppFoldersetup.exe'.
```  ## Other Examples
https:/stackoverflow.comquestions20244507download-clickonce-fails-from-setup-exe  ## Solution  As explained on technet [https:/social.technet.microsoft.comForumsieen-US3d443283-c251-44b8-99ab-7ee33c928eeegroup-policy-setting-blocking-downloads-from-https-even-on-trusted-sites?forum=ieitprocurrentver](Check the GPO) the GPO was under:  User Configuration\Policies\Administrative Templates\Windows Components\Internet Explorer\Internet Control Panel\Security Pages\Advanced Page\Do not save encrypted pages to disk  or  User Configuration\Policies\Administrative Templates\Windows Components\Internet Explorer\Internet Control Panel\Advanced Page\Do not save encrypted pages to disk  ![Group Policy Management Editor](/img/GPOIE.png)  By default this value is not configured
![Do Not Save Encrypted File To Disc Dialog](/img/DoNotSaveEncryptedFileToDiscDialog.png)  In Internet Explorer the associated configuration option is found in Internet Options on the Advanced tab.
![Do Not Save Encrypted File To Disc Dialog](/img/IEOptions.png)  