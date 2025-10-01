---
title: "Using Netlify Identity with NetlifyCMS and Wyam"
authors: ["mark-burton"]
date: "2018-03-09"
tags: ["Wyam", "AppVeyor", "NetlifyCMS", "Netlify"]
description: "test a lead"
---
The following was set up in part 1, but it is worth reviewing again. I think more external providers will be available.
## Set registration preference and external providers
Registration settings and External providers are located in settings under Identity
![](/img/Netlify_Site_Settings.PNG)  ![](/img/Netlify_Identity_Reg_pref_providers.PNG)  ### Enable Git Gateway in Netlify
Your CMS users are likely to not have Github logins, so enable the Git Gateway to allow them to save and publish posts to GitHub without having to setup an account on Github.
It is explained further in the [Netlify Docs on Git Gateway](https:/www.netlify.comdocsgit-gateway)
The Git Gateway option is in settings under Identity, further down than the Registration preferences and external providers settings.  ![](/img/Netlify_Git_Gateway.PNG)  ## Make it easy for user to complete signup by adding Netlify Identity Widget to the site
::::::row
::: The email inviting a user to use the CMS links to the homepage with a invite token in the URL, if you do not follow this step the user will be left looking at the homepage not understanding why they are there or what they should do next.  Add the [netlify-identity-widget](https:/github.comnetlifynetlify-identity-widget)
to your layouthomepage, you can just add the following to the body of your layout page
```html
<script src="https:identity.netlify.comv1netlify-identity-widget.js" /><script />
```
Now when the user hits the homepage with the `#invite_token=` in the URL the complete signup modal will appear.
:::
::: ![](/img/Netlify_Identity_Complete_Signup.PNG)
:::
::::::  ### Invite some users
Might be best to come back to this step after setting the registration preferences
![](/img/Netlify_Identity_Invite_Users.PNG)