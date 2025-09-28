---
title: "Try Hack Me, Redline"
authors: ["mark-burton"]
tags: ["tryhackme", "Redline"]
description: "Learn how to use Redline to perform memory analysis and to scan for IOCs on an endpoint."
date: "2023-06-24"
---

## Redline  This is a Try Hack Me premium room so to access it you will need a subscription, if you don't have one go get one with my [Referral Link](https:/tryhackme.comsignup?referrer=638ca30a6675850049e4858e)  ### Task 1 - Introduction  #### Question 1  Who created Redline?  #### Answer
> FireEye [Reveal Answer](#) ### Task 2 - Data Collection  #### Question 1  What data collection method takes the least amount of time?  #### Answer
> standard collector [Reveal Answer](#) #### Question 2  You are reading a research paper on a new strain of ransomware. You want to run the data collection on your computer based on the patterns provided, such as domains, hashes, IP addresses, filenames, etc. What method would you choose to run a granular data collection against the known indicators?  #### Answer
> IOC Search collector [Reveal Answer](#) #### Question 3  What script would you run to initiate the data collection process? Please include the file extension.  #### Answer
> runredlineaudit.bat [Reveal Answer](#) #### Question 4  If you want to collect the data on Disks and Volumes, under which option can you find it?  #### Answer
> disk enumeration [Reveal Answer](#) #### Question 5  What cache does Windows use to maintain a preference for recently executed code?  ##### Notes
In the [Redline User Guide](https:/fireeye.marketassetsapps211364documents877936_en.pdf)
Cache is mentioned 13 times, there is a section dedicated to the cache which answers this question.  #### Answer
> prefetch [Reveal Answer](#) ### Task 3 - The Redline Interface  #### Question 1  Where in the Redline UI can you view information about the Logged in User?  #### Answer
> System Information [Reveal Answer](#) ### Task 4 - Standard Collector Analysis  #### Question 1  Provide the Operating System detected for the workstation.  ##### Notes  ~~There is a bug in this room which is discussed in the [forum](https:/tryhackme.comforumthread61687020174c422766d10d7d#30), the System Information in Redline shows the OS to be Windows 7 Home Basic Service Pack 1, but that is not the answer.~~
Read the instructions carefully, if you analyse the wrong file you will get the wrong answer!
Be sure you did the previous task to setup the standard collector, ran the analysis and you have opened that file to get the answers.
I added my [reply in the forum](https:/tryhackme.comforumthread61687020174c422766d10d7d#35).  #### Answer
> Windows Server 2019 Standard 17763 [Reveal Answer](#) #### Question 2  Be sure to check the rest of the System Information section for other useful data.  #### Question 3  What is the suspicious scheduled task that got created on the victim's computer?  #### Answer
> MSOfficeUpdateFa.ke [Reveal Answer](#) #### Question 4  Find the message that the intruder left for you in the task.  #### Answer
> THM-p3R5IStENCe-m3Chani$m [Reveal Answer](#) #### Question 5  There is a new System Event ID created by an intruder with the source name "THM-Redline-User" and the Type "ERROR". Find the Event ID #.  #### Answer
> 546 [Reveal Answer](#) #### Question 6  Provide the message for the Event ID.  #### Answer
> Someone cracked my password. Now I need to rename my puppy-++- [Reveal Answer](#) #### Question 7  It looks like the intruder downloaded a file containing the flag for Question 8. Provide the full URL of the website.  #### Answer
> https:/wormhole.appdownload-streamgI9vQtChjyYAmZ8Ody0AuA [Reveal Answer](#) #### Question 8  Provide the full path to where the file was downloaded to including the filename.  #### Answer
> C:\Program Files (x86)\Windows Mail\SomeMailFolder\flag.txt [Reveal Answer](#) #### Question 9  Provide the message the intruder left for you in the file.  #### Answer
> THM\\\{600D-C@7cH-My-FR1EnD\\} [Reveal Answer](#) ### Task 5 - IOC Search Collector  #### Question 1  What is the actual filename of the Keylogger?  #### Answer
> psylog.exe [Reveal Answer](#) #### Question 2  What filename is the file masquerading as?  #### Answer
> thm1768.exe [Reveal Answer](#) #### Question 3  Who is the owner of the file?  #### Answer
> WIN-2DET5DP0NPT\charles [Reveal Answer](#) #### Question 4  What is the file size in bytes?  #### Answer
> 35400 [Reveal Answer](#) #### Question 5  Provide the full path of where the .ioc file was placed after the Redline analysis, include the .ioc filename as well  #### Answer
> C:\Users\charles\Desktop\Keylogger-IOCSearch\IOCs\keylogger.ioc [Reveal Answer](#) 