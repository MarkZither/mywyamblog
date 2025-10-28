title: "Moving from Cloudflare to GCore: A DNS Migration Tale"
authors: ["mark-burton"]
tags: ["DNS", "CDN", "Infrastructure", "GCore", "Cloudflare"]
description: "After using Cloudflare for years, I decided to try an EU-based provider and migrated my DNS to GCore. This post covers the process."
date: "2025-10-23"
draft: false

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