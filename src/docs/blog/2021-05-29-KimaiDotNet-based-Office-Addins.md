---
title: "KimaiDotNet based Office Add-ins"
authors: ["mark-burton"]
tags: ["VSTO", "Kimai"]
description: "Bringing Kimai into the tools you spend your time in"
date: "2021-05-29"
---

As of v1.0.0.0 released on 09032023 the VSTO is signed with an open source code signing cert from [Certum](https:/shop.certum.euopen-source-code-signing-on-simplysign.html) this should mean the installation is automatically trusted.  If you installed a version before v1.0.0.0 you must uninstall it before installing v1.0.0.0 as the change in signing cert will prevent the upgrade working.  ~~Until I get a real certificate you will need to install [this self-signed certificate](..assetsKimaiExcelmburton_cert.cer) as a `trusted root certification authority` to be able to install the add-in.~~  [Download Excel Add-in](..assetsKimaiExcelMarkZither.KimaiDotNet.ExcelAddin.vsto)  ## Create an API password in Kimai
:::warning
WARNING!!! If you try and login with your normal password it will fail! 
:::
![Create an API Password in Kimai](/img/kimai_set_api_password.png)  ## Set the API credentials in the Excel Add-in
![Set the API credentials in the Excel Add-in](/img/set_the_api_credentials_in_the_excel_addin.png)  ## Save the API credentials to activate the sync
![Set the API credentials in the Excel Add-in](/img/kimai_first_sync.png)  ## Usage of the Add-in
For now the Add-in only supports reading existing timesheets and adding new ones, and editing of timesheets will need to be done in Kimai.  ## Questions and suggestions
The GitHub repo can be found at the
[KimaiDotNet on GitHub](https:/github.comMarkZitherKimaiDotNet).  ### Milestones
Follow the [Milestones](https:/github.comMarkZitherKimaiDotNetmilestones).  ### Issues
Create any bugs or suggestions on [GitHub Issues](https:/github.comMarkZitherKimaiDotNetissues).  ### Discussions
Start a discussion on the [GitHub Discussions](https:/github.comMarkZitherKimaiDotNetdiscussions).