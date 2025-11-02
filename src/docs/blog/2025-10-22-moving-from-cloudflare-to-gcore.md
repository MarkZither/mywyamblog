---
title: "Moving from Cloudflare to GCore: A DNS Migration Tale"
authors: ["mark-burton"]
tags: ["DNS", "CDN", "Infrastructure", "GCore", "Cloudflare"]
description: "After using Cloudflare for years, I decided to try an EU-based provider and migrated my DNS to GCore. This post covers the process."
date: "2025-11-20"
draft: false
---

## A Change in the Air

I've used Cloudflare for years to manage DNS and as a CDN, and it's always worked well for me—especially on the free tier, where I've never needed support. But as I have an abundence of freetime (thanks to heart surgery), I started looking at EU-based alternatives.

That's when I found [GCore](https://gcore.com/), a provider based in Luxembourg since 2014. They offer DNS and CDN services, making it easy to switch away from Cloudflare if you want everything under one roof.

<!--truncate-->

## A Rather Necessary Spring Cleaning

Before embarking upon this migration, I thought it prudent to inspect my existing DNS configuration at Cloudflare. What I discovered was, I dare say, rather enlightening:

- 7 TXT records for various services (Mailgun, Zoho, Keybase, and such)
- 8 MX records for mark-burton.com (though I must admit, 4 were for a Google email setup long since abandoned)
- 10 CNAMEs, half of which no longer resolved because I'd powered down the Pi server years ago

By Jove, it was high time for a proper tidy-up! I proceeded forthwith to delete all those obsolete records. No sense in migrating digital detritus to a new service, quite so.

## The Migration Proper

Creating a new zone in GCore appeared rather straightforward—one simply selects "New Zone", provides the domain name, and the system attempts to pull in the existing records from the current configuration. However, I must report that it didn't work frightfully well. Several records went missing in the process.

I then attempted to export the zone file from Cloudflare and import it directly to GCore. This is where matters became rather more interesting. The exported file looked something like this:

```
;;
;; Domain:     mark-burton.com.
;; Exported:   2025-10-22 14:14:25
;;
;; This file is intended for use for informational and archival
;; purposes ONLY and MUST be edited before use on a production

;; CNAME Records
blog.mark-burton.com.	1	IN	CNAME	goofy-williams-12014c.netlify.com. ; cf_tags=cf-proxied:true
email.secretsanta.mark-burton.com.	1	IN	CNAME	eu.mailgun.org. ; cf_tags=cf-proxied:false
hucknurdle.mark-burton.com.	1	IN	CNAME	venerable-youtiao-eb36bf.netlify.app. ; cf_tags=cf-proxied:true
mark-burton.com.	1	IN	CNAME	picore.blogdns.net. ; cf_tags=cf-proxied:false
verify.secretsanta.mark-burton.com.	1	IN	CNAME	mailgun.org. ; cf_tags=cf-proxied:false

;; MX Records
secretsanta.mark-burton.com.	1	IN	MX	50 mx3.zoho.eu.
secretsanta.mark-burton.com.	1	IN	MX	20 mx2.zoho.eu.
secretsanta.mark-burton.com.	1	IN	MX	10 mx.zoho.eu.

;; TXT Records
mark-burton.com.	1	IN	TXT	"keybase-site-verification=Snip"
mark-burton.com.	1	IN	TXT	"v=spf1 include:_spf.google.com ~all"
mark-burton.com.	1	IN	TXT	"markburton.azurewebsites.net"
mx._domainkey.secretsanta.mark-burton.com.	1	IN	TXT	"k=rsa; Snip"
secretsanta.mark-burton.com.	1	IN	TXT	"v=spf1 include:zoho.eu ~all"
secretsanta.mark-burton.com.	1	IN	TXT	"zoho-verification=zb15358196.zmverify.zoho.eu"
secretsanta.mark-burton.com.	1	IN	TXT	"v=spf1 include:eu.mailgun.org ~all"
```

## The TTL Conundrum

The principal issue, you see, was that Cloudflare had set the TTL (Time To Live) to `1` for every single record. Most decidedly problematic, as the free tier of GCore only supports values of 120 or higher. I found myself engaged in a spot of find-and-replace work, changing each of those `1` values to `120`.

## The SPF Record Situation

Whilst reviewing the records, I noticed that Cloudflare had rather helpfully warned me about multiple SPF records—quite simply put, having more than one is not valid. Using [MXToolbox](https://mxtoolbox.com/SPFRecordGenerator.aspx?domain=mark-burton.com&prefill=true), I consolidated those records into a single, proper SPF entry. Rather more elegant, I venture to suggest.

## The Moment of Truth

Now comes the critical step: updating the nameservers in my domain registrar's admin console. It's a change that shouldn't be taken lightly—if you get it wrong, your site and email can disappear until it's fixed.


![Fasthosts custom nameservers should GCore nameservers](/img/fasthosts_custom_gcore_nameservers.png)

## Certificate disaster and Rollback

A bit of an oversight meant everything I host on Netlify, so this blog and a Wordle clone tailored to my home town stopped working. To make matters worse I found out when Mum sent me a message to tell me [Hucknurdle](https://hucknurdle.mark-burton.com) had stopped working for her.

Visitors were greeted with 
![Invalid Certificate Warning](/img/gcore_blog_cert_error.png)

As I did not fully understand the root cause of the problem, and was concerned about [how HSTS works](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security) and what the 2 year max-age meant, I reverted the nameserver change, thankfully the TTL was quite low so it quickly got things back online.

``` bash
:~$ dig NS mark-burton.com

; <<>> DiG 9.18.39-0ubuntu0.22.04.2-Ubuntu <<>> NS mark-burton.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 52032
;; flags: qr rd ra; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 1232
;; QUESTION SECTION:
;mark-burton.com.               IN      NS

;; ANSWER SECTION:
mark-burton.com.        3600    IN      NS      ns1.gcorelabs.net.
mark-burton.com.        3600    IN      NS      ns2.gcdn.services.

;; Query time: 43 msec
;; SERVER: 10.255.255.254#53(10.255.255.254) (UDP)
;; WHEN: Sun Nov 02 14:10:04 CET 2025
;; MSG SIZE  rcvd: 106
```

The root of the problem was a certificate I added to Netlify several years ago, as the image shows Netlify was using a CloudFlare certificate.
![Invalid Certificate Details](/img/gcore_blog_cert_details.png)

That certificate as described by [Cloudflare](https://developers.cloudflare.com/ssl/origin-configuration/origin-ca/) is valid for traffic which is proxied by Cloudflare

> If your origin only receives traffic from proxied records, use Cloudflare origin CA certificates to encrypt traffic between Cloudflare and your origin web server and reduce bandwidth consumption. Once deployed, these certificates are compatible with [Strict SSL mode](https://developers.cloudflare.com/ssl/origin-configuration/ssl-modes/full-strict/).

> For more background information on origin CA certificates, refer to the introductory [blog post](https://blog.cloudflare.com/cloudflare-ca-encryption-origin/).

With that understood the fix was almost embarrassingly easy, the Cloudflare origin certificate was never meant to be used as a public facing certificate,so with Clouflare prixying turned off for my sites I switched to a [Let's Encrypt](https://letsencrypt.org/) certificate.

![Netlify Domain Management Screen Let's Encrypt Certificate Request](/img/gcore_netlify_letsencrypt_request.png)
![Netlify Domain Management Screen Let's Encrypt Certificate Provision](/img/gcore_netlify_letsencrypt_provision.png)
![Netlify Domain Management Screen Let's Encrypt Certificate](/img/gcore_netlify_letsencrypt.png)

Let's see what certificate we have in place now

![Let's Encrypt Certificate Browser Confirmation](/img/gcore_letsencrypt_cert_details.png)

With the Let's Encrypt certificate in place it is time to change the nameservers back to Gcore. 

##Success

This time everything is running smoothly and my move away from Cloudflare is complete.
