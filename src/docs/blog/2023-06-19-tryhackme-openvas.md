---
title: "Try Hack Me, OpenVAS"
authors: ["mark-burton"]
tags: ["tryhackme", "OpenVAS"]
description: "Learn the basics of threat and vulnerability management using Open Vulnerability Assessment Scanning"
date: "2023-06-19"
---

## OpenVAS  This is a Try Hack Me premium room so to access it you will need a subscription, if you don't have one go get one with my [Referral Link](https:/tryhackme.comsignup?referrer=638ca30a6675850049e4858e)  ### Task 1 - 6 Introduction  Read tasks 1 - 6 for an introduction to OpenVAS and instructions on setting it up.  As I already have a dedicated Kali VM running I went for the Install from KaliOpenVAS repositories approach and use the [Install from KaliOpenVAS repositories](https:/www.agix.com.auinstalling-openvas-on-kali-in-2020) guide, as of June 2023 it seems to just about work, I found some extra details on [Ceos3c - Install OpenVAS on Kali Linux] (https:/www.ceos3c.comsecurityinstall-openvas-kali-linux).  Additional steps were
* create a user with `sudo runuser -u _gvm -- gvmd --create-user=admin --password=admin`, more details on the [Greenbone Forum](https:/forum.greenbone.nett/error-no-users-found-you-need-to-create-at-least-one-user-to-log-in10528).
* reboot, without this I was getting a strange permissions error on my home directory.  These issues were highlighted by running `sudo gvm-check-setup`
* create a postgres user with `sudo runuser -u _postgres -- usrsharegvmcreate-postgresql-database`
* start redis with `sudo systemctl start redis-server@openvas.service`  With that I was able to login.  ### Task 7 - Practical Vulnerability Management  #### Question 1  When did the scan start in Case 001?  #### Answer
> Feb 28, 00:04:46 [Reveal Answer](#) #### Question 2  When did the scan end in Case 001?  #### Answer
> Feb 28, 00:21:02 [Reveal Answer](#) #### Question 3  How many ports are open in Case 001?  #### Answer
> 3 [Reveal Answer](#) #### Question 4  How many total vulnerabilities were found in Case 001?  #### Answer
> 5 [Reveal Answer](#) #### Question 5  What is the highest severity vulnerability found? (MSxx-xxx)  #### Answer
> MS17-010 [Reveal Answer](#) #### Question 6  What is the first affected OS to this vulnerability?  #### Answer
> Microsoft Windows 10 x32x64 Edition [Reveal Answer](#) #### Question 7  What is the recommended vulnerability detection method?  #### Answer
> Send the crafted SMB transaction request with fid = 0 and check the response to confirm the vulnerability. [Reveal Answer](#) 