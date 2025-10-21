---
title: "First Adventures with GitHub Spec-Kit - Spec-Driven Development from Hospital"
authors: ["mark-burton"]
tags: ["GitHub", "Spec-Kit", "Development", "MAUI", "Blazor", "Azure", "Copilot", "Claude"]
description: "Whilst recovering in hospital with naught but a phone and tablet, I embark upon learning GitHub's spec-kit to build a proper INR tracking application. A welcome respite from medical dramas!"
date: "2025-10-21"
draft: false
---

## A Most Agreeable Distraction

I dare say, dear reader, that after several weeks regaling you with tales of aortic replacements and pacemaker adventures, you might be rather relieved to encounter a proper technical post. Whilst convalescing in Kirchberg Hospital, waiting for my INR levels to reach their proper therapeutic range, I find myself with time on my hands and only my trusty phone and a modest tablet for company.

What better opportunity, I thought, to explore GitHub's [spec-kit](https://github.com/github/spec-kit) and attempt some spec-driven development? The goal, rather splendidly practical given my current circumstances, is to build an application to remind me to take my blood-thinning medication in the evening and perform my INR blood tests in the morning. I've imaginatively titled this endeavour the [blood_thinner_INR_tracker](https://github.com/MarkZither/blood_thinner_INR_tracker).

<!--truncate-->

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

## Actually Using Spec-Kit

With the technical hurdles of ask mode versus agent mode and PowerShell configuration behind me, I could finally experience spec-kit properly. The commands themselves were fairly brief, and I approached them methodically.

### The Constitution

Firstly, the constitution - lifted directly from the [docs](https://github.com/github/spec-kit?tab=readme-ov-file#2-establish-project-principles):

```
/speckit.constitution Create principles focused on code quality, testing standards, 
user experience consistency, and performance requirements, being .net focused and 
aware of application security best practices and striving to avoid any pitfalls 
listed in the OWASP Top 10
```

This produced a rather splendid [constitution.md](https://github.com/MarkZither/blood_thinner_INR_tracker/blob/feature/blood-thinner-medication-tracker/.specify/memory/constitution.md) establishing the principles for the project.

### The Specification

Next was to create the spec. It's important at this point to focus on the functionality and avoid any mention of technology - imagine you're the PO/BA, not a dev/architect:

```
/speckit.specify Build an application that can help to remind me to take my blood 
thinners on time, daily at the same time each day with a 12 hour maximum error window 
after which it should warn against taking up until next dose is due, log the dosage 
and remind me do my blood test on time, first thing in the morning on a schedule I 
can configure, and log the INR level. I should be able to log and the values should 
be available across my devices. This is not a medically approved app and it should 
not be considered to be giving any medical advice.
```

The output was impressive: 6 user stories, 15 functional requirements, and 10 success criteria. The [commit](https://github.com/MarkZither/blood_thinner_INR_tracker/commit/64482a2c5acd94a9e5e205c0e22de48f55c22376#diff-aa4f55dfdbb3772b672c5fa9711023c93ad0bd9b235d408c37aa187cd1c19927) shows the detail. At this point I could iterate on those, but I'm just going to carry on until I've got an actual computer in front of me.

### The Technical Plan

Next, I described the technical aspects - the stack and the architecture:

```
/speckit.plan The application offers multiple front ends, dotnet MAUI for mobile 
devices, Blazor for the web frontend, a dotnet console app packaged as a dotnet tool 
available on nuget and a local MCP server. The frontend authentication should support 
Azure and Google, the android version to support the native Google login flow. The 
backend will be a dotnet web API with aspire, with all the best practices around 
observability, container based deployment, published to docker hub, swagger docs with 
scalar UI, health checks. The backend Auth should support the tokens from the front 
end login with Azure and Google security is critical user spoofing must be avoided! 
data and metadata is stored in a local user specific secured SQLite database and 
synchronized via the backend to a hosted database which could be PostgreSQL, SQL 
Server or whatever else entity framework supports.
```

This produced considerably more output. In theory, at this point there could be blocking questions requiring answers before the process continues, but for me there were none. The [commit](https://github.com/MarkZither/blood_thinner_INR_tracker/commit/e1392e1ba3edc16fb1863e0e00bea8177ea390ed) shows the comprehensive architectural plan generated.

### Planning Tasks

That meant I was ready for `/speckit.tasks`. I noticed it was going to build with .NET 8, so I intervened to ensure it would use .NET 10, helped by some hints from [Merge Conflict episode 479](https://www.mergeconflict.fm/479). Whilst I told it to use .NET 10 and Copilot told itself to use .NET 10, when it came to actually do the work it didn't find .NET 10, so was going to revert to .NET 8. I fixed the `devcontainer.json` and it successfully started using .NET 10 preview.

That finishes this section - next is implementation, which shall be a section all of its own!

## The Implementation

The command itself is remarkably simple: `/speckit.implement`. This triggers Copilot to embark upon a whole heap of work. When I do this again, I shall probably start with fewer requirements and build it out feature by feature, rather than attempting everything at once.

Since I found myself repeatedly clicking "allow" so that Copilot could execute commands like `dotnet build`, I set certain commands to be allowed always to speed things up considerably.

It was rather fascinating watching the Copilot output - observing the build errors and seeing why Copilot thought the errors existed and how it chose to fix them. For Aspire in particular, it seemed to get very confused and jump between workloads and NuGet packages and what it claimed were "simplifications". 

For MAUI, it initially claimed it couldn't do MAUI on Linux so skipped it, then changed its mind and generated the MAUI app - which promptly consumed all of the Codespace disc space installing the workloads! 

For Entity Framework, it made the basic mistakes of creating the database on each run of the application, but then it caught itself and changed it. Also related to Entity Framework, it chose GUIDs as the primary keys on models and then decided it needed to use strings instead. I shall be most interested to read that properly on a real screen.

But ultimately, it builds and it passes its own tests! Though on my tablet I wasn't able to test the endpoints whilst it was running in the Codespace - that shall have to wait until I have proper computer access.

## The Aftermath: Reality Check on a Proper Screen

Finally back home and able to review the work Copilot did on a proper sized screen, and one of the first things I noticed was that although Copilot had visually shown me that it was working through the tasks one by one and saying it had completed the work, it had not updated the `tasks.md` file. So there was no easy way to see what it had done. I asked Copilot to check the `tasks.md` and update it with the work which was done, which suggested that 40% of the work was done - the infrastructure/backend was in place, but the frontend wasn't working or hooked up to the backend. Copilot updated the `tasks.md` file with the work it thought was complete.

Looking more closely, the AppHost and ServiceDefaults don't reference Aspire NuGet packages. I rather expected that because I saw Copilot having issues with Aspire and saying it was simplifying, but really it was little more than placeholder projects. So with Copilot's help, the task was set back to incomplete and 5 subtasks were created to ensure Aspire gets set up fully.

The Blazor app ran, but didn't work at all. Some really basic issues like the logged-in username hardcoded to "John Doe", links to pages just saying that the page does not exist. Copilot reviewed the work and saw the problems and created additional tasks.

As stated by Copilot: "The app looks complete but nothing actually works behind the UI facade. Several more tasks are needed to make it functional!"

But what about the code which was actually written? The API looks good, the Swagger attributes are in place to generate a good Swagger doc. But the Scalar UI was missing despite being in the `plan.md`. A quick ask of Copilot and it put Scalar in place, and now I can see the API. There is also an `.http` file, so I tried to work the API with that, but it was broken - the `baseurl` variable wasn't set, which was due to a `.` being in the variable name.

I called the login endpoint in the `.http` file once I fixed that baseurl, and whilst I didn't know a valid user, there was a username and password in the `.http` file. Not great - it shouldn't even need a password because it is supposed to be Google or Entra login, but I got a JWT. So how does that work? Let's look at the database - maybe some seed data? Nope, the database is empty and there isn't even a password column on the User table. So what if I try a different username and password? I get a JWT every time, whatever the username, whatever the password, I get a JWT. Time to look at the Authentication Service. Bingo, `AuthenticateAsync(LoginRequest request)` - now this is where the problem is:

```csharp
// TODO: Implement external user lookup or creation
// This is a placeholder implementation until User entity is created
```

So the code is more placeholder code, not actually functional.

## Lessons Learnt

This has been quite the educational experience in spec-driven AI development. Some observations:

1. **Spec-kit is brilliant for getting started** - The structured approach of constitution → spec → plan → tasks → implementation really does help guide the AI towards a coherent solution.

2. **Implementation requires oversight** - Whilst Copilot can certainly generate a lot of code, it needs proper verification. Visual confirmation in the chat that tasks are complete doesn't mean the actual artefacts are in place or working.

3. **Screen size matters** - Trying to do serious development work on a 1200x800 tablet screen is... character building. The hidden UI elements led to hours of frustration that could have been avoided on a proper monitor.

4. **Placeholder code is still code** - The generated authentication that accepts any username/password is a perfect example of AI generating structurally correct code that is functionally useless (and potentially dangerous!).

5. **Testing is essential** - Without being able to properly test the endpoints from the Codespace, I accepted Copilot's assurances that things were working. They were not.

Despite these challenges, the experiment has been worthwhile. I now have a codebase that, whilst requiring significant work to make functional, has the right structure and architecture in place. The task now is to systematically work through the issues, converting placeholder implementations into proper, working code.

And perhaps most importantly: next time I attempt such development work, I shall wait until I have a proper computer!

---

*This post was written primarily on a phone whilst waiting for blood test results. Any typos are blamed entirely on mobile autocorrect and hospital-grade WiFi.*
