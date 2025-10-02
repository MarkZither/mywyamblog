---
title: "How to fork a cloned repository in Visual Studio"
authors: ["mark-burton"]
date: "2018-01-27"
tags: ["GitHub"]
---
# How to fork a cloned repository in Visual Studio
based on these gists
https:/gist.github.comjpiersonb6c0815e9dd7078f6b8cc3cb9076ddf4
https:/gist.github.comElectricRCAircraftGuy8ca9c04924ac11a50d48c2061d28b090  fork the repository in github  go to team explorer repository settings
![Repository Settings](/img/GitHub fork%20Repository%20Settings.png)
rename local origin to upstream (and update push address to the new repo, or you will always have items waiting to be pushed)  ![Rename remote to upstream](/img/GitHub fork%20Repository%20Rename%20to%20Upstream.png)
add new remote called origin
![Repository Settings](/img/GitHub fork%20Repository%20Settings.png)
commit any changes  fetch from new origin - won't work if there are conflicting changes, pull and merge worked  update push remote to use origin rather than upstream, otherwise you will still be pushing to the original repo which you likely don't have permissions on and will see something like
```
Error encountered while pushing to the remote repository: Git failed with a fatal error.
unable to access 'https:/github.com...Demo.AspNetCore.PushNotifications.git': The requested URL returned error: 403
Pushing to https:/github.com...Demo.AspNetCore.PushNotifications.git
```