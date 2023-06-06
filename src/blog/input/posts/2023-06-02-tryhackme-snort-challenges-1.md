---
Title: Try Hack Me - Snort Challenges - The Basics
Lead: "This is my first Try Hack Me write up, the room is Snort Challenge - The Basics."
Published: 2023-06-02T15:23:12.976Z
Date: 2023-06-02T15:23:12.976Z
Image: "/assets/Images/milling.jpg"
Tags:
  - tryhackme
  - snort
---

## Snort Challenge - The Basics

This is the first time I have written up a Try Hack Me challenge on day 161 of my hacking streak, it is primarily to keep track of the challenge as I work through it, if you find this, I hope it helps.

### Task 1 - Introduction

Start the machine, that's it.

### Task 2 - 

Let's create IDS Rules for HTTP traffic!
Answer the questions below
Navigate to the task folder.

Use the given pcap file.

Write rules to detect "all TCP port 80 traffic" packets in the given pcap file. 

### Question 1
What is the number of detected packets?

Note: You must answer this question correctly before answering the rest of the questions in this task.

Hint: You need to investigate inbound and outbound traffic on port 80. Writing two simple rules will help you.

``` bash
alert tcp any 80 <> any any (msg: "port 80 origin"; sid: 100001; rev: 1;)
alert tcp any any <> any 80 (msg: "port 80 destination"; sid: 100002; rev:1;)
```

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

### Question 2
Investigate the log file.

What is the destination address of packet 63?

``` bash
snort -c local.rules -r mx-3.pcap -A console -n 63
```

``` bash
sudo snort -r snort.log.1680776108 -n 64
```

``` bash
05/13-10:17:10.205385  [**] [1:100001:1] port 80 origin [**] [Priority: 0] {TCP} 65.208.228.223:80 -> 145.254.160.237:3372
```

#### Answer
> 145.254.160.237 {.answer .blur} 

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

### Question 3

Investigate the log file.

What is the ACK number of packet 64?

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

### Question 4

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