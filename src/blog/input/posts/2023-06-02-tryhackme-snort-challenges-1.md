---
Title: Try Hack Me - Snort Challenges - The Basics
Lead: "This is my first Try Hack Me write up, the room is Snort Challenge - The Basics."
Published: 2023-06-02T15:23:12.976Z
Date: 2023-06-02T15:23:12.976Z
Image: "/assets/Images/snort.png"
Tags:
  - tryhackme
  - snort
---

## Snort Challenge - The Basics

This is the first time I have written up a Try Hack Me challenge on day 161 of my hacking streak, it is primarily to keep track of the challenge as I work through it, if you find this, I hope it helps.

### Task 1 - Introduction

Start the machine, that's it.

### Task 2 - Writing IDS Rules (HTTP)

Let's create IDS Rules for HTTP traffic!
Answer the questions below
Navigate to the task folder.

Use the given pcap file.

Write rules to detect "all TCP port 80 traffic" packets in the given pcap file.

#### Question 1
What is the number of detected packets?

Note: You must answer this question correctly before answering the rest of the questions in this task.

Hint: You need to investigate inbound and outbound traffic on port 80. Writing two simple rules will help you. {.alert .alert-info}

#### Notes

In the previous channel task 9 covers the structure of a snort rule which is summarized as

 Action | Protocol | Source IP | Source Port | Direction | Dest IP | Dest Port | Options   
--------|----------|-----------|-------------|-----------|---------|-----------|-----------
 Alert  | TCP      |           |             |           |         |           | Msg       
 Drop   | UDP      |    ANY    |    ANY      |    <>     |    ANY  |    ANY    | Reference      
 Reject | IMCP     |           |             |           |         |           | SID        
        |          |           |             |           |         |           | Rev       
--------|----------|-----------|-------------|-----------|---------|-----------|-----------
                             Rule Header                                       | Rule Options 


The hint says to make 2 rules, 1 rule for port 80 source and port 80 destination, 

``` bash
alert tcp any 80 <> any any (msg: "port 80 origin"; sid: 100001; rev: 1;)
alert tcp any any <> any 80 (msg: "port 80 destination"; sid: 100002; rev:1;)
```

Then run snort with the local rules
``` bash
snort -c local.rules -A full -l . -r mx-3.pcap
```

``` bash
Action Stats:
     Alerts:          ??? ( 71.304%)
     Logged:          ??? ( 71.304%)
```

#### Answer
> 328 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 2
Investigate the log file.

What is the destination address of packet 63?

I got to the answer using the following snort command.

``` bash
snort -c local.rules -r mx-3.pcap -A console -n 63
```

But that isn't what the question asks, it specifically says `Investigate the log file.` so to read the log file instead use the command below. 

``` bash
sudo snort -r snort.log.1680776108 -n 64
```

``` bash
05/13-10:17:10.205385  [**] [1:100001:1] port 80 origin [**] [Priority: 0] {TCP} 65.208.228.223:80 -> 145.254.160.237:3372
```

#### Answer
> 145.254.160.237 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 3

Investigate the log file.

What is the ACK number of packet 64?

##### Notes

Similar to the previous question.

``` bash
sudo snort -r snort.log.1686080304 -n 64
```



``` bash
WARNING: No preprocessors configured for policy 0.
05/13-10:17:09.123830 65.208.228.223:80 -> 145.254.160.237:3372
TCP TTL:47 TOS:0x0 ID:49312 IpLen:20 DgmLen:1420 DF
***A**** Seq: 0x114C66F0  Ack: 0x????????  Win: 0x1920  TcpLen: 20
```

#### Answer
> 0x38AFFFF3 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 4

Investigate the log file.

What is the SEQ number of packet 62?

``` bash
sudo snort -r snort.log.1686080304 -n 62
```

``` bash
WARNING: No preprocessors configured for policy 0.
05/13-10:17:09.123830 145.254.160.237:3372 -> 65.208.228.223:80
TCP TTL:128 TOS:0x0 ID:3910 IpLen:20 DgmLen:40 DF
***A**** Seq: 0x????????  Ack: 0x114C66F0  Win: 0x25BC  TcpLen: 20
```

#### Answer
> 0x38AFFFF3 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 5

Investigate the log file.

What is the TTL number of packet 65?

``` bash
sudo snort -r snort.log.1686080304 -n 65
```

``` bash
WARNING: No preprocessors configured for policy 0.
05/13-10:17:09.324118 ???.???.???.???:???? -> 65.208.228.223:80
TCP TTL:??? TOS:0x0 ID:3911 IpLen:20 DgmLen:40 DF
***A**** Seq: 0x38AFFFF3  Ack: 0x114C6C54  Win: 0x25BC  TcpLen: 20

```

#### Answer
> 128 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 6

Investigate the log file.

What is the source IP number of packet 65?

``` bash
sudo snort -r snort.log.1686080304 -n 65
```

``` bash
WARNING: No preprocessors configured for policy 0.
05/13-10:17:09.324118 ???.???.???.???:???? -> 65.208.228.223:80
TCP TTL:??? TOS:0x0 ID:3911 IpLen:20 DgmLen:40 DF
***A**** Seq: 0x38AFFFF3  Ack: 0x114C6C54  Win: 0x25BC  TcpLen: 20
```

#### Answer
> 145.254.160.237 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 7

Investigate the log file.

What is the source port of packet 65?

``` bash
sudo snort -r snort.log.1686080304 -n 65
```

``` bash
WARNING: No preprocessors configured for policy 0.
05/13-10:17:09.324118 ???.???.???.???:???? -> 65.208.228.223:80
TCP TTL:??? TOS:0x0 ID:3911 IpLen:20 DgmLen:40 DF
***A**** Seq: 0x38AFFFF3  Ack: 0x114C6C54  Win: 0x25BC  TcpLen: 20
```

#### Answer
> 3372 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

### Task 3 - Writing IDS Rules (FTP)

Let's create IDS Rules for FTP traffic!
Answer the questions below
Navigate to the task folder.

Use the given pcap file.

Write rules to detect "all TCP port 21"  traffic in the given pcap.

``` bash
alert tcp any 21 <> any any (msg: "port 21 origin"; sid: 100001; rev: 1;)
alert tcp any any <> any 21 (msg: "port 21 destination"; sid: 100002; rev:1;)
```

``` bash
snort -c local.rules -A full -l . -r ftp-png-gif.pcap
```

#### Question 1

What is the number of detected packets?

#### Answer
> 614 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 2

Investigate the log file.

What is the FTP service name?

#### Answer
> Microsoft FTP Service {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 3

**Clear the previous log and alarm files.**

Deactivate/comment on the old rules.

Write a rule to detect failed FTP login attempts in the given pcap.

What is the number of detected packets?

##### notes

I know from mistyping a FTP login enough times that 530 is the code for a failed FTP login.

Looking at the previous log I can see entries like `530 User admin cannot log in.`

So from the previous channel, **Payload Detection Rule Options**, it looks like I can use the `content:` to search for the 530.

``` bash
alert tcp any 21 <> any any (msg: "port 21 origin"; content:"530 "; sid: 100001; rev: 1;)
alert tcp any any <> any 21 (msg: "port 21 destination"; content:"530 "; sid: 100002; rev:1;)
```

This gives the answer 82 which is not correct.

Hint: Each failed FTP login attempt prompts a default message with the pattern; "530 User". Try to filter the given pattern in the inbound FTP traffic. {.alert .alert-info}

So the hint helps, the rule should only be for inbound.

``` bash
alert tcp any 21 <> any any (msg: "port 21 origin"; content:"530 "; sid: 100001; rev: 1;)
```

Run snort again to read the pcap with the new rule
``` bash
snort -c local.rules -A full -l . -r ftp-png-gif.pcap
```

#### Answer
> 41 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 4

**Clear the previous log and alarm files.**

Deactivate/comment on the old rule.

Write a rule to detect successful FTP logins in the given pcap.

What is the number of detected packets?

##### Notes

Similar to the last quesiton but the code is 230

``` bash
alert tcp any 21 <> any any (msg: "port 21 origin"; content:"230 "; sid: 100001; rev: 1;)
```

Run snort again to read the pcap with the new rule
``` bash
snort -c local.rules -A full -l . -r ftp-png-gif.pcap
```

#### Answer
> 1 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 5

**Clear the previous log and alarm files.**

Deactivate/comment on the old rule.

Write a rule to detect failed FTP login attempts with a valid username but a bad password or no password.

What is the number of detected packets?

##### Notes
Looking at the output from the rule in question 1 there are several entries for `331 Password required for fred.` so I tried a rule for 331 in the body, same as the previous question it only makes sense to look for inbound traffic.

``` bash
alert tcp any 21 <> any any (msg: "port 21 origin"; content:"331 "; sid: 100001; rev: 1;)
```

Run snort again to read the pcap with the new rule
``` bash
snort -c local.rules -A full -l . -r ftp-png-gif.pcap
```

#### Answer
> 42 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 6

**Clear the previous log and alarm files.**

Deactivate/comment on the old rule.

Write a rule to detect failed FTP login attempts with "Administrator" username but a bad password or no password.

What is the number of detected packets?

##### Notes

This builds on the previous answers, so a rule like this could work

``` bash
alert tcp any any <> any 21 (msg: "port 21 destination"; content:"331 Password required for Administrator"; sid: 100001; rev: 1;)
```

But that is a kind of basic inflexible way to achieve it, lets make it more complex with the aid of a regex

``` bash
alert tcp any any <> any 21 (msg: "port 21 destination"; pcre:"/(331).*(administrator)/ix"; sid: 100001; rev: 1;)
```

Run snort again to read the pcap with the new rule
``` bash
snort -c local.rules -A full -l . -r ftp-png-gif.pcap
```

#### Answer
> 7 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}


### Task 3 - Writing IDS Rules (PNG)

Let's create IDS Rules for PNG files in the traffic!

#### Question 1

Use the given pcap file.

Write a rule to detect the PNG file in the given pcap.

Investigate the logs and identify the software name embedded in the packet.

##### Notes

I could not figure this out from the channel, I tried a simple rule like

``` bash
alert tcp any any -> any any (content:"png"; msg:"PNG";sid:10002; rev:1;)
```

It gave some results but nothing useful to answer the question.

After some googling and trying to avoid other writeups I came across this article on [asecuritysite.com](https://asecuritysite.com/forensics/snort?fname=with_pdf.pcap&rulesname=rulessig.rules) which included the rule

``` bash
alert tcp any any -> any any (content:"|89 50 4E 47|"; msg:"PNG";sid:10002)
```

I remember from a previous channel that the more certain way to identify a file rather then trusting the file extension is the files magic number or magic bytes, for png that is `89 50 4E 47`.

With that rule in place run snort to read the pcap with the new rule
``` bash
snort -c local.rules -A full -l . -r ftp-png-gif.pcap
```

#### Answer
> adobe imageready {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}


#### Question 2

**Clear the previous log and alarm files.**

Deactivate/comment on the old rule.

Write a rule to detect the GIF file in the given pcap.

Investigate the logs and identify the image format embedded in the packet.

##### Notes

Based on the previous question I assume we are looking for the magic bytes for gif, that can be `47 49 46 38 37 61` for GIF87a or `47 49 46 38 39 61` for GIF89a.

Change the previous rule slightly and 

``` bash
alert tcp any any -> any any (content:"|47 49 46 38 39 61|"; msg:"PNG";sid:10002)
```

With that rule in place run snort to read the pcap with the new rule

``` bash
snort -c local.rules -A full -l . -r ftp-png-gif.pcap
```

#### Answer
> GIF89a {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

### Task 5 - Writing IDS Rules (Torrent Metafile)

Let's create IDS Rules for torrent metafiles in the traffic!

#### Question 1

Use the given pcap file.

Write a rule to detect the torrent metafile in the given pcap.

##### Notes

A torrent meta file has an extension of `.torrent` lets see if that finds anything.

``` bash
alert tcp any any -> any any (content:".torrent"; msg:"PNG";sid:10002)
```

With that rule in place run snort to read the pcap with the new rule

``` bash
snort -c local.rules -A full -l . -r torrent.pcap
```

Seems to work.

#### Answer
> 2 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 2

Investigate the log/alarm files.

What is the name of the torrent application?

##### Notes

This is just a `nano snort.log.1686496369` your log file name will be different.

The output will be something like

``` bash
�ò�^B^@^D^@^@^@^@^@^@^@^@^@�^E^@^@^A^@^@^@���B�0^N^@�^A^@^@�^A^@^@�� ^@^>
�饐^V�^K�rP^X"8�^@^@^@GET /announce?info_hash=%01d%FE%7E%F1%10%5CWvAp%ED>
Accept: application/?-??????????
Accept-Encoding: gzip
User-Agent: RAZA 2.1.0.0
Host: ????????.??????????.???:2710
Connection: Keep-Alive
```

#### Answer
> bittorrent {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 3

Investigate the log/alarm files.

What is the MIME (Multipurpose Internet Mail Extensions) type of the torrent metafile?

##### Notes

Again this is just a `nano snort.log.1686496369` your log file name will be different.

The output will be something like

``` bash
�ò�^B^@^D^@^@^@^@^@^@^@^@^@�^E^@^@^A^@^@^@���B�0^N^@�^A^@^@�^A^@^@�� ^@^>
�饐^V�^K�rP^X"8�^@^@^@GET /announce?info_hash=%01d%FE%7E%F1%10%5CWvAp%ED>
Accept: application/?-??????????
Accept-Encoding: gzip
User-Agent: RAZA 2.1.0.0
Host: ????????.??????????.???:2710
Connection: Keep-Alive
```

#### Answer
> application/x-bittorrent {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 4

Investigate the log/alarm files.

What is the hostname of the torrent metafile?

##### Notes

Again this is just a `nano snort.log.1686496369` your log file name will be different.

The output will be something like

``` bash
�ò�^B^@^D^@^@^@^@^@^@^@^@^@�^E^@^@^A^@^@^@���B�0^N^@�^A^@^@�^A^@^@�� ^@^>
�饐^V�^K�rP^X"8�^@^@^@GET /announce?info_hash=%01d%FE%7E%F1%10%5CWvAp%ED>
Accept: application/?-??????????
Accept-Encoding: gzip
User-Agent: RAZA 2.1.0.0
Host: ????????.??????????.???:2710
Connection: Keep-Alive
```

#### Answer
> tracker2.torrentbox.com {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

### Task 6 - Troubleshooting Rule Syntax Errors

Let's troubleshoot rule syntax errors!

In this section, you need to fix the syntax errors in the given rule files. 

You can test each ruleset with the following command structure;

``` bash
sudo snort -c local-X.rules -r mx-1.pcap -A console
```

#### Question 1

Fix the syntax error in local-1.rules file and make it work smoothly.

What is the number of the detected packets?

##### Notes

The rule defined in `local-1.rules` is;

``` bash
alert tcp any 3372 -> any any(msg: "Troubleshooting 1"; sid:1000001; rev:1;)
```

Running snort with the provided command gives the following error;

``` bash
Initializing rule chains...
ERROR: local-1.rules(8) ***Rule--PortVar Parse error: (pos=1,error=not a number)
>>any(msg:
>>^
```

This is a missing space between any and the opening bracket, the fixed rule is;

``` bash
alert tcp any 3372 -> any any(msg: "Troubleshooting 1"; sid:1000001; rev:1;)
```

#### Answer
> 16 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 2

Fix the syntax error in local-2.rules file and make it work smoothly.

What is the number of the detected packets?

##### Notes

The rule defined in `local-2.rules` is;

``` bash
alert icmp any -> any any (msg: "Troubleshooting 2"; sid:1000001; rev:1;)
```

Running snort with the provided command gives the following error;

``` bash
Initializing rule chains...
ERROR: local-2.rules(8) Port value missing in rule!
Fatal Error, Quitting..
```

This time the port number is missing from the origin part of the rule, the fixed rule is;

``` bash
alert tcp any any -> any any(msg: "Troubleshooting 2"; sid:1000001; rev:1;)
```

#### Answer
> 68 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 3

Fix the syntax error in local-3.rules file and make it work smoothly.

What is the number of the detected packets?

##### Notes

The rule defined in `local-3.rules` is;

``` bash
alert icmp any any -> any any (msg: "ICMP Packet Found"; sid:1000001; rev:1;)
alert tcp any any -> any 80,443 (msg: "HTTPX Packet Found"; sid:1000001; rev:1;)
```

Running snort with the provided command gives the following error;

``` bash
Initializing rule chains...
ERROR: local-3.rules(9) GID 1 SID 1000001 in rule duplicates previous rule, with different protocol.
Fatal Error, Quitting..
```

This time the tells us the same SID is used in 2 different rules, the fixed rule is;

``` bash
alert icmp any any -> any any (msg: "ICMP Packet Found"; sid:1000001; rev:1;)
alert tcp any any -> any 80,443 (msg: "HTTPX Packet Found"; sid:1000002; rev:1;)
```

#### Answer
> 87 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 4

Fix the syntax error in local-4.rules file and make it work smoothly.

What is the number of the detected packets?

##### Notes

The rule defined in `local-4.rules` is;

``` bash
alert icmp any any -> any any (msg: "ICMP Packet Found"; sid:1000001; rev:1;)
alert tcp any 80,443 -> any any (msg: "HTTPX Packet Found": sid:1000001; rev:1;)
```

Running snort with the provided command gives the following error;

``` bash
Initializing rule chains...
ERROR: local-4.rules(9) Unmatch quote in rule option 'msg'.
Fatal Error, Quitting..
```

The error is a little misleading and it is easier to see the problem with the syntax highlighting, rather than it being an unmatched quote it is a colon instead of a semi-colon after msg in the second rule. There is a second issue which is the same as the previous question, the SID is the same in both rules, the fixed rule is;

``` bash
alert icmp any any -> any any (msg: "ICMP Packet Found"; sid:1000001; rev:1;)
alert tcp any 80,443 -> any any (msg: "HTTPX Packet Found"; sid:1000001; rev:1;)
```

#### Answer
> 90 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 5

Fix the syntax error in local-4.rules file and make it work smoothly.

What is the number of the detected packets?

##### Notes

The rule defined in `local-5.rules` is;

``` bash
alert icmp any any <> any any (msg: "ICMP Packet Found"; sid:1000001; rev:1;)
alert icmp any any <- any any (msg: "Inbound ICMP Packet Found"; sid;1000002; rev:1;)
alert tcp any any -> any 80,443 (msg: "HTTPX Packet Found": sid:1000003; rev:1;)
```

Running snort with the provided command gives the following error;

``` bash
Initializing rule chains...
ERROR: local-5.rules(9) Illegal direction specifier: <-
Fatal Error, Quitting..
```

From the previous channel I know that snort does not have a `<-` operator, since rule 2 is any ip and port in either direction is assume `<>` is the correct operator. There is a second problem in the second rule, the separator between the sid name and the value is a semi-colon instead of a colon. Finally a third problem in the 3rd rule, the separator between msg and sid is again a colon rather than semi-colon, the fix rule is;

``` bash
alert icmp any any <> any any (msg: "ICMP Packet Found"; sid:1000001; rev:1;)
alert icmp any any <> any any (msg: "Inbound ICMP Packet Found"; sid:1000002; rev:1;)
alert tcp any any -> any 80,443 (msg: "HTTPX Packet Found"; sid:1000003; rev:1;)
```

#### Answer
> 155 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 6

Fix the logical error in local-6.rules file and make it work smoothly to create alerts.

What is the number of the detected packets?

##### Notes

The rule defined in `local-6.rules` is;

``` bash
alert tcp any any <> any 80  (msg: "GET Request Found"; content:"|67 65 74|"; sid: 100001; rev:1;)
```

This time there is no error, but the rule returns no alerts.

The rule looks simple enough, any request to a remote ip on port 80, but what is the content part of the rule? Putting `67 65 74` into a hex to ascii convertor returns `get`.

I didn't see the answer so used the hint.

Hint: Case sensitivity matters! Use the capitals or nocase! {.alert .alert-info}

Now the logical error is a little clearer, the content is looking for `get` but http verbs are generally uppercase `GET`.

The hint explains to add the nocase or use uppercase letters in the content, so there are 2 possible rules that can be used;

``` bash
alert tcp any any <> any 80  (msg: "GET Request Found"; content:"|67 65 74|"; nocase; sid: 100001; rev:1;)
```

or

``` bash
alert tcp any any <> any 80  (msg: "GET Request Found"; content:"|47 45 54|"; sid: 100001; rev:1;)
```

#### Answer
> 2 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 7

Fix the logical error in local-7.rules file and make it work smoothly to create alerts.

What is the name of the required option:

##### Notes

The rule defined in `local-7.rules` is;

``` bash
alert tcp any any <> any 80  (content:"|2E 68 74 6D 6C|"; sid: 100001; rev:1;)
```

Again there is no error, but the rule returns 9 alerts while the answer is 3 digits.

The rule looks simple enough, any request to a remote ip on port 80, but what is the content part of the rule? Putting `2E 68 74 6D 6C` into a hex to ascii convertor returns `.html`.

I didn't see the answer so used the hint.

Hint: Rules without messages doesn't make sense! {.alert .alert-info}

That is annoying, all it needs is a message.

``` bash
alert tcp any any <> any 80  (msg: "HTML file"; content:"|2E 68 74 6D 6C|"; sid: 100001; rev:1;)
```

#### Answer
> msg {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

### Task 7 - Using External Rules (MS17-010)

Let's use external rules to fight against the latest threats!

Use the given pcap file.

#### Question 1

Use the given rule file (local.rules) to investigate the ms1710 exploitation.

What is the number of detected packets?

#### Answer
> 25154 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 2

**Clear the previous log and alarm files.**

Use local-1.rules empty file to write a new rule to detect payloads containing the "\IPC$" keyword.

What is the number of detected packets?

##### Notes

The backslash causes problems, so once the string has been converted to hex I had the following rule:

``` bash
alert tcp any any <> any any  (msg: "\IPC$"; content:"|5c 49 50 43 24|"; sid: 100001; rev:1;)
```

#### Answer
> 12 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 3

Investigate the log/alarm files.

What is the requested path?

##### Notes

The snort log has entries like

```
^@^@^@^@^@[�SMBu^@^@^@^@^X^A ^@^@^@^@^@^@^@^@^@^@/K^@^H�^^D�^@^@^@^@^@^A^@^\^@^@\\192.168.116.138\IPC$^@????^@TH_REPLACE
```

#### Answer
> smb\\192.168.116.138\IPC$ {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 4

What is the CVSS v2 score of the MS17-010 vulnerability?

##### Notes

https://www.cvedetails.com/cve/CVE-2017-0144/

#### Answer
> 9.3 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

### Task 8 - Using External Rules (Log4j)

Let's use external rules to fight against the latest threats!

Use the given pcap file.

#### Question 1

Use the given rule file (local.rules) to investigate the log4j exploitation.

What is the number of detected packets?

#### Answer
> 26 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 2

Investigate the log/alarm files.

How many rules were triggered?.

#### Answer
> 4 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}