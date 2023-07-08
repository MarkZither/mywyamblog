---
Title: Try Hack Me - OpenVAS
Lead: "Learn the basics of threat and vulnerability management using Open Vulnerability Assessment Scanning"
Published: 2023-06-24T15:23:12.976Z
Date: 2023-06-24T15:23:12.976Z
Image: "/assets/Images/snort.png"
Tags:
  - tryhackme
  - OpenVAS
---

## OpenVAS

This is a Try Hack Me premium room so to access it you will need a subscription, if you don't have one go get one with my [Referral Link](https://tryhackme.com/signup?referrer=638ca30a6675850049e4858e)

### Task 1 - 6 Introduction

Read tasks 1 - 6 for an introduction to OpenVAS and instructions on setting it up.

As I already have a dedicated Kali VM running I went for the Install from Kali/OpenVAS repositories approach and use the [Install from Kali/OpenVAS repositories](https://www.agix.com.au/installing-openvas-on-kali-in-2020/) guide, as of June 2023 it seems to just about work, I found some extra details on [Ceos3c - Install OpenVAS on Kali Linux] (https://www.ceos3c.com/security/install-openvas-kali-linux/).

Additional steps were
* create a user with `sudo runuser -u _gvm -- gvmd --create-user=admin --password=admin`, more details on the [Greenbone Forum](https://forum.greenbone.net/t/error-no-users-found-you-need-to-create-at-least-one-user-to-log-in/10528).
* reboot, without this I was getting a strange permissions error on my home directory.

These issues were highlighted by running `sudo gvm-check-setup`
* create a postgres user with `sudo runuser -u _postgres -- /usr/share/gvm/create-postgresql-database`
* start redis with `sudo systemctl start redis-server@openvas.service`

With that I was able to login.

### Task 7 - Practical Vulnerability Management

#### Question 1

When did the scan start in Case 001?

#### Answer
> Feb 28, 00:04:46 {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 2

When did the scan end in Case 001?

#### Answer
> Feb 28, 00:21:02 {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 3

How many ports are open in Case 001?

#### Answer
> 3 {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 4

How many total vulnerabilities were found in Case 001?

#### Answer
> 5 {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}