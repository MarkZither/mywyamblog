---
Title: Using Netlify Identity with NetlifyCMS and Wyam
Published: 2018-03-09
Lead: test a lead
Tags: 
  - Wyam
  - AppVeyor
  - NetlifyCMS
  - Netlify
---

## Make it easy for user to complete signup by adding Netlify Identity Widget to the site
::::::row
:::{.col-xs-12 .col-sm-8}
The email inviting a user to use the CMS links to the homepage with a invite token in the URL, if you do not follow this step the user will be left looking at the homepage not understanding why they are there or what they should do next.

Add the [netlify-identity-widget](https://github.com/netlify/netlify-identity-widget)
to your layout/homepage, you can just add the following to the body of your layout page
```
<script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
```
Now when the user hits the homepage with the `/#invite_token=` in the URL the complete signup modal will appear.
:::
:::{.col-xs-12 .col-sm-4}
![](../assets/Images/Netlify_Identity_Complete_Signup.png)
:::
::::::