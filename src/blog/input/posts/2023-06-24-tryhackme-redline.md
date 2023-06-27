---
Title: Try Hack Me - Redline
Lead: "Learn how to use Redline to perform memory analysis and to scan for IOCs on an endpoint."
Published: 2023-06-24T15:23:12.976Z
Date: 2023-06-24T15:23:12.976Z
Image: "/assets/Images/snort.png"
Tags:
  - tryhackme
  - Redline
---

## Redline

This is a Try Hack Me premium room so to access it you will need a subscription, if you don't have one go get one with my [Referral Link](https://tryhackme.com/signup?referrer=638ca30a6675850049e4858e)

### Task 1 - Introduction

#### Question 1

Who created Redline?

#### Answer
> FireEye  {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

### Task 2 - Data Collection

#### Question 1

What data collection method takes the least amount of time?

#### Answer
> standard collector {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 2

You are reading a research paper on a new strain of ransomware. You want to run the data collection on your computer based on the patterns provided, such as domains, hashes, IP addresses, filenames, etc. What method would you choose to run a granular data collection against the known indicators?

#### Answer
> IOC Search collector {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 3

What script would you run to initiate the data collection process? Please include the file extension.

#### Answer
> runredlineaudit.bat {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 4

If you want to collect the data on Disks and Volumes, under which option can you find it? 

#### Answer
> disk enumeration {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 5

What cache does Windows use to maintain a preference for recently executed code? 

##### Notes
In the [Redline User Guide](https://fireeye.market/assets/apps/211364/documents/877936_en.pdf)
Cache is mentioned 13 times, there is a section dedicated to the cache which answers this question.

#### Answer
> prefetch {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

### Task 3 - The Redline Interface

#### Question 1

Where in the Redline UI can you view information about the Logged in User?

#### Answer
> System Information {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

### Task 4 - Standard Collector Analysis

#### Question 1

Provide the Operating System detected for the workstation.

##### Notes

~~There is a bug in this room which is discussed in the [forum](https://tryhackme.com/forum/thread/61687020174c422766d10d7d#30), the System Information in Redline shows the OS to be Windows 7 Home Basic Service Pack 1, but that is not the answer.~~
Read the instructions carefully, if you analyse the wrong file you will get the wrong answer!
Be sure you did the previous task to setup the standard collector, ran the analysis and you have opened that file to get the answers.
I added my [reply in the forum](https://tryhackme.com/forum/thread/61687020174c422766d10d7d#35).

#### Answer
> Windows Server 2019 Standard 17763 {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 2

Be sure to check the rest of the System Information section for other useful data.

#### Question 3

What is the suspicious scheduled task that got created on the victim's computer? 

#### Answer
> MSOfficeUpdateFa.ke {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 4

Find the message that the intruder left for you in the task.

#### Answer
> THM-p3R5IStENCe-m3Chani$m {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 5

There is a new System Event ID created by an intruder with the source name "THM-Redline-User" and the Type "ERROR". Find the Event ID #.

#### Answer
> 546 {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 6

Provide the message for the Event ID.

#### Answer
> Someone cracked my password. Now I need to rename my puppy-++- {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}

#### Question 7

It looks like the intruder downloaded a file containing the flag for Question 8. Provide the full URL of the website.

#### Answer
> https://wormhole.app/download-stream/gI9vQtChjyYAmZ8Ody0AuA {.answer .blur}

[Reveal Answer](#) {.reveal-answer .btn .btn-primary}