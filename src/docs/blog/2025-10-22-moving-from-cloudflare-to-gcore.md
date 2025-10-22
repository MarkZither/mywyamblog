---
title: "Moving from Cloudflare to GCore: A DNS Migration Tale"
authors: ["mark-burton"]
tags: ["DNS", "CDN", "Infrastructure", "GCore", "Cloudflare"]
description: "After years of faithful service from Cloudflare, I ventured forth to explore EU-based alternatives and discovered GCore. Here's how the migration proceeded."
date: "2025-10-23"
draft: true
---

## A Change in the Air

I must confess, dear reader, that I have been rather fortunate with Cloudflare over the years. For managing my DNS and serving as a CDN, it has worked splendidly, and being on the free tier, I've never needed to trouble their support team (thus avoiding the tales of woe one encounters on various blogs and Reddit). However, whilst convalescing from heart surgery (yes, the old ticker required some attention), I found myself with time to consider alternatives, particularly those based within the EU.

Enter [GCore](https://gcore.com/), a most agreeable discovery. Founded and headquartered in Luxembourg in 2014, it offers both DNS and CDN services—everything one requires to bid farewell to Cloudflare, should one be so inclined.

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

And now, dear reader, I find myself at the precipice of change. All that remains is to summon sufficient courage to update the nameservers in my domain registrar's admin console. One simply cannot underestimate the gravity of such a change—get it wrong, and one's entire digital presence vanishes into the ether!

But I dare say, with proper preparation and a spot of British resolve, the migration shall proceed without incident. The records are prepared, the TTL values are appropriate, and the SPF records are properly consolidated.

## Reflections

This exercise has been most instructive. It serves as a capital reminder that periodic reviews of one's technical infrastructure are not merely prudent but necessary. How many obsolete records might you have lurking in your DNS configuration? When last did you audit your own digital housekeeping?

I shall report back once the nameserver change has been completed and the dust has settled. Until then, I remain cautiously optimistic about this new chapter with GCore.

*Update: The nameserver change has been made. Now we wait for DNS propagation to work its magic across the globe. Fingers crossed, as they say!*
