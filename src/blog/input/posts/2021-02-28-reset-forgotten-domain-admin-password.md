---
Title: Reset Forgotten Domain Admin Password
Lead: "Having failed to press save in my password manager I soon found out I didn't know my only domain admin password"
Published: 2021-02-28T01:12:00.814Z
Date: 2021-02-28T01:12:00.814Z
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
* Using a keyboards with different layouts to type passwords

So there was no reason to find myself in this position really, but having ended up there and having found [Robs post](https://robbeekmans.net/euc/reset-your-domain-admin-password/) it looked like the solution was still quite easy, however I am running Windows Server 2019 Core, so there is not GUI and therefore no UTILMAN.exe.

## The Recovery
Boot using the installation media, choose `Repair your computer`, `Troubleshoot` and `Command Prompt`.

You will now be in the command prompt at `X:\Sources`.

To find your Windows install change directory `cd /d c:\Windows\System32`

Where Rob suggests to overwrite UTILMAN.exe with cmd.exe that is not possible in Windows Server Core, instead we can replace `LogonUI.exe`

```
copy LogonUI.exe LogonUI.exe.BAK
copy CMD.EXE LogonUI.exe
```
Answer yes when asked if you want to overwrite LogonUI.exe and then reboot normally.

```
shutdown /r /t 1
```

When it reboots you will be taken straight to `cmd.exe`, you can now set the Administrator password with the command

```
net user Administrator "new password"
```

Boot again using the installation media to change the file names back

```
copy LogonUI.exe.BAK LogonUI.exe
del LogonUI.exe.BAK
```

Reboot a final time and login with your new Administrator password

## Other options
Various blogs suggest it is possible to get to safe mode using F8 or Ctrl+Shift+Alt+F8 from a cold boot.
https://www.surfacetablethelp.com/2018/01/how-to-use-f8-key-to-boot-hyper-v-vm-into-safe-mode-on-windows-10.html

I was not able to make that work reliably, in fact it worked once and caused much frustration trying to make it happen again.

I found 2 more reliable ways to get to the safe boot menu:
boot from the installation media to access to troubleshoot menu and boot to a command prompt.

At the command prompt type the following command to enable to boot menu.

```
bcdedit /set {bootmgr} displaybootmenu yes
```

The next command sets the timeout after which the boot will continue to the OS, 5 second should be plenty to press F8 without adding excessive time to the boot.

```
bcdedit /set {bootmgr} timeout 5
```

It is then possible to login with the 

Test it, shut it down, cold boot it, test it again
https://docs.microsoft.com/en-us/troubleshoot/windows-server/identity/reset-directory-services-restore-mode-admin-pwd

https://docs.microsoft.com/en-us/troubleshoot/azure/virtual-machines/cannot-connect-rdp-azure-vm#:~:text=The%20remote%20computer%20that%20you,the%20System%20Properties%20dialog%20box.