---
Title: First Adventures with GitHub Spec-Kit - Spec-Driven Development from Hospital
Lead: "Whilst recovering in hospital with naught but a phone and tablet, I embark upon learning GitHub's spec-kit to build a proper INR tracking application. A welcome respite from medical dramas!"
Published: 2025-10-15T12:00:00.000Z
Image: 
Tags:
  - GitHub
  - Spec-Kit
  - Development
  - MAUI
  - Blazor
  - Azure
  - Copilot
  - Claude
---

## A Most Agreeable Distraction

I dare say, dear reader, that after several weeks regaling you with tales of aortic replacements and pacemaker adventures, you might be rather relieved to encounter a proper technical post. Whilst convalescing in Kirchberg Hospital, waiting for my INR levels to reach their proper therapeutic range, I find myself with time on my hands and only my trusty phone and a modest tablet for company.

What better opportunity, I thought, to explore GitHub's [spec-kit](https://github.com/github/spec-kit) and attempt some spec-driven development? The goal, rather splendidly practical given my current circumstances, is to build an application to remind me to take my blood-thinning medication in the evening and perform my INR blood tests in the morning. I've imaginatively titled this endeavour the [blood_thinner_INR_tracker](https://github.com/MarkZither/blood_thinner_INR_tracker).

## The Plan

My ambitions for this project are rather comprehensive:

1. **A MAUI Application** - For mobile access to track my medication and INR readings
2. **A Blazor Web Application** - Because one should have proper web access as well
3. **A Console Application** - Packaged as a .NET tool and published to NuGet, because CLI is best! :)
4. **An MCP Server** - So Copilot can update the INR and taken dosage directly
5. **A Backend with Database** - To store all this vital medical data securely
6. **Azure Hosting** - Properly hosted in the cloud, as befits a modern application
7. **GitHub Actions** - For continuous integration and deployment, naturally

And here's the truly splendid bit - I intend to have Copilot, powered by Claude 4 and 4.5, write all the code. My role shall be primarily that of specification writer and architectural decision maker. Quite the experiment in modern AI-assisted development!

## The Setup and First Issues

Not wanting to bring too much tech to the hospital with me, I have my phone (a Moto G42), a Lenovo Tab M8 with a 1200x800 display, and an Android app Bluetooth keyboard and mouse to free the tablet screen from the keyboard clutter. I also treated myself to one of Amazon's cheapest tablet stands just for a bit of comfort.

I created a new repository on GitHub and opened it in a Codespace in a browser on the tablet in full-screen mode for maximum VS Code visibility!

So far so good! :) The Bluetooth keyboard and mouse had some latency, and the keyboard sometimes writes gibberish - but that's the same with the on-screen keyboard on the tablet. Copy and paste is also a big challenge, especially into Codespace - some kind of browser clipboard Rust issue I need to read more about. Almost workable - no tab button to do tab completion, no arrow button to easily go back through commands and do small edits. Indeed, a very efficient way of passing the time if not getting an application built!

## Getting Started with Spec-Kit

I followed the getting started steps. Some new tooling was mentioned - `uv` and `uvx` - but fortunately that was available on the Codespace, so installing speckit was easy.

Then I followed the steps, running commands like `/speckit.constitution`, `/speckit.spec`, and `/speckit.plan`. Whilst Copilot was writing output like it was doing something, I couldn't find any output anywhere. I asked Copilot about this, and it agreed that I was right - the output wasn't there. So it tried again, and again, and again. What could it be?

After entirely too long trying to figure it out, and with the Copilot window fully expanded, it hit me: Copilot was in **ask mode**. The 1200x800 screen had hidden that critical setting from me, and Copilot wasn't able to figure out that problem itself. So, Copilot switched to **agent mode**, and now we're cooking!

## The PowerShell Challenge

The next challenge I created for myself in some ways. Spec-kit lets you choose between bash scripts and PowerShell. I prefer PowerShell, so that's what I chose. Codespaces, by default, doesn't have PowerShell installed. So I have two choices: throw away what I have so far (which is only the constitution) or get PowerShell onto the Codespace machine. I edited the devcontainer config to add PowerShell, which gets PowerShell in place but runs with an error.

## Why This Application?

For those not currently prescribed anticoagulants (lucky you!), managing vitamin K antagonist therapy (such as acenocoumarol/SINTROM) requires:

1. **Daily Evening Medication**: Taking the prescribed dose at roughly the same time each evening
2. **Regular Blood Tests**: Checking your INR (International Normalized Ratio) to ensure the blood is thinning appropriately
3. **Dose Adjustments**: Modifying the dose based on INR readings
4. **Dietary Awareness**: Monitoring Vitamin K intake, as it affects the medication's efficacy

Once discharged from hospital (where the nurses are currently managing this for me), I'll need to manage this with a combination of phone alarms, a paper diary, and my somewhat unreliable memory. A proper application would be most welcome!

---

*This post was written primarily on a phone whilst waiting for blood test results. Any typos are blamed entirely on mobile autocorrect and hospital-grade WiFi.*
