---
title: "First Adventures with GitHub Spec-Kit - Spec-Driven Development from Hospital"
authors: ["mark-burton"]
tags: ["GitHub", "Spec-Kit", "Development", "MAUI", "Blazor", "Azure", "Copilot", "Claude"]
description: "Whilst recovering in hospital with naught but a phone and tablet, I embark upon learning GitHub's spec-kit to build a proper INR tracking application. A welcome respite from medical dramas!"
date: "2025-10-15"
---

## A Most Agreeable Distraction

I dare say, dear reader, that after several weeks regaling you with tales of aortic replacements and pacemaker adventures, you might be rather relieved to encounter a proper technical post. Whilst convalescing in Kirchberg Hospital, waiting for my INR levels to reach their proper therapeutic range, I find myself with time on my hands and only my trusty phone and a modest tablet for company.

What better opportunity, I thought, to explore GitHub's [spec-kit](https://github.com/github/spec-kit) and attempt some spec-driven development? The goal, rather splendidly practical given my current circumstances, is to build an application to remind me to take my blood-thinning medication in the evening and perform my INR blood tests in the morning. I've imaginatively titled this endeavour the [blood_thinner_INR_tracker](https://github.com/MarkZither/blood_thinner_INR_tracker).

<!--truncate-->

## What Is This Spec-Kit Business?

For the uninitiated, GitHub's spec-kit represents a rather modern approach to software development - one might call it "specification-driven development." The concept is delightfully straightforward: you begin by writing comprehensive specifications for what you wish to build, and then employ GitHub Copilot (with Claude 4 and 4.5 models, no less) to generate the actual code based upon these specifications.

The beauty of this approach, as I'm discovering, is that it forces one to think clearly about requirements before diving into implementation. Most decidedly a sensible practice, though I confess not always my forte when seized by enthusiasm for a new technical challenge!

## The Grand Plan

My ambitions for this project are rather comprehensive:

1. **A MAUI Application** - For mobile access to track my medication and INR readings
2. **A Blazor Web Application** - Because one should have proper web access as well
3. **A Backend with Database** - To store all this vital medical data securely
4. **Azure Hosting** - Properly hosted in the cloud, as befits a modern application
5. **GitHub Actions** - For continuous integration and deployment, naturally

And here's the truly splendid bit - I intend to have Copilot, powered by Claude 4 and 4.5, write all the code. My role shall be primarily that of specification writer and architectural decision maker. Quite the experiment in modern AI-assisted development!

## First Impressions and Initial Challenges

### The Mobile Development Conundrum

Working from a phone and tablet presents its own unique challenges, I must confess. Whilst GitHub's mobile experience is quite good, and one can certainly review specifications and provide feedback through the GitHub interface, actually writing detailed technical specifications on a mobile device requires a certain... patience.

I've found that dictation features help considerably, though one must be mindful of medical terminology creeping into technical documents. ("The application should track the user's API" became "The application should track the user's aorta" in one particularly amusing incident.)

### Understanding Spec-Kit Structure

The spec-kit approach requires one to create specifications in a particular format. From what I've gathered thus far:

- **Clear Requirements**: One must articulate precisely what the application should accomplish
- **User Stories**: Describing functionality from the user's perspective
- **Technical Constraints**: Any specific technologies or approaches required
- **Acceptance Criteria**: How we'll know when something is properly complete

The process feels rather like writing a proper RFC (Request for Comments), but with the delightful knowledge that an AI will actually implement what you describe.

## The INR Tracker Application

### Why This Application?

For those not currently prescribed anticoagulants (lucky you!), managing warfarin therapy requires:

1. **Daily Evening Medication**: Taking the prescribed dose of warfarin at roughly the same time each evening
2. **Regular Blood Tests**: Checking your INR (International Normalized Ratio) to ensure the blood is thinning appropriately
3. **Dose Adjustments**: Modifying the warfarin dose based on INR readings
4. **Dietary Awareness**: Monitoring Vitamin K intake, as it affects warfarin efficacy

Currently, I'm doing this with a combination of phone alarms, a paper diary, and my somewhat unreliable memory. A proper application would be most welcome!

### Core Features

The application needs to:

**Medication Reminders**
- Send evening notifications to take warfarin
- Allow recording of doses taken
- Track missed doses (heaven forbid!)
- Store dosage history

**INR Tracking**
- Record morning blood test reminders
- Log INR test results
- Display INR trends over time
- Highlight readings outside the therapeutic range

**Data Management**
- Secure storage of medical data
- Export functionality for sharing with healthcare providers
- Backup and restore capabilities
- Multi-device synchronisation

**User Interface**
- Simple, clear medication logging
- Visual INR trend graphs
- Colour-coded alerts for concerning values
- Dark mode support (essential for late evening use!)

## Working with Copilot and Claude

This is where things become rather interesting. GitHub Copilot, when powered by Claude 4 and 4.5 models, offers some rather impressive capabilities:

### The Specification Process

1. **Write Clear Specs**: I start by writing specifications in natural language, being as precise as possible about requirements
2. **Copilot Generates Code**: The AI reviews the specs and generates appropriate code
3. **Review and Refine**: I review the generated code, providing feedback and requesting modifications
4. **Iterate**: Continue refining until the implementation matches the specification

### Early Observations

**The Good:**
- Claude seems remarkably good at understanding context and intent
- Code generation follows modern best practices
- The AI asks clarifying questions when requirements are ambiguous
- It suggests improvements to specifications

**The Challenging:**
- Mobile-based specification writing is... character-building
- Reviewing code on a small screen requires patience
- Some medical domain knowledge seems to require explicit explanation
- Coordinating multiple projects (MAUI, Blazor, Backend) requires careful organisation

## Technical Architecture Emerging

Through the specification process, an architecture is taking shape:

### Frontend Applications

**MAUI App**
- Cross-platform mobile application (iOS and Android)
- SQLite for offline data storage
- Background notifications for medication reminders
- Synchronisation with backend API

**Blazor Web App**
- Progressive Web App for browser access
- Responsive design for tablet use
- Same functionality as MAUI app
- Real-time updates using SignalR

### Backend Services

**ASP.NET Core API**
- RESTful API for data access
- JWT authentication
- Entity Framework Core for data access
- Azure SQL Database for storage

**Azure Services**
- App Service for hosting
- SQL Database for data storage
- Key Vault for secrets management
- Application Insights for monitoring

### CI/CD Pipeline

**GitHub Actions Workflows**
- Build and test on each commit
- Deploy to staging environment
- Manual approval for production
- Automated backup verification

## Lessons Learned Thus Far

### Specification Quality Matters

I've discovered that the quality of code generated directly correlates with the precision of specifications. Vague requirements produce vague implementations. This rather encourages one to think deeply about requirements before diving into development - no bad thing!

### Mobile Development Is Challenging

Working primarily from mobile devices tests one's determination. I've developed some strategies:

- Use voice-to-text for longer specifications
- Review code during quiet moments throughout the day
- Maintain a notes app for ideas that strike at inopportune times
- Be patient with the iterative process

### AI As Collaborative Partner

Rather than viewing Copilot as merely a code generator, I'm finding it more useful to think of it as a collaborative partner. It asks good questions, suggests alternatives, and catches potential issues. Quite the pleasant experience!

### Documentation By Default

Because specifications drive development, you end up with excellent documentation almost by default. The specifications become living documentation of the system's requirements and design decisions.

## Current Progress

As of this writing, I'm still in the early stages:

- ✅ Project repository created
- ✅ Initial specifications drafted
- ✅ Basic project structure defined
- 🔄 MAUI project scaffolding in progress
- ⏳ Blazor project next on the agenda
- ⏳ Backend API design being refined

## What's Next

Over the coming days (whilst my INR climbs to therapeutic levels), I plan to:

1. **Complete Core Specifications**: Finish detailed specs for all three projects
2. **Implement MAUI App**: Get the mobile application working with local storage
3. **Build Blazor Web App**: Create the web interface
4. **Develop Backend API**: Implement the API and database
5. **Azure Deployment**: Get everything properly hosted
6. **CI/CD Pipeline**: Automate the build and deployment process

I'll be documenting this journey in subsequent posts, sharing both successes and inevitable stumbles along the way.

## Reflections on Spec-Driven Development

### A Most Civilised Approach

There's something rather satisfying about the discipline required by spec-driven development. It forces one to think before typing - a practice I dare say more developers (myself included) should embrace more often.

### The Future of Development?

Is this the future of software development? Perhaps. The combination of clear specifications and AI-assisted implementation has potential to significantly change how we build software. Whether it entirely replaces traditional development approaches remains to be seen, but it's certainly a fascinating experiment.

### Perfect for Hospital-Based Development

For my current circumstances - confined to a hospital bed with limited equipment - this approach is rather ideal. I can focus on thinking about requirements and architecture, letting the AI handle the more mechanical aspects of code generation. Most agreeable for someone in my current somewhat reduced circumstances!

## Closing Thoughts

I must confess, dear reader, that embarking on this technical adventure whilst recovering from major surgery might seem somewhat mad. But I find the mental engagement rather therapeutic. It's splendid to think about something other than INR levels and medication schedules, even whilst building an application to track precisely those things!

The combination of GitHub spec-kit, Copilot with Claude, and a determination to learn something new has made hospital recovery considerably more interesting. I'll continue documenting this journey, and with any luck, by the time I'm discharged, I'll have a functioning application to show for my time here.

Stay tuned for further adventures in spec-driven development. Next time, I'll delve into the actual implementation details and share some code examples - assuming my INR cooperates and I remain sufficiently conscious to write coherently!

Until then, I remain your specification-writing, hospital-bound correspondent, endeavouring to turn medical necessity into a rather splendid learning opportunity.

Forthwith and most decidedly technical,

Mark

---

*This post was written primarily on a phone whilst waiting for blood test results. Any typos are blamed entirely on mobile autocorrect and hospital-grade WiFi. The code, thankfully, is being written by AI, which makes fewer spelling errors than I do at present!*
