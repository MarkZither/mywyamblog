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
3. **A Backend with Database** - To store all this vital medical data securely
4. **Azure Hosting** - Properly hosted in the cloud, as befits a modern application
5. **GitHub Actions** - For continuous integration and deployment, naturally

And here's the truly splendid bit - I intend to have Copilot, powered by Claude 4 and 4.5, write all the code. My role shall be primarily that of specification writer and architectural decision maker. Quite the experiment in modern AI-assisted development!

## Why This Application?

For those not currently prescribed anticoagulants (lucky you!), managing warfarin therapy requires:

1. **Daily Evening Medication**: Taking the prescribed dose of warfarin at roughly the same time each evening
2. **Regular Blood Tests**: Checking your INR (International Normalized Ratio) to ensure the blood is thinning appropriately
3. **Dose Adjustments**: Modifying the warfarin dose based on INR readings
4. **Dietary Awareness**: Monitoring Vitamin K intake, as it affects warfarin efficacy

Currently, I'm doing this with a combination of phone alarms, a paper diary, and my somewhat unreliable memory. A proper application would be most welcome!

## What's Next

I'll be documenting this journey as I progress, sharing both successes and inevitable stumbles along the way. In subsequent posts, I'll delve into the actual implementation details and share code examples as the project develops.

Stay tuned for further adventures in spec-driven development!

---

*This post was written primarily on a phone whilst waiting for blood test results. Any typos are blamed entirely on mobile autocorrect and hospital-grade WiFi.*
