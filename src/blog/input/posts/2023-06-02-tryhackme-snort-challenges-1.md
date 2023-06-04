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

> 328 {.text-blur}

Investigate the log file.

What is the destination address of packet 63?

``` bash
snort -c local.rules -r mx-3.pcap -A console -n 63
```
