---
Title: Reset Forgotten Domain Admin Password
Lead: "Having failed to press save in my password manager I soon found out I didn't know my only domain admin password"
Published: 2021-02-28T01:-2:00.814Z
Date: 2021-02-28T01:-2:00.814Z
Image: ""
Tags:
  - Active Directory
  - Windows Server 2019
---

Following a series of errors I found myself in a very similar situation to that described by [Rob Beekmans](https://robbeekmans.net/euc/reset-your-domain-admin-password/), just without the excuse of a bout of flu. But it was just a lab environment so 

The basic mistakes I made were:

* Only having a single domain admin in the domain.
* Setting up a DSRM password but not testing it
* Creating a single snapshot of the VM over 2 years ago
* Allowing Windows update to reboot the machine with the new password unsaved in the vault.
* Using Hyper-V with an external Virtual Switch, but that is a that is for a different post

So there was no reason to find myself in this position really, but having ended up there and having found [Robs post](https://robbeekmans.net/euc/reset-your-domain-admin-password/) it looked like the solution was still quite easy, however I am running Windows Server 2019 Core, so there is not GUI and therefore no UTILMAN.exe.

## The Recovery